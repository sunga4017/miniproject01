import pandas as pd
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# 한글 폰트 등록 시도 (Windows 기준)
FONT_NAME = 'Helvetica' # 기본값
korean_font_path = 'C:/Windows/Fonts/malgun.ttf'
if os.path.exists(korean_font_path):
    try:
        pdfmetrics.registerFont(TTFont('Malgun', korean_font_path))
        FONT_NAME = 'Malgun'
    except Exception as e:
        print(f"Font registration warning: {e}")

def read_excel_data(file_obj) -> pd.DataFrame:
    """
    엑셀 파일 객체에서 데이터를 읽어 Pandas DataFrame으로 반환합니다.
    """
    try:
        df = pd.read_excel(BytesIO(file_obj.read()))
        return df
    except Exception as e:
        print(f"Error reading excel file: {e}")
        raise ValueError(f"Failed to read Excel file: {e}")

def generate_pdf_report(student_info, stats):
    """
    학생 성적표 PDF를 생성하여 BytesIO 객체로 반환합니다.
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    elements = []
    
    styles = getSampleStyleSheet()
    # 한글 폰트 스타일 추가
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontName=FONT_NAME,
        fontSize=24,
        alignment=1, # Center
        spaceAfter=20
    )
    normal_style = ParagraphStyle(
        'NormalKorean',
        parent=styles['Normal'],
        fontName=FONT_NAME,
        fontSize=12,
        spaceAfter=6
    )

    # 1. 제목
    elements.append(Paragraph(f"{student_info['name']} 학생 성적표", title_style))
    elements.append(Spacer(1, 20))

    # 2. 학생 정보
    info_text = f"""
    <b>학번:</b> {student_info['student_id']}<br/>
    <b>학년/반/번호:</b> {student_info['grade']}학년 {student_info['classroom']}반 {student_info['number']}번<br/>
    <b>생년월일:</b> {student_info['birth_date']}
    """
    elements.append(Paragraph(info_text, normal_style))
    elements.append(Spacer(1, 20))

    # 3. 성적 테이블 헤더
    data = [['시험명', '과목', '점수', '석차', '등급']]
    
    # 데이터 채우기
    if stats:
        for item in stats:
            data.append([
                item['exam_name'],
                item['subject_name'],
                str(item['score']),
                f"{item['rank']} / {item['total_students']}",
                f"{item['grade']}등급"
            ])
    else:
        data.append(['데이터 없음', '-', '-', '-', '-'])

    # 테이블 스타일
    t = Table(data, colWidths=[120, 100, 60, 80, 60])
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), FONT_NAME),
        ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    
    elements.append(t)
    elements.append(Spacer(1, 30))
    
    # 푸터
    elements.append(Paragraph("위 내용은 사실과 다름없음을 확인합니다.", normal_style))
    
    doc.build(elements)
    buffer.seek(0)
    return buffer