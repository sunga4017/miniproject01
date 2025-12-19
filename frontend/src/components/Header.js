import React from 'react';
import { Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header style={{
            height: 'var(--header-height)',
            backgroundColor: 'white',
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 900
        }}>
            <Container fluid className="p-0 d-flex justify-content-between align-items-center">
                <h5 className="m-0 fw-bold text-dark">학생 목록</h5>
                <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                         style={{ width: '36px', height: '36px' }}>
                        T
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
