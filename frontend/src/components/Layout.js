import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--gray-50)' }}>
            <Sidebar />
            <div style={{ 
                flex: 1, 
                marginLeft: '280px', // Match sidebar width
                display: 'flex', 
                flexDirection: 'column',
                width: 'calc(100% - 280px)' // Prevent overflow
            }} className="d-flex flex-column">
                <Header />
                <main style={{ padding: '2rem', flex: 1 }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
