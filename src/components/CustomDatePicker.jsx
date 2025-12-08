import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Calendar } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ar } from 'date-fns/locale';

const CustomDatePicker = ({ selectedDate, onChange }) => {
    const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Sync currentMonth if selectedDate changes externally
    useEffect(() => {
        if (selectedDate) {
            setCurrentMonth(new Date(selectedDate));
        }
    }, [selectedDate]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const onDateClick = (day) => {
        // Correct timezone offset issue by formatting as YYYY-MM-DD directly
        const year = day.getFullYear();
        const month = String(day.getMonth() + 1).padStart(2, '0');
        const date = String(day.getDate()).padStart(2, '0');
        onChange(`${year}-${month}-${date}`);
        setIsOpen(false);
    };

    const renderHeader = () => {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: '#fff',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
            }}>
                <button
                    onClick={nextMonth}
                    style={navButtonStyle}
                    type="button"
                >
                    <ChevronLeft size={18} />
                </button>
                <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {format(currentMonth, 'MMMM yyyy', { locale: ar })}
                </div>
                <button
                    onClick={prevMonth}
                    style={navButtonStyle}
                    type="button"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(currentMonth, { weekStartsOn: 6 }); // Week starts on Saturday for Arabic locale usually

        // Create headers for days of week
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} style={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    color: '#888',
                }}>
                    {format(addDays(startDate, i), 'EEEEE', { locale: ar })}
                </div>
            );
        }
        return <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', padding: '0 12px' }}>{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 6 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 6 });

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                const isSelected = isSameDay(day, new Date(selectedDate));
                const isMonthSame = isSameMonth(day, monthStart);
                const isTodayDate = isToday(day);

                days.push(
                    <div
                        key={day}
                        onClick={() => onDateClick(cloneDay)}
                        style={{
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            backgroundColor: isSelected ? 'var(--primary-color)' : isTodayDate ? '#FFF3E0' : 'transparent',
                            color: isSelected ? 'white' : isTodayDate ? 'var(--primary-color)' : isMonthSame ? 'var(--text-primary)' : '#ddd',
                            fontWeight: isSelected || isTodayDate ? '600' : 'normal',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem',
                            margin: '2px 0'
                        }}
                        onMouseEnter={(e) => {
                            if (!isSelected) e.currentTarget.style.backgroundColor = '#f5f5f5';
                        }}
                        onMouseLeave={(e) => {
                            if (!isSelected) e.currentTarget.style.backgroundColor = isTodayDate ? '#FFF3E0' : 'transparent';
                        }}
                    >
                        {formattedDate}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0 12px' }}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div style={{ paddingBottom: '12px' }}>{rows}</div>;
    };

    const navButtonStyle = {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        transition: 'background-color 0.2s'
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }} ref={containerRef}>
            {/* Trigger Button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    border: isOpen ? '1px solid var(--primary-color)' : '1px solid #E0E0E0',
                    fontSize: '0.95rem',
                    backgroundColor: isOpen ? '#FFF' : '#FAFAFA',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: 'var(--text-primary)',
                    boxShadow: isOpen ? '0 0 0 3px rgba(255, 152, 0, 0.1)' : 'none',
                    minWidth: '160px'
                }}
            >
                <span style={{ fontWeight: '500' }}>
                    {selectedDate ? format(new Date(selectedDate), 'd MMMM yyyy', { locale: ar }) : 'اختر التاريخ'}
                </span>
            </div>

            {/* Calendar Popover */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '120%',
                    left: 0, // Align left to prevent overlapping previous elements
                    zIndex: 9999, // High z-index to avoid transparency with underlying elements
                    backgroundColor: '#ffffff', // Ensure opaque background
                    borderRadius: '16px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    width: '250px', // Reduced width
                    overflow: 'hidden',
                    border: '1px solid #eee',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    {renderHeader()}
                    <div style={{ padding: '4px 0' }}>
                        {renderDays()}
                        {renderCells()}
                    </div>
                    {/* Today Button */}
                    <div style={{
                        borderTop: '1px solid #f0f0f0',
                        padding: '10px',
                        textAlign: 'center'
                    }}>
                        <button
                            type="button"
                            onClick={() => {
                                const d = new Date();
                                const year = d.getFullYear();
                                const month = String(d.getMonth() + 1).padStart(2, '0');
                                const day = String(d.getDate()).padStart(2, '0');
                                onChange(`${year}-${month}-${day}`);
                                setIsOpen(false);
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--primary-color)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            اليوم
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default CustomDatePicker;
