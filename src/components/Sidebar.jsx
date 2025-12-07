import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, History } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 style={{ marginBottom: '2rem', textAlign: 'center', color: 'var(--primary-color)' }}>مهامي</h2>
            <nav>
                <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>لوحة التحكم</span>
                </NavLink>
                <NavLink to="/daily" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Calendar size={20} />
                    <span>المهام اليومية</span>
                </NavLink>
                <NavLink to="/previous" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <History size={20} />
                    <span>المهام السابقة</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
