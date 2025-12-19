from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from django.db import transaction
from django.db.models import Avg, Count
from django.contrib.auth import get_user_model
from django.http import HttpResponse

from .models import Student, Subject, Exam, Score
from .utils import read_excel_data, generate_pdf_report
from .services import calculate_student_stats # 성적 계산 로직 임포트
from .serializers import (
    UserSerializer, StudentSerializer, SubjectSerializer,
    ExamSerializer, ScoreSerializer
)

User = get_user_model()

class DashboardStatsView(APIView):
    """
    대시보드용 통계 데이터를 반환합니다.
    """
    def get(self, request):
        # 1. 과목별 평균 점수
        subject_stats = Score.objects.values('subject__name').annotate(
            avg_score=Avg('score')
        ).order_by('subject__name')

        # 2. 학년별 학생 수
        student_stats = Student.objects.values('grade').annotate(
            count=Count('id')
        ).order_by('grade')

        data = {
            "subject_averages": [
                {"subject": item['subject__name'], "average": round(item['avg_score'], 1)}
                for item in subject_stats
            ],
            "student_counts": [
                {"grade": f"{item['grade']}학년", "count": item['count']}
                for item in student_stats
            ]
        }
        return Response(data)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    @action(detail=True, methods=['get'])
    def score_report(self, request, pk=None):
        """
        특정 학생의 성적 통계(과목별 석차, 등급)를 조회합니다.
        services.py의 calculate_student_stats 함수를 사용합니다.
        """
        student = self.get_object()
        stats = calculate_student_stats(student.pk)
        
        response_data = {
            "student_info": self.get_serializer(student).data,
            "score_statistics": stats,
        }
        
        return Response(response_data)

    @action(detail=True, methods=['get'])
    def download_report(self, request, pk=None):
        """
        학생 성적표를 PDF로 생성하여 다운로드합니다.
        """
        student = self.get_object()
        stats = calculate_student_stats(student.pk)
        
        pdf_buffer = generate_pdf_report(self.get_serializer(student).data, stats)
        
        response = HttpResponse(pdf_buffer, content_type='application/pdf')
        filename = f"score_report_{student.student_id}.pdf"
        # 한글 파일명 처리는 브라우저 호환성 문제로 일단 영문/숫자 조합 권장
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response


class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

class ScoreUploadView(APIView):
    """
    엑셀 파일을 업로드하여 성적 데이터를 일괄 등록하는 API 뷰.
    (이전 코드와 동일, ViewSet 추가로 인한 위치 이동)
    """
    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')

        if not file_obj:
            return Response({'error': 'No file was uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            df = read_excel_data(file_obj)
            
            # 필수 컬럼 확인
            required_columns = {'student_username', 'subject_name', 'exam_name', 'exam_date', 'score'}
            if not required_columns.issubset(df.columns):
                missing = required_columns - set(df.columns)
                return Response({'error': f'Missing required columns: {", ".join(missing)}'}, status=status.HTTP_400_BAD_REQUEST)

            # 데이터베이스 처리를 원자적으로 만들기 위해 transaction 사용
            with transaction.atomic():
                for _, row in df.iterrows():
                    # 1. 학생(User, Student) 정보 처리
                    student_username = row['student_username']
                    user, user_created = User.objects.get_or_create(
                        username=student_username,
                        defaults={'role': 'student', 'password': 'password123'} # 기본 비밀번호 설정
                    )
                    
                    if user_created:
                        # 새 학생의 경우, 기본 정보로 Student 객체 생성
                        student, _ = Student.objects.get_or_create(
                            user=user,
                            defaults={'grade': 1, 'class_number': 1, 'student_number': 0} # 기본값
                        )
                    else:
                        student = Student.objects.get(user=user)

                    # 2. 과목(Subject) 정보 처리
                    subject, _ = Subject.objects.get_or_create(name=row['subject_name'])

                    # 3. 시험(Exam) 정보 처리
                    exam, _ = Exam.objects.get_or_create(
                        subject=subject,
                        name=row['exam_name'],
                        defaults={'exam_date': row['exam_date']}
                    )

                    # 4. 성적(Score) 정보 처리 (update or create)
                    Score.objects.update_or_create(
                        student=student,
                        exam=exam,
                        defaults={'score': row['score']}
                    )

            return Response({'message': 'Successfully uploaded and processed scores.'}, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # 예상치 못한 다른 모든 오류 처리
            return Response({'error': f'An unexpected error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_ERROR)