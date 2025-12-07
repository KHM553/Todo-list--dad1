import React, { useEffect, useState } from 'react';
import { SignInButton } from "@clerk/clerk-react";
import { CheckCircle2, Zap, Shield, ArrowRight, Layout, Calendar, Clock, BarChart3, Users, Smartphone } from 'lucide-react';

const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [demoTasks, setDemoTasks] = useState([
        { id: 1, completed: true, text: 'مراجعة التصاميم النهائية' },
        { id: 2, completed: false, text: 'إعداد تقرير المشروع' },
        { id: 3, completed: false, text: 'اجتماع مع الفريق' },
    ]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDemoTask = (id) => {
        setDemoTasks(prev => prev.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
        <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease',
            animation: `slideUp 0.8s ease-out ${delay}s backwards`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'default'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,152,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            }}
        >
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: '#FFF3E0',
                color: '#FF9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
            }}>
                <Icon size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: '#1A1A1A' }}>{title}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{desc}</p>
        </div>
    );

    return (
        <div style={{
            minHeight: '100vh',
            fontFamily: "'Tajawal', sans-serif",
            background: '#FAFAFA',
            position: 'relative',
            overflowX: 'hidden',
            direction: 'rtl'
        }}>
            {/* Background Gradients */}
            <div style={{
                position: 'fixed',
                top: '-10%',
                right: '-10%',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(255,152,0,0.08) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                zIndex: 0
            }} />

            {/* Navbar */}
            <nav style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 100,
                background: scrolled ? 'rgba(255,255,255,0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.3s ease'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(255,152,0,0.3)'
                    }}>
                        <CheckCircle2 size={24} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: '#1A1A1A' }}>إنجاز</h2>
                </div>

                <SignInButton mode="modal">
                    <button style={{
                        padding: '0.8rem 1.8rem',
                        border: '1px solid #FF9800',
                        background: 'transparent',
                        color: '#FF9800',
                        borderRadius: '12px',
                        fontWeight: '700',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#FFF3E0';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        تسجيل الدخول
                    </button>
                </SignInButton>
            </nav>

            {/* Hero Section */}
            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '10rem 2rem 6rem 2rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Text Content */}
                <div style={{ animation: 'slideUp 0.8s ease-out' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#FFF3E0',
                        color: '#E65100',
                        padding: '8px 20px',
                        borderRadius: '50px',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        marginBottom: '2rem',
                        boxShadow: '0 2px 10px rgba(255,152,0,0.1)'
                    }}>
                        <Zap size={16} fill="currentColor" />
                        <span>نظام إدارة مهام ذكي ومتكامل 100%</span>
                    </div>

                    <h1 style={{
                        fontSize: '4.5rem',
                        lineHeight: '1.1',
                        fontWeight: '900',
                        color: '#1A1A1A',
                        marginBottom: '1.5rem'
                    }}>
                        نظم يومك، <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #FF9800 0%, #FF6D00 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>حقق أهدافك</span>
                    </h1>

                    <p style={{
                        fontSize: '1.3rem',
                        color: '#555',
                        lineHeight: '1.8',
                        marginBottom: '3rem',
                        maxWidth: '540px'
                    }}>
                        إنجاز يساعدك على ترتيب أولوياتك ومتابعة مهامك اليومية بأسلوب بصري ممتع وبسيط، لتنجز أكثر بجهد أقل.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <SignInButton mode="modal">
                            <button style={{
                                padding: '1.2rem 3rem',
                                background: 'linear-gradient(135deg, #FF9800 0%, #EF6C00 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                boxShadow: '0 10px 30px rgba(255,152,0,0.3)',
                                transition: 'transform 0.2s',
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                ابدأ مجاناً الآن
                                <ArrowRight size={20} />
                            </button>
                        </SignInButton>
                    </div>
                </div>

                {/* Interactive Infographic */}
                <div style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Animated Circles Background */}
                    <div style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        border: '2px dashed rgba(0,0,0,0.05)',
                        borderRadius: '50%',
                        animation: 'spin 60s linear infinite'
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: '350px',
                        height: '350px',
                        border: '2px dashed rgba(0,0,0,0.08)',
                        borderRadius: '50%',
                        animation: 'spin 40s linear infinite reverse'
                    }} />

                    {/* Interactive Task Card */}
                    <div style={{
                        position: 'absolute',
                        width: '380px',
                        background: 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(24px)',
                        borderRadius: '32px',
                        padding: '30px',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.6)',
                        zIndex: 2,
                        transform: 'rotate(-3deg)',
                        animation: 'float 6s ease-in-out infinite'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800' }}>مهامي اليوم</h4>
                                <span style={{ fontSize: '0.95rem', color: '#888' }}>جرّب الضغط على المهام! 👇</span>
                            </div>
                            <div style={{ width: '48px', height: '48px', background: '#FFF3E0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Calendar size={24} color="#FF9800" />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {demoTasks.map(task => (
                                <div
                                    key={task.id}
                                    onClick={() => toggleDemoTask(task.id)}
                                    style={{
                                        display: 'flex',
                                        gap: '15px',
                                        padding: '16px',
                                        background: task.completed ? '#E8F5E9' : '#fff',
                                        borderRadius: '20px',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        transform: task.completed ? 'scale(0.98)' : 'scale(1)',
                                        opacity: task.completed ? 0.7 : 1
                                    }}
                                >
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: task.completed ? '#4CAF50' : 'transparent',
                                        border: task.completed ? 'none' : '2px solid #ddd',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s'
                                    }}>
                                        {task.completed && <CheckCircle2 size={16} color="white" />}
                                    </div>
                                    <div style={{ flex: 1, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#888' : '#333', fontWeight: '600' }}>
                                        {task.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating Progress Pill */}
                    <div style={{
                        position: 'absolute',
                        top: '80px',
                        left: '-20px',
                        background: '#fff',
                        padding: '12px 20px',
                        borderRadius: '50px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        animation: 'float 5s ease-in-out infinite 1s'
                    }}>
                        <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                            <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '3px solid #E0E0E0' }}></div>
                            <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '3px solid #2196F3', borderRightColor: 'transparent', transform: 'rotate(45deg)' }}></div>
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>جاري العمل...</span>
                    </div>

                    {/* Floating Secure Shield */}
                    <div style={{
                        position: 'absolute',
                        bottom: '100px',
                        right: '0px',
                        background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(76, 175, 80, 0.3)',
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'float 7s ease-in-out infinite 0.5s',
                        color: 'white'
                    }}>
                        <Shield size={30} fill="rgba(255,255,255,0.2)" />
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '4rem 2rem 8rem 2rem'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1A1A1A', marginBottom: '1rem' }}>كل ما تحتاجه للنجاح</h2>
                    <p style={{ color: '#666', fontSize: '1.2rem' }}>صممنا إنجاز ليكون بسيطاً لكن قوياً بما يكفي لكل احتياجاتك</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem'
                }}>
                    <FeatureCard
                        icon={Layout}
                        title="واجهة عصرية وبسيطة"
                        desc="تصميم مريح للعين وسهل الاستخدام يجعلك تركز على مهامك دون تشتت."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={BarChart3}
                        title="إحصائيات ذكية"
                        desc="تابع تقدمك يومياً من خلال رسوم بيانية وتقارير فورية عن أدائك."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={Smartphone}
                        title="يعمل على كل الأجهزة"
                        desc="سواء كنت على الهاتف أو الكمبيوتر، مهامك معك في كل مكان ووقت."
                        delay={0.6}
                    />
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                background: '#fff',
                borderTop: '1px solid #eee',
                padding: '4rem 2rem',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: '#FF9800',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <CheckCircle2 size={20} />
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800' }}>إنجاز</h3>
                </div>
                <p style={{ color: '#888', marginBottom: '2rem' }}>&copy; 2025 جميع الحقوق محفوظة لمنصة إنجاز.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', color: '#666' }}>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>سياسة الخصوصية</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>شروط الاستخدام</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>اتصل بنا</a>
                </div>
            </footer>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(-3deg); }
                    50% { transform: translateY(-20px) rotate(-1deg); }
                    100% { transform: translateY(0px) rotate(-3deg); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
