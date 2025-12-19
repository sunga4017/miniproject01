import React from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const Settings = () => {
    return (
        <div className="p-2">
            <h2 className="fw-bold mb-4">설정</h2>
            
            <Card className="card-custom p-4 mb-4">
                <h5 className="fw-bold mb-3">시스템 설정</h5>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="다크 모드 (준비 중)"
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check 
                            type="switch"
                            id="noti-switch"
                            label="이메일 알림 받기"
                            defaultChecked
                        />
                    </Form.Group>
                    <Button variant="primary" className="btn-custom">
                        설정 저장
                    </Button>
                </Form>
            </Card>

            <Alert variant="info">
                추가적인 설정 기능은 추후 업데이트될 예정입니다.
            </Alert>
        </div>
    );
};

export default Settings;
