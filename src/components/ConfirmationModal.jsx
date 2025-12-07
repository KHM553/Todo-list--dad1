import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'حذف', cancelText = 'إلغاء' }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-out'
        }}
            onClick={onClose}
        >
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '2rem',
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                textAlign: 'center'
            }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#FEE2E2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    color: '#EF4444'
                }}>
                    <AlertTriangle size={32} />
                </div>

                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1F2937',
                    marginBottom: '0.75rem'
                }}>
                    {title}
                </h3>

                <p style={{
                    color: '#6B7280',
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    marginBottom: '2rem'
                }}>
                    {message}
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px solid #E5E7EB',
                            backgroundColor: 'white',
                            color: '#374151',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '12px',
                            border: 'none',
                            backgroundColor: '#EF4444',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#DC2626'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#EF4444'}
                    >
                        {confirmText}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem', // RTL support might need checking, but usually X is absolute corner
                        background: 'none',
                        border: 'none',
                        color: '#9CA3AF',
                        cursor: 'pointer',
                        padding: '4px'
                    }}
                >
                    <X size={20} />
                </button>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default ConfirmationModal;
