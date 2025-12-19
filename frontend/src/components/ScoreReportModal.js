import React, { useEffect, useState } from 'react';
import { Modal, Table, Spinner, Badge, Button, Alert } from 'react-bootstrap';
import api from '../api/axiosConfig';
import { FaFilePdf } from 'react-icons/fa';

const ScoreReportModal = ({ show, onHide, studentId }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show && studentId) {
            fetchReport();
        } else {
            setData(null); // Reset on close
        }
    }, [show, studentId]);

    const fetchReport = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/students/${studentId}/score_report/`);
            setData(response.data);
        } catch (err) {
            console.error(err);
            setError('성적 정보를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const getGradeBadge = (grade) => {
        const variants = {
            1: 'success',
            2: 'info',
            3: 'primary',
            4: 'warning',
            5: 'secondary',
            9: 'danger'
        };
        return <Badge bg={variants[grade] || 'light'} text={grade > 5 ? 'dark' : 'white'}>{grade}등급</Badge>;
    };

    const handleDownloadPdf = () => {
        // PDF 다운로드 링크를 새 탭에서 열기
        // 배포 환경에서는 REACT_APP_API_URL 사용, 개발 환경에서는 /api 사용
        const baseURL = process.env.REACT_APP_API_URL || '/api';
        window.open(`${baseURL}/students/${studentId}/download_report/`, '_blank');
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold">
                    {loading ? '로딩 중...' : data ? `${data.student_info.name} 학생 성적표` : '성적표'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                {loading && (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                )}

                {error && <Alert variant="danger">{error}</Alert>}

                {!loading && data && (
                    <>
                        <div className="mb-4 p-3 bg-light rounded d-flex justify-content-between align-items-center">
                            <div>
                                <span className="text-muted small">학번</span>
                                <div className="fw-bold">{data.student_info.student_id}</div>
                            </div>
                            <div>
                                <span className="text-muted small">학년/반</span>
                                <div className="fw-bold">{data.student_info.grade}학년 {data.student_info.classroom}반</div>
                            </div>
                            <div>
                                <span className="text-muted small">이름</span>
                                <div className="fw-bold">{data.student_info.name}</div>
                            </div>
                        </div>

                        <h6 className="mb-3 fw-bold text-primary">상세 성적 현황</h6>
                        <div className="table-responsive rounded border">
                            <Table hover className="m-0 table-custom">
                                <thead className="bg-light">
                                    <tr>
                                        <th>시험명</th>
                                        <th>과목</th>
                                        <th>점수</th>
                                        <th>석차 / 전체</th>
                                        <th>등급</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.score_statistics.length > 0 ? (
                                        data.score_statistics.map((stat, idx) => (
                                            <tr key={idx}>
                                                <td>{stat.exam_name}</td>
                                                <td>{stat.subject_name}</td>
                                                <td className="fw-bold">{stat.score}</td>
                                                <td>{stat.rank} / {stat.total_students}</td>
                                                <td>{getGradeBadge(stat.grade)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-muted">
                                                등록된 성적 데이터가 없습니다.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
                {!loading && data && (
                    <Button variant="success" onClick={handleDownloadPdf} className="btn-custom me-auto">
                        <FaFilePdf className="me-2" /> PDF 다운로드
                    </Button>
                )}
                <Button variant="secondary" onClick={onHide} className="btn-custom">
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default ScoreReportModal;
