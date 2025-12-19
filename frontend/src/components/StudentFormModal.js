import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col, Spinner } from 'react-bootstrap';
import api from '../api/axiosConfig';

const StudentFormModal = ({ show, onHide, onSuccess, student = null }) => {
    const isEditMode = !!student;
    const [formData, setFormData] = useState({
        student_id: '',
        name: '',
        birth_date: '',
        grade: '',
        classroom: '',
        number: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show) {
            if (student) {
                setFormData({
                    student_id: student.student_id,
                    name: student.name,
                    birth_date: student.birth_date,
                    grade: student.grade,
                    classroom: student.classroom,
                    number: student.number
                });
            } else {
                // Reset form for create mode
                setFormData({
                    student_id: '',
                    name: '',
                    birth_date: '',
                    grade: '',
                    classroom: '',
                    number: ''
                });
            }
            setError(null);
        }
    }, [show, student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                await api.put(`/students/${student.id}/`, formData);
            } else {
                await api.post('/students/', formData);
            }
            onSuccess();
            onHide();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || '저장 중 오류가 발생했습니다. 입력 값을 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold">{isEditMode ? '학생 정보 수정' : '신규 학생 등록'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>학번</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="student_id" 
                            value={formData.student_id} 
                            onChange={handleChange} 
                            placeholder="예: 2024001"
                            required 
                            disabled={isEditMode} // 학번은 수정 불가로 설정 (일반적)
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>이름</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="학생 이름"
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>생년월일</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="birth_date" 
                            value={formData.birth_date} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>학년</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="grade" 
                                    value={formData.grade} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>반</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="classroom" 
                                    value={formData.classroom} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>번호</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="number" 
                                    value={formData.number} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-grid gap-2 mt-4">
                        <Button variant="primary" type="submit" disabled={loading} className="btn-custom">
                            {loading ? <Spinner animation="border" size="sm" /> : (isEditMode ? '수정 완료' : '등록 완료')}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default StudentFormModal;
