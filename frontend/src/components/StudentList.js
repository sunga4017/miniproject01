import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaAddressCard, FaEdit, FaTrash, FaFileUpload, FaUserPlus } from 'react-icons/fa';
import ScoreReportModal from './ScoreReportModal';
import ScoreUploadModal from './ScoreUploadModal';
import StudentFormModal from './StudentFormModal';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Modal states
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    
    const [showReportModal, setShowReportModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/students/');
            setStudents(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching students:', err);
            setError('학생 목록을 불러오는데 실패했습니다.');
            setLoading(false);
        }
    };

    // Handlers
    const handleShowReport = (id) => {
        setSelectedStudentId(id);
        setShowReportModal(true);
    };

    const handleCreate = () => {
        setSelectedStudent(null);
        setShowFormModal(true);
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setShowFormModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('정말 이 학생 정보를 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/students/${id}/`);
                fetchStudents(); // Refresh list
            } catch (err) {
                alert('삭제 중 오류가 발생했습니다.');
            }
        }
    };

    if (loading && students.length === 0) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );

    return (
        <div className="p-2">
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <div>
                    <h2 className="fw-bold mb-1">학생 관리</h2>
                    <p className="text-muted m-0">전체 학생 목록 및 성적 조회</p>
                </div>
                <div className="d-flex gap-2">
                    <Button variant="outline-success" className="btn-custom" onClick={() => setShowUploadModal(true)}>
                        <FaFileUpload className="me-2" /> 엑셀 업로드
                    </Button>
                    <Button variant="primary" className="btn-custom" onClick={handleCreate}>
                        <FaUserPlus className="me-2" /> 학생 등록
                    </Button>
                </div>
            </div>

            <div className="card-custom p-0 overflow-hidden">
                <Table responsive hover className="table-custom m-0">
                    <thead>
                        <tr>
                            <th className="ps-4">이름 / 이메일</th>
                            <th>학번</th>
                            <th>학년-반-번호</th>
                            <th>상태</th>
                            <th className="text-end pe-4">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? students.map((student) => (
                            <tr key={student.id}>
                                <td className="ps-4">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" 
                                             style={{ width: '40px', height: '40px', color: 'var(--primary)', fontWeight: 'bold' }}>
                                            {student.name[0]}
                                        </div>
                                        <div>
                                            <div className="fw-bold">{student.name}</div>
                                            <div className="text-muted small">{student.user?.email || '-'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><Badge bg="light" text="dark" className="border">{student.student_id}</Badge></td>
                                <td>{student.grade}학년 {student.classroom}반 {student.number}번</td>
                                <td>
                                    <Badge bg="success" className="rounded-pill">재학중</Badge>
                                </td>
                                <td className="text-end pe-4">
                                    <ButtonGroup>
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm" 
                                            className="btn-custom"
                                            onClick={() => handleShowReport(student.id)}
                                            title="성적표 보기"
                                        >
                                            <FaAddressCard />
                                        </Button>
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm" 
                                            className="btn-custom"
                                            onClick={() => handleEdit(student)}
                                            title="수정"
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm" 
                                            className="btn-custom"
                                            onClick={() => handleDelete(student.id)}
                                            title="삭제"
                                        >
                                            <FaTrash />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center py-5 text-muted">
                                    등록된 학생이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Modals */}
            <ScoreReportModal 
                show={showReportModal} 
                onHide={() => setShowReportModal(false)} 
                studentId={selectedStudentId} 
            />
            
            <ScoreUploadModal
                show={showUploadModal}
                onHide={() => setShowUploadModal(false)}
                onSuccess={fetchStudents}
            />

            <StudentFormModal
                show={showFormModal}
                onHide={() => setShowFormModal(false)}
                onSuccess={fetchStudents}
                student={selectedStudent}
            />
        </div>
    );
};

export default StudentList;
