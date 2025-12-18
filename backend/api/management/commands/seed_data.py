from django.core.management.base import BaseCommand
from api.models import Student, Subject, Exam, Score, User
import random
from datetime import date

class Command(BaseCommand):
    help = '학생 및 성적 테스트 데이터를 자동으로 생성합니다.'

    def handle(self, *args, **kwargs):
        self.stdout.write("🔄 데이터 생성 시작...")

        # 1. 과목 생성
        subjects = [
            ('국어', 'KOR'), ('영어', 'ENG'), ('수학', 'MATH'), 
            ('사회', 'SOC'), ('과학', 'SCI')
        ]
        created_subjects = []
        for name, code in subjects:
            sub, _ = Subject.objects.get_or_create(name=name, code=code)
            created_subjects.append(sub)

        # 2. 시험 생성
        midterm, _ = Exam.objects.get_or_create(name='1학기 중간고사', date=date(2024, 4, 25))
        final, _ = Exam.objects.get_or_create(name='1학기 기말고사', date=date(2024, 7, 10))

        # 3. 학생 50명 및 성적 생성
        for i in range(1, 51):
            username = f"student_{i}"
            # 사용자 계정 생성
            user, created = User.objects.get_or_create(username=username)
            if created:
                user.set_password("pass1234")
                user.role = 'STUDENT'
                user.save()
            
            # 학생 정보 생성
            student, _ = Student.objects.get_or_create(
                user=user,
                student_id=f"2024{i:04d}",
                defaults={
                    "name": f"학생{i}",
                    "birth_date": date(2008, 1, 1),
                    "grade": 1,
                    "classroom": random.randint(1, 3),
                    "number": i
                }
            )

            # 성적 랜덤 입력
            for subject in created_subjects:
                Score.objects.get_or_create(
                    student=student, subject=subject, exam=midterm,
                    defaults={"score": random.randint(50, 100)}
                )
                Score.objects.get_or_create(
                    student=student, subject=subject, exam=final,
                    defaults={"score": random.randint(40, 100)}
                )

        self.stdout.write(self.style.SUCCESS("✅ 학생 50명과 성적 데이터 생성 완료!"))