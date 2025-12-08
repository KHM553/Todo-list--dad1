import { useState, useEffect, useRef } from 'react';
import { useTasks } from '../context/TaskContext';
import {
    Plus,
    Calendar,
    Trash2,
    Check,
    ClipboardList,
    CalendarDays,
    Search,
    Edit2,
    X
} from 'lucide-react';
import CustomDatePicker from '../components/CustomDatePicker';
import ConfirmationModal from '../components/ConfirmationModal';

const DailyTasks = () => {
    const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Confirmation Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Editing State
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    // Automatic date update on midnight
    const lastKnownTodayRef = useRef(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const checkDate = () => {
            const currentToday = new Date().toISOString().split('T')[0];
            const lastKnownToday = lastKnownTodayRef.current;

            if (currentToday !== lastKnownToday) {
                // The day has changed!
                // If the user is currently viewing the "old" today, switch them to the "new" today.
                if (selectedDate === lastKnownToday) {
                    setSelectedDate(currentToday);
                }
                // Update our reference
                lastKnownTodayRef.current = currentToday;
            }
        };

        // Check every minute
        const intervalId = setInterval(checkDate, 60000);

        // Also check on focus (when user comes back to the tab)
        window.addEventListener('focus', checkDate);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('focus', checkDate);
        };
    }, [selectedDate]);


    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        addTask(newTaskTitle, selectedDate);
        setNewTaskTitle('');
    };

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

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditingTitle(task.title);
    };

    const handleSaveEdit = (taskId) => {
        if (editingTitle.trim()) {
            updateTask(taskId, editingTitle);
            setEditingTaskId(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditingTitle('');
    };

    const dayTasks = tasks.filter(task => {
        const taskDate = task.date || (task.createdAt && task.createdAt.split('T')[0]);
        const matchesDate = taskDate === selectedDate;
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDate && matchesSearch;
    });

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
                    <CalendarDays size={28} color="var(--primary-color)" />
                </div>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.8rem' }}>مهام اليوم</h1>
                    <p style={{ margin: '5px 0 0 0', color: 'var(--text-secondary)' }}>
                        نظم يومك وأنجز مهامك بكفاءة
                    </p>
                </div>
            </div>

            {/* Date Picker & Search Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <h2 style={{ fontSize: '1.4rem', margin: 0 }}>بحث واضافة</h2>

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
                            fontSize: '0.9rem'
                        }}>
                            <Calendar size={18} />
                            التاريخ:
                        </label>
                        <CustomDatePicker
                            selectedDate={selectedDate}
                            onChange={setSelectedDate}
                        />
                    </div>
                </div>
            </div>

            {/* Add Task Section */}
            <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', overflow: 'visible' }}>
                <form onSubmit={handleAdd} style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="ماذا تريد أن تنجز اليوم؟"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '16px 20px',
                            paddingLeft: '60px', // Space for button (LTR) or Right for RTL
                            borderRadius: '50px',
                            border: '1px solid #E0E0E0',
                            fontSize: '1.1rem',
                            outline: 'none',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary-color)';
                            e.target.style.boxShadow = '0 4px 12px rgba(255, 152, 0, 0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#E0E0E0';
                            e.target.style.boxShadow = 'var(--shadow-sm)';
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            position: 'absolute',
                            left: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-color)',
                            border: 'none',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 8px rgba(255, 152, 0, 0.3)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                    >
                        <Plus size={24} />
                    </button>
                </form>
            </div>

            {/* Task List */}
            <div>
                {dayTasks.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        color: 'var(--text-secondary)',
                        backgroundColor: 'var(--white)',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px dashed #EEE'
                    }}>
                        <div style={{
                            margin: '0 auto 1.5rem auto'
                        }}>
                            <ClipboardList size={48} color="var(--primary-color)" opacity={0.6} />
                        </div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>لا توجد مهام</h3>
                        <p style={{ margin: 0 }}>يومك فارغ! ابدأ بإضافة مهام جديدة.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {dayTasks.map(task => (
                            <div key={task.id} className="task-item" style={{
                                padding: '1.2rem',
                                borderRadius: '16px',
                                backgroundColor: 'var(--white)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all 0.2s ease',
                                border: '1px solid transparent',
                                cursor: 'default'
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
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flex: 1, marginRight: '1rem' }}>
                                    {/* Custom Checkbox */}
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        border: task.completed ? 'none' : '2px solid #ddd',
                                        backgroundColor: task.completed ? '#4CAF50' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s',
                                        flexShrink: 0,
                                        cursor: 'pointer'
                                    }}
                                        onClick={() => toggleTask(task.id)}
                                    >
                                        {task.completed && <Check size={18} color="white" strokeWidth={3} />}
                                    </div>

                                    {editingTaskId === task.id ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                                            <input
                                                type="text"
                                                value={editingTitle}
                                                onChange={(e) => setEditingTitle(e.target.value)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px 12px',
                                                    borderRadius: '8px',
                                                    border: '1px solid var(--primary-color)',
                                                    outline: 'none',
                                                    fontSize: '1rem'
                                                }}
                                                autoFocus
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleSaveEdit(task.id);
                                                    if (e.key === 'Escape') handleCancelEdit();
                                                }}
                                            />
                                            <button
                                                onClick={() => handleSaveEdit(task.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#4CAF50',
                                                    cursor: 'pointer',
                                                    padding: '4px'
                                                }}
                                                title="حفظ"
                                            >
                                                <Check size={20} />
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#EF4444',
                                                    cursor: 'pointer',
                                                    padding: '4px'
                                                }}
                                                title="إلغاء"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '500',
                                            color: task.completed ? '#bbb' : 'var(--text-primary)',
                                            textDecoration: task.completed ? 'line-through' : 'none',
                                            transition: 'color 0.2s',
                                            cursor: 'pointer'
                                        }}
                                            onClick={() => toggleTask(task.id)}
                                        >
                                            {task.title}
                                        </span>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {!editingTaskId && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(task);
                                            }}
                                            style={{
                                                backgroundColor: '#E0F7FA',
                                                color: '#0097A7',
                                                border: 'none',
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            title="تعديل المهمة"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(task.id);
                                        }}
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
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.opacity = '1';
                                            e.currentTarget.style.backgroundColor = '#FFCDD2';
                                        }}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                                        title="حذف المهمة"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف المهمة"
                message="هل أنت متأكد من أنك تريد حذف هذه المهمة؟ لا يمكن التراجع عن هذا الإجراء."
            />
        </div >
    );
};

export default DailyTasks;
