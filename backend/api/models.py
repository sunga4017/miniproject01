from django.db import models
from django.contrib.auth.models import AbstractUser

# 1. 사용자 모델
class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', '관리자'),
        ('TEACHER', '교사'),
        ('STUDENT', '학생'),
        ('PARENT', '학부모'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='STUDENT', verbose_name='역할')
    phone_number = models.CharField(max_length=15, blank=True, null=True, verbose_name='전화번호')

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

# 2. 학생 정보 모델
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile', verbose_name='관련 계정')
    student_id = models.CharField(max_length=20, unique=True, verbose_name='학번')
    name = models.CharField(max_length=50, verbose_name='이름')
    birth_date = models.DateField(verbose_name='생년월일')
    grade = models.IntegerField(verbose_name='학년')
    classroom = models.IntegerField(verbose_name='반')
    number = models.IntegerField(verbose_name='번호')
    
    def __str__(self):
        return f"{self.grade}학년 {self.classroom}반 {self.name}"

# 3. 과목 모델 (여기에 code가 꼭 있어야 합니다!)
class Subject(models.Model):
    name = models.CharField(max_length=50, verbose_name='과목명')
    code = models.CharField(max_length=10, unique=True, verbose_name='과목코드') # KOR, ENG
    
    def __str__(self):
        return self.name

# 4. 시험 유형 모델
class Exam(models.Model):
    name = models.CharField(max_length=50, verbose_name='시험명')
    date = models.DateField(verbose_name='시험일자')
    weight = models.FloatField(default=1.0, verbose_name='가중치')

    def __str__(self):
        return self.name

# 5. 성적 모델
class Score(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='scores', verbose_name='학생')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='scores', verbose_name='과목')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='scores', verbose_name='시험')
    score = models.FloatField(verbose_name='점수')
    
    class Meta:
        unique_together = ('student', 'subject', 'exam')

    def __str__(self):
        return f"{self.student.name} - {self.subject.name}: {self.score}점"