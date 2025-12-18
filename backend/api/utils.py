import pandas as pd
from io import BytesIO

def read_excel_data(file_obj) -> pd.DataFrame:
    """
    엑셀 파일 객체에서 데이터를 읽어 Pandas DataFrame으로 반환합니다.
    엑셀 파일은 첫 번째 시트에 데이터가 있고, 첫 번째 행이 헤더임을 가정합니다.
    """
    try:
        # BytesIO로 감싸서 Pandas가 파일 객체로 처리할 수 있도록 합니다.
        # file_obj는 일반적으로 request.FILES['file']과 같은 업로드된 파일 객체입니다.
        df = pd.read_excel(BytesIO(file_obj.read()))
        return df
    except Exception as e:
        print(f"Error reading excel file: {e}")
        # 실제 환경에서는 더 구체적인 오류 처리 또는 예외 발생
        raise ValueError(f"Failed to read Excel file: {e}")

# 예시 사용법 (테스트용, 실제 파일 업로드 대체)
if __name__ == '__main__':
    # 이 부분은 실제 파일 객체를 시뮬레이션합니다.
    # 테스트를 위해 가상의 엑셀 파일을 만들 수 있습니다.
    # 예를 들어, pandas로 DataFrame을 만들고 to_excel로 BytesIO에 저장하여 테스트합니다.
    test_data = {
        'student_id': [1, 2, 3],
        '국어': [90, 80, 70],
        '영어': [85, 75, 65],
    }
    test_df = pd.DataFrame(test_data)

    # 가상 엑셀 파일 생성
    excel_buffer = BytesIO()
    test_df.to_excel(excel_buffer, index=False)
    excel_buffer.seek(0) # 파일 포인터를 처음으로 이동

    print("--- 엑셀 파일 읽기 테스트 ---")
    try:
        read_df = read_excel_data(excel_buffer)
        print("엑셀에서 읽은 데이터:")
        print(read_df)
    except ValueError as e:
        print(f"오류 발생: {e}")
