import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, History, CheckSquare } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
    return (
        <header className="header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--primary-gradient)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    <CheckSquare size={24} />
                </div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>محكم</h2>
            </div>

            <nav className="nav-links" style={{ margin: '0 auto' }}>
                <NavLink to="/dashboard" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>لوحة التحكم</span>
                </NavLink>
                <NavLink to="/dashboard/daily" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Calendar size={20} />
                    <span>المهام اليومية</span>
                </NavLink>
                <NavLink to="/dashboard/previous" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <History size={20} />
                    <span>المهام السابقة</span>
                </NavLink>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SignedOut>
                    <SignInButton mode="modal">
                        <button style={{
                            padding: '0.5rem 1rem',
                            background: 'var(--primary-gradient)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}>
                            تسجيل الدخول
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </header>
    );
};

export default Header;
