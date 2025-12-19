import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaFileUpload } from 'react-icons/fa';

const ScoreUploadModal = ({ show, onHide, onSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
        setSuccessMsg(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('파일을 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            await axios.post('/api/upload-scores/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMsg('성적 데이터가 성공적으로 업로드되었습니다.');
            setFile(null);
            if (onSuccess) onSuccess();
            // 2초 후 모달 닫기
            setTimeout(() => {
                setSuccessMsg(null);
                onHide();
            }, 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || '업로드 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold">성적 엑셀 업로드</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Alert variant="info" className="small">
                    <strong>필수 컬럼:</strong> student_username, subject_name, exam_name, exam_date, score
                </Alert>

                {error && <Alert variant="danger">{error}</Alert>}
                {successMsg && <Alert variant="success">{successMsg}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>엑셀 파일 (.xlsx)</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
                    </Form.Group>
                    
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" disabled={loading || !file} className="btn-custom">
                            {loading ? <Spinner animation="border" size="sm" /> : <><FaFileUpload className="me-2" /> 업로드</>}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ScoreUploadModal;
