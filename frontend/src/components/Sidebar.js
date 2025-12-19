import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUserGraduate, FaChartPie, FaCog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname;

    const getLinkStyle = (currentPath) => {
        const isActive = path === currentPath || (currentPath !== '/' && path.startsWith(currentPath));
        return {
            backgroundColor: isActive ? 'var(--gray-50)' : 'transparent',
            color: isActive ? 'var(--primary)' : 'var(--gray-600)',
            fontWeight: isActive ? '600' : '500',
            cursor: 'pointer'
        };
    };

    return (
        <div style={{
            width: 'var(--sidebar-width)',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            backgroundColor: 'white',
            borderRight: '1px solid var(--gray-200)',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000
        }} className="d-none d-md-flex">
            <div className="mb-5 px-3">
                <h4 style={{ color: 'var(--primary)', fontWeight: '700' }}>EduManager</h4>
            </div>
            
            <Nav className="flex-column w-100">
                <Nav.Link as={Link} to="/students" className="mb-2 p-3 rounded" style={getLinkStyle('/students')}>
                    <FaUserGraduate className="me-2" /> 학생 관리
                </Nav.Link>
                <Nav.Link as={Link} to="/" className="mb-2 p-3 rounded" style={getLinkStyle('/')}>
                    <FaChartPie className="me-2" /> 통계 대시보드
                </Nav.Link>
                <Nav.Link as={Link} to="/settings" className="mb-2 p-3 rounded" style={getLinkStyle('/settings')}>
                    <FaCog className="me-2" /> 설정
                </Nav.Link>
            </Nav>

            <div className="mt-auto p-3 bg-light rounded">
                <small className="text-muted">Logged in as Teacher</small>
            </div>
        </div>
    );
};

export default Sidebar;