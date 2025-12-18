from rest_framework import serializers
from .models import Student, Subject, Exam, Score, User # User 모델 추가

# 0. 사용자(계정) 데이터 포장지 (이게 빠졌었습니다!)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'phone_number']

# 1. 학생 데이터 포장지
class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) # 학생 정보 볼 때 계정 정보도 같이 보기

    class Meta:
        model = Student
        # models.py의 필드명과 똑같아야 합니다! (classroom 확인)
        fields = ['id', 'user', 'student_id', 'name', 'birth_date', 'grade', 'classroom', 'number']

# 2. 과목 데이터 포장지
class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

# 3. 시험 데이터 포장지
class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

# 4. 성적 데이터 포장지
class ScoreSerializer(serializers.ModelSerializer):
    # ID만 보여주면 누군지 모르니까, 이름도 같이 보여주게 설정
    student_name = serializers.ReadOnlyField(source='student.name')
    subject_name = serializers.ReadOnlyField(source='subject.name')
    exam_name = serializers.ReadOnlyField(source='exam.name')

    class Meta:
        model = Score
        fields = ['id', 'student', 'student_name', 'subject', 'subject_name', 'exam', 'exam_name', 'score']