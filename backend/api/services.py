import pandas as pd
from .models import Student, Score

def assign_grade_from_percentile(percentile):
    """백분위(%)를 받아서 9등급제로 변환하는 함수"""
    # 1등급: 상위 4% 이내
    if percentile <= 4: return 1
    # 2등급: 상위 11% 이내
    elif percentile <= 11: return 2
    # 3등급: 상위 23% 이내
    elif percentile <= 23: return 3
    # 4등급: 상위 40% 이내
    elif percentile <= 40: return 4
    # 5등급: 상위 60% 이내
    elif percentile <= 60: return 5
    # 6등급: 상위 77% 이내
    elif percentile <= 77: return 6
    # 7등급: 상위 89% 이내
    elif percentile <= 89: return 7
    # 8등급: 상위 96% 이내
    elif percentile <= 96: return 8
    # 9등급: 나머지 (100% 이내)
    else: return 9

def calculate_student_stats(student_id):
    try:
        student = Student.objects.get(pk=student_id)
    except Student.DoesNotExist:
        return []

    # [수정 1] exam__subject가 아니라, subject와 exam을 각각 가져오도록 수정
    student_scores = Score.objects.filter(student=student).select_related('subject', 'exam')

    results = []

    for my_score in student_scores:
        target_subject = my_score.subject
        target_exam = my_score.exam

        # [수정 2] 등수 계산 시 '같은 시험'이고 '같은 과목'인 점수들만 가져와서 비교
        all_scores_queryset = Score.objects.filter(
            exam=target_exam, 
            subject=target_subject
        ).values('student_id', 'score')

        if not all_scores_queryset:
            continue

        # 3. Pandas로 데이터프레임 변환
        df = pd.DataFrame(list(all_scores_queryset))
        df['score'] = df['score'].astype(float)

        # 4. 석차 계산 (동점자는 min 방식: 1등이 2명이면 다음은 3등)
        df['rank'] = df['score'].rank(method='min', ascending=False)
        
        # 5. 내 등수 찾기
        my_row = df[df['student_id'] == student.id]
        if my_row.empty:
            continue
            
        my_rank = int(my_row.iloc[0]['rank'])
        total_students = len(df)
        
        # 6. 백분위 계산 및 등급 부여
        percentile = (my_rank / total_students) * 100
        grade = assign_grade_from_percentile(percentile)

        results.append({
            'subject_name': target_subject.name,
            'exam_name': target_exam.name,
            'score': float(my_score.score),
            'rank': my_rank,
            'total_students': total_students,
            'grade': grade
        })

    return results