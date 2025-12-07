import { useTasks } from '../context/TaskContext';
import {
    CheckCircle2,
    Clock,
    ListTodo,
    Activity,
    CalendarClock,
    ArrowUpRight
} from 'lucide-react';

const Dashboard = () => {
    const { tasks } = useTasks();

    const total = tasks.length;
    const inProgress = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;

    const lastFiveTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const StatCard = ({ title, value, icon: Icon, color, bg }) => (
        <div className="card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.8rem',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(0,0,0,0.03)',
            position: 'relative',
            overflow: 'hidden'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
        >
            <div>
                <h3 style={{
                    fontSize: '2.8rem',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                    marginBottom: '0.2rem'
                }}>
                    {value}
                </h3>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1rem',
                    fontWeight: '500'
                }}>
                    {title}
                </p>
            </div>

            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                backgroundColor: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
                boxShadow: `0 8px 16px ${color}25`
            }}>
                <Icon size={30} strokeWidth={2.5} />
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ padding: '10px', background: 'var(--white)', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                    <Activity size={24} color="var(--primary-color)" />
                </div>
                <h1 style={{ margin: 0, fontSize: '1.8rem' }}>نظرة عامة</h1>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                <StatCard
                    title="إجمالي المهام"
                    value={total}
                    icon={ListTodo}
                    color="#FF9800"
                    bg="#FFF3E0"
                />
                <StatCard
                    title="قيد التنفيذ"
                    value={inProgress}
                    icon={Clock}
                    color="#2196F3"
                    bg="#E3F2FD"
                />
                <StatCard
                    title="مكتملة"
                    value={completed}
                    icon={CheckCircle2}
                    color="#4CAF50"
                    bg="#E8F5E9"
                />
            </div>

            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <CalendarClock size={24} color="var(--text-secondary)" />
                        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>آخر النشاطات</h2>
                    </div>
                    {lastFiveTasks.length > 0 && (
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            أحدث {lastFiveTasks.length} مهام
                        </span>
                    )}
                </div>

                {lastFiveTasks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
                        <ListTodo size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p>لا توجد مهام مسجلة حتى الآن. ابدأ بإضافة مهامك اليومية!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {lastFiveTasks.map(task => (
                            <div key={task.id} style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: 'var(--bg-color)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'transform 0.2s',
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: task.completed ? '#E8F5E9' : '#E3F2FD',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: task.completed ? '#4CAF50' : '#2196F3'
                                    }}>
                                        {task.completed ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{task.title}</h4>
                                        <span style={{ fontSize: '0.85rem', color: '#999' }}>
                                            {new Date(task.createdAt).toLocaleDateString('ar-EG')} - {new Date(task.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>

                                <div style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: '500',
                                    backgroundColor: task.completed ? '#E8F5E9' : '#E3F2FD',
                                    color: task.completed ? '#2E7D32' : '#1565C0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}>
                                    {task.completed ? 'مكتملة' : 'قيد التنفيذ'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
