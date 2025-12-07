import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import {
    CheckCircle2,
    Calendar,
    CalendarCheck,
    Search,
    Trash2,
    Archive
} from 'lucide-react';
import CustomDatePicker from '../components/CustomDatePicker';
import ConfirmationModal from '../components/ConfirmationModal';

const PreviousTasks = () => {
    const { tasks, deleteTask } = useTasks();
    const [selectedDate, setSelectedDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Confirmation Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleDeleteClick = (taskId) => {
        setTaskToDelete(taskId);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            deleteTask(taskToDelete);
            setTaskToDelete(null);
        }
    };

    // Filter for completed tasks only, and optionally by date
    const completedTasks = tasks.filter(task => {
        const isCompleted = task.completed;
        const taskDate = task.date || (task.createdAt && task.createdAt.split('T')[0]);
        const matchesDate = selectedDate ? taskDate === selectedDate : true;
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        return isCompleted && matchesDate && matchesSearch;
    });

    // Sort by date descending
    completedTasks.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{
                    padding: '12px',
                    backgroundColor: 'var(--white)',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Archive size={28} color="var(--primary-color)" />
                </div>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.8rem' }}>المهام السابقة</h1>
                    <p style={{ margin: '5px 0 0 0', color: 'var(--text-secondary)' }}>
                        سجل إنجازاتك والمهام المكتملة
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <h2 style={{ fontSize: '1.4rem', margin: 0 }}>تصفية المهام</h2>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Search Input */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'white',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid #eee'
                    }}>
                        <Search size={18} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="بحث..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                border: 'none',
                                outline: 'none',
                                fontSize: '0.9rem',
                                color: 'var(--text-primary)',
                                width: '120px'
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        position: 'relative',
                        zIndex: 10,
                        backgroundColor: 'white',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '500',
                            color: 'var(--text-secondary)',
                            whiteSpace: 'nowrap',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }} onClick={() => setSelectedDate('')} title="انقر لإلغاء التصفية">
                            <Calendar size={18} />
                            {selectedDate ? 'تصفية حسب التاريخ:' : 'كل التواريخ'}
                        </label>
                        <CustomDatePicker
                            selectedDate={selectedDate}
                            onChange={setSelectedDate}
                        />
                        {selectedDate && (
                            <button
                                onClick={() => setSelectedDate('')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#ef4444',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    marginLeft: '0.5rem'
                                }}
                            >
                                مسح
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tasks List */}
            <div className="card" style={{ padding: '0', background: 'transparent', boxShadow: 'none' }}>
                {completedTasks.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        color: 'var(--text-secondary)',
                        backgroundColor: 'var(--white)',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px dashed #EEE',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ margin: '0 auto 1.5rem auto' }}>
                            <CalendarCheck size={48} color="var(--primary-color)" opacity={0.6} />
                        </div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>لا توجد مهام مكتملة</h3>
                        <p style={{ margin: 0 }}>
                            {selectedDate
                                ? 'لا توجد مهام مكتملة في هذا التاريخ.'
                                : 'لم تقم بإكمال أي مهام بعد. شد حيلك!'}
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {completedTasks.map(task => (
                            <div key={task.id} style={{
                                padding: '1.2rem',
                                borderRadius: '16px',
                                backgroundColor: 'var(--white)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all 0.2s ease',
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: '#E8F5E9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#2E7D32',
                                        flexShrink: 0
                                    }}>
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{task.title}</h4>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <Calendar size={14} />
                                            {task.date}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDeleteClick(task.id)}
                                    style={{
                                        backgroundColor: '#FFEBEE',
                                        color: '#D32F2F',
                                        border: 'none',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        opacity: 0.8,
                                        transition: 'all 0.2s'
                                    }}
                                    title="حذف من السجل"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                        e.currentTarget.style.backgroundColor = '#FFCDD2';
                                    }}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف المهمة من السجل"
                message="هل أنت متأكد من أنك تريد حذف هذه المهمة من السجل؟ لا يمكن التراجع عن هذا الإجراء."
            />
        </div>
    );
};

export default PreviousTasks;
