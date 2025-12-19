import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { FaUserGraduate, FaBook, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/dashboard/stats/');
            setStats(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('데이터를 불러오는데 실패했습니다.');
            setLoading(false);
        }
    };

    if (loading) return <div className="p-5 text-center"><Spinner animation="border" variant="primary" /></div>;
    if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;

    // Calculate totals
    const totalStudents = stats?.student_counts.reduce((acc, curr) => acc + curr.count, 0) || 0;
    const totalSubjects = stats?.subject_averages.length || 0;
    const bestSubject = stats?.subject_averages.reduce((prev, current) => (prev.average > current.average) ? prev : current, {subject: '-', average: 0});

    const COLORS = ['#0ea5e9', '#0284c7', '#38bdf8', '#10b981', '#f59e0b'];

    return (
        <div className="p-2">
            <h2 className="fw-bold mb-4">통계 대시보드</h2>
            
            {/* KPI Cards */}
            <Row className="mb-4">
                <Col md={4} className="mb-3">
                    <Card className="card-custom h-100 p-3">
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light p-3 me-3 text-primary">
                                <FaUserGraduate size={24} />
                            </div>
                            <div>
                                <div className="text-muted small">전체 학생 수</div>
                                <h3 className="fw-bold m-0">{totalStudents}명</h3>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card className="card-custom h-100 p-3">
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light p-3 me-3 text-success">
                                <FaBook size={24} />
                            </div>
                            <div>
                                <div className="text-muted small">등록된 과목</div>
                                <h3 className="fw-bold m-0">{totalSubjects}개</h3>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card className="card-custom h-100 p-3">
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-light p-3 me-3 text-warning">
                                <FaChartLine size={24} />
                            </div>
                            <div>
                                <div className="text-muted small">최고 평균 과목</div>
                                <h3 className="fw-bold m-0">{bestSubject.subject}</h3>
                                <small className="text-muted">{bestSubject.average}점</small>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Charts */}
            <Row>
                <Col lg={8} className="mb-4">
                    <Card className="card-custom p-4 h-100">
                        <h5 className="fw-bold mb-4">과목별 평균 점수</h5>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.subject_averages}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="subject" />
                                    <YAxis />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="average" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="평균 점수" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
                <Col lg={4} className="mb-4">
                    <Card className="card-custom p-4 h-100">
                        <h5 className="fw-bold mb-4">학년별 학생 분포</h5>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.student_counts}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="count"
                                        nameKey="grade"
                                    >
                                        {stats.student_counts.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
