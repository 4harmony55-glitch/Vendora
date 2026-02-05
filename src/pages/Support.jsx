import React, { useState } from 'react';
import { Mail, MapPin, Briefcase, Code, Database, TrendingUp, MessageCircle, Github, Linkedin, Sparkles, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SOCIAL_LINKS, API_URL } from '../config';

function Support() {
  const [testStatus, setTestStatus] = useState('idle'); // idle, testing, success, error
  const [testMessage, setTestMessage] = useState('');

  const testConnection = async () => {
    setTestStatus('testing');
    setTestMessage('Testing connection to Google Apps Script...');

    try {
      // Use GET for simple testing as it's less likely to hit CORS issues if properly configured
      const response = await fetch(`${API_URL}?action=getProducts`, {
        mode: 'cors'
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (data.success) {
          setTestStatus('success');
          setTestMessage('✅ API Connection Successful! Your Google Script is correctly deployed and accessible.');
        } else {
          setTestStatus('error');
          setTestMessage(`❌ API returned an error: ${data.error || 'Unknown error'}`);
        }
      } else {
        const text = await response.text();
        if (text.includes("do not have permission")) {
          setTestStatus('error');
          setTestMessage('❌ PERMISSION ERROR: Your Google Script is NOT set to "Anyone". It is currently private or restricted to Google accounts.');
        } else {
          setTestStatus('error');
          setTestMessage('❌ INVALID RESPONSE: The API returned HTML instead of JSON. This usually means the Script URL is correct but the Web App is not properly deployed.');
        }
      }
    } catch (error) {
      console.error('Test error:', error);
      setTestStatus('error');
      setTestMessage('❌ NETWORK ERROR: Could not reach the script. This usually happens when the browser blocks the request due to missing CORS headers (caused by a private Google Script error page).');
    }
  };

  return (
    <div style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Hero Section - LEGENDARY */}
      <section style={{
        minHeight: '95vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(60px, 10vw, 80px) 20px'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(79, 172, 254, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(138, 92, 246, 0.15) 0%, transparent 50%)',
          animation: 'pulse 8s ease-in-out infinite'
        }} />

        <div className="container" style={{
          maxWidth: '1200px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          animation: 'fadeIn 1s ease'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            background: 'rgba(138, 92, 246, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '2px solid rgba(138, 92, 246, 0.3)',
            marginBottom: 'clamp(24px, 5vw, 32px)',
            fontSize: 'clamp(13px, 2.5vw, 14px)',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={16} />
            Full-Stack Developer & Data Analyst
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 10vw, 80px)',
            fontWeight: '900',
            marginBottom: 'clamp(20px, 4vw, 28px)',
            fontFamily: "'Playfair Display', serif",
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Adedokun Paul<br />Inioluwa
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            opacity: 0.95,
            maxWidth: '900px',
            margin: '0 auto clamp(32px, 6vw, 48px)',
            lineHeight: '1.6',
            padding: '0 20px'
          }}>
            I bridge the gap between <span style={{ color: '#4facfe', fontWeight: '700' }}>complex code</span> and <span style={{ color: '#8b5cf6', fontWeight: '700' }}>business growth</span>. Based in Lagos, building scalable solutions that drive real results.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: 'clamp(16px, 3vw, 20px)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                color: 'white',
                padding: 'clamp(14px, 3vw, 18px) clamp(32px, 6vw, 48px)',
                fontSize: 'clamp(15px, 3vw, 18px)',
                fontWeight: '800',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(79, 172, 254, 0.4)',
                minHeight: '56px'
              }}
            >
              Hire Me
            </a>
            <a
              href="#projects"
              className="btn"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                padding: 'clamp(14px, 3vw, 18px) clamp(32px, 6vw, 48px)',
                fontSize: 'clamp(15px, 3vw, 18px)',
                fontWeight: '800',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                minHeight: '56px'
              }}
            >
              View My Work
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'clamp(20px, 4vw, 32px)',
            marginTop: 'clamp(60px, 10vw, 80px)',
            maxWidth: '800px',
            margin: 'clamp(60px, 10vw, 80px) auto 0'
          }}>
            <StatBox number="2+" label="Years Experience" />
            <StatBox number="10+" label="Projects Completed" />
            <StatBox number="100%" label="Client Satisfaction" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: '#121212'
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <SectionHeader title="About Me" />
          
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: 'clamp(32px, 6vw, 48px)',
            backdropFilter: 'blur(10px)'
          }}>
            <p style={{
              fontSize: 'clamp(17px, 3.5vw, 22px)',
              lineHeight: '1.8',
              color: '#d1d5db'
            }}>
              Currently pursuing my degree at the <strong style={{ color: '#4facfe' }}>University of Ibadan</strong>, I am a tech enthusiast 
              with a deep-rooted passion for building scalable web solutions. With <strong style={{ color: '#8b5cf6' }}>2 years of intensive 
              IT experience</strong>, I don't just write code; I solve problems. Whether it's developing seamless 
              e-commerce platforms or analyzing data to drive decisions, I focus on delivering high-impact results 
              for small businesses and startups.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: '#0a0a0a'
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <SectionHeader title="My Tech Stack" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(24px, 5vw, 32px)'
          }}>
            <TechCard 
              icon={Code} 
              title="Frontend" 
              skills={['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js']}
              color="#4facfe"
            />
            <TechCard 
              icon={Database} 
              title="Backend & Data" 
              skills={['Python (Analysis & Automation)', 'Google App Script', 'Kotlin (Mobile - Beginner)']}
              color="#8b5cf6"
            />
            <TechCard 
              icon={TrendingUp} 
              title="Marketing & Growth" 
              skills={['Digital Marketing', 'Email Marketing', 'SEO Optimization']}
              color="#00f2fe"
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: '#121212'
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <SectionHeader title="Featured Projects" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(24px, 5vw, 32px)'
          }}>
            <ProjectCard 
              title="DropCart E-commerce"
              desc="A fully functional campus marketplace with advanced features"
              index={0}
            />
            <ProjectCard 
              title="Task Management System"
              desc="Real-time productivity tool for team collaboration"
              index={1}
            />
            <ProjectCard 
              title="Gaming Landing Page"
              desc="High-energy interface for gaming community engagement"
              index={2}
            />
            <ProjectCard 
              title="AI Project (In Progress)"
              desc="AI-driven solution for predictive analytics"
              index={3}
            />
          </div>
        </div>
      </section>

          {/* Debug/Diagnostics Section */}
          <section style={{
            padding: 'clamp(60px, 8vw, 80px) 20px',
            background: '#1a1a2e',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div className="container" style={{ maxWidth: '800px' }}>
              <SectionHeader title="System Diagnostics" />

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '32px',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>API Connection Test</h3>
                <p style={{ color: '#9ca3af', marginBottom: '24px', fontSize: '15px' }}>
                  Use this to verify if your Google Apps Script is correctly configured.
                </p>

                <div style={{
                  padding: '20px',
                  background: testStatus === 'idle' ? 'rgba(0,0,0,0.2)' :
                              testStatus === 'testing' ? 'rgba(79, 172, 254, 0.1)' :
                              testStatus === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: '1px solid',
                  borderColor: testStatus === 'idle' ? 'rgba(255,255,255,0.1)' :
                               testStatus === 'testing' ? '#4facfe' :
                               testStatus === 'success' ? '#10B981' : '#EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  justifyContent: 'center',
                  minHeight: '60px'
                }}>
                  {testStatus === 'idle' && <Activity size={20} color="#9ca3af" />}
                  {testStatus === 'testing' && <div className="spinning" style={{ width: '20px', height: '20px', border: '3px solid #4facfe', borderTopColor: 'transparent', borderRadius: '50%' }} />}
                  {testStatus === 'success' && <CheckCircle2 size={20} color="#10B981" />}
                  {testStatus === 'error' && <AlertCircle size={20} color="#EF4444" />}

                  <span style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: testStatus === 'success' ? '#10B981' : testStatus === 'error' ? '#EF4444' : 'white'
                  }}>
                    {testMessage || 'Click the button below to start test'}
                  </span>
                </div>

                <button
                  onClick={testConnection}
                  disabled={testStatus === 'testing'}
                  style={{
                    padding: '14px 28px',
                    background: testStatus === 'testing' ? '#4b5563' : 'linear-gradient(135deg, #4facfe, #00f2fe)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: '700',
                    cursor: testStatus === 'testing' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {testStatus === 'testing' ? 'Testing...' : 'Run Connection Test'}
                </button>

                {testStatus === 'error' && (
                  <div style={{ marginTop: '24px', textAlign: 'left', fontSize: '14px', color: '#d1d5db', lineHeight: '1.6' }}>
                    <p style={{ fontWeight: '700', color: '#EF4444', marginBottom: '8px' }}>How to fix this:</p>
                    <ol style={{ paddingLeft: '20px' }}>
                      <li>Open your Google Apps Script editor.</li>
                      <li>Click <strong>Deploy</strong> &gt; <strong>Manage deployments</strong>.</li>
                      <li>Click the <strong>Pencil icon</strong> to edit the current deployment.</li>
                      <li>Set <strong>Execute as:</strong> to <strong>Me</strong>.</li>
                      <li>Set <strong>Who has access:</strong> to <strong>Anyone</strong>.</li>
                      <li>Click <strong>Deploy</strong> and use the new URL in config.js.</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </section>

      {/* Services */}
      <section style={{
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: '#0a0a0a'
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <SectionHeader title="Services" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(20px, 4vw, 24px)'
          }}>
            <ServiceCard title="Web Development" desc="Responsive, fast, and secure websites tailored to your needs" />
            <ServiceCard title="Data Analysis" desc="Turn raw data into actionable insights for business growth" />
            <ServiceCard title="Digital Marketing" desc="Strategic online campaigns to boost brand visibility" />
            <ServiceCard title="Email Marketing" desc="Automated email funnels that convert leads to customers" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{
        padding: 'clamp(80px, 12vw, 120px) 20px',
        background: 'linear-gradient(135deg, #1E40AF, #6B21A8)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'pulse 6s ease-in-out infinite'
        }} />

        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(32px, 7vw, 56px)',
            fontWeight: '900',
            marginBottom: 'clamp(24px, 5vw, 32px)',
            fontFamily: "'Playfair Display', serif",
            lineHeight: '1.2'
          }}>
            Let's Build Something<br />Great Together
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            marginTop: 'clamp(40px, 8vw, 56px)',
            fontSize: 'clamp(16px, 3vw, 18px)'
          }}>
            <ContactInfo icon={MapPin} text="Obawole, Lagos, Nigeria" />
            <ContactInfo icon={Briefcase} text="University of Ibadan" />
            <ContactInfo icon={Mail} text="pauladedokun007@gmail.com" isLink={true} />
            <ContactInfo icon={Mail} text="support@dropcart.com" />
          </div>

          {/* Social Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vw, 24px)',
            marginTop: 'clamp(40px, 8vw, 56px)',
            flexWrap: 'wrap'
          }}>
            <SocialLink href={SOCIAL_LINKS.github} icon={Github} label="GitHub" />
            <SocialLink href={SOCIAL_LINKS.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialLink href={SOCIAL_LINKS.whatsappDirect} icon={MessageCircle} label="WhatsApp" />
          </div>
        </div>
      </section>
    </div>
  );
}

// Components
const StatBox = ({ number, label }) => (
  <div style={{
    textAlign: 'center',
    padding: 'clamp(20px, 4vw, 24px)',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <div style={{
      fontSize: 'clamp(32px, 7vw, 48px)',
      fontWeight: '900',
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}>
      {number}
    </div>
    <div style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', opacity: 0.8 }}>
      {label}
    </div>
  </div>
);

const SectionHeader = ({ title }) => (
  <div style={{
    textAlign: 'center',
    marginBottom: 'clamp(48px, 8vw, 64px)'
  }}>
    <h2 style={{
      fontSize: 'clamp(32px, 7vw, 56px)',
      fontWeight: '900',
      marginBottom: '16px',
      fontFamily: "'Playfair Display', serif",
      background: 'linear-gradient(135deg, #4facfe, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}>
      {title}
    </h2>
    <div style={{
      width: '80px',
      height: '4px',
      background: 'linear-gradient(90deg, #4facfe, #8b5cf6)',
      margin: '0 auto',
      borderRadius: '2px'
    }} />
  </div>
);

const TechCard = ({ icon: Icon, title, skills, color }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    padding: 'clamp(28px, 5vw, 36px)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.4s ease'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-8px)';
    e.currentTarget.style.borderColor = color;
    e.currentTarget.style.boxShadow = `0 20px 40px rgba(${color === '#4facfe' ? '79, 172, 254' : color === '#8b5cf6' ? '139, 92, 246' : '0, 242, 254'}, 0.3)`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
    e.currentTarget.style.boxShadow = 'none';
  }}
  >
    <Icon size={40} style={{ marginBottom: '16px', color }} />
    <h3 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: '700', marginBottom: '16px' }}>{title}</h3>
    <ul style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.8', color: '#d1d5db', listStyle: 'none', padding: 0 }}>
      {skills.map((skill, i) => (
        <li key={i} style={{ marginBottom: '8px' }}>• {skill}</li>
      ))}
    </ul>
  </div>
);

const ProjectCard = ({ title, desc, index }) => (
  <div style={{
    background: `linear-gradient(135deg, ${index % 2 === 0 ? 'rgba(79, 172, 254, 0.1)' : 'rgba(138, 92, 246, 0.1)'}, transparent)`,
    padding: 'clamp(28px, 5vw, 36px)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
    animation: `fadeIn ${0.8 + index * 0.2}s ease`,
    transition: 'all 0.4s ease'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-8px)';
    e.currentTarget.style.borderColor = index % 2 === 0 ? '#4facfe' : '#8b5cf6';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
  }}
  >
    <h3 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: '700', marginBottom: '12px' }}>
      {title}
    </h3>
    <p style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', color: '#d1d5db', lineHeight: '1.6' }}>
      {desc}
    </p>
  </div>
);

const ServiceCard = ({ title, desc }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    padding: 'clamp(24px, 4vw, 28px)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
    e.currentTarget.style.transform = 'translateY(-4px)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
  >
    <h3 style={{ fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: '700', marginBottom: '12px' }}>
      {title}
    </h3>
    <p style={{ fontSize: 'clamp(14px, 2.5vw, 15px)', color: '#d1d5db', lineHeight: '1.6' }}>
      {desc}
    </p>
  </div>
);

const ContactInfo = ({ icon: Icon, text, isLink }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <Icon size={24} />
    {isLink ? (
      <a href={`mailto:${text}`} style={{ color: 'white', textDecoration: 'underline' }}>
        {text}
      </a>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: 'clamp(12px, 2.5vw, 16px) clamp(24px, 5vw, 32px)',
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '10px',
      fontSize: 'clamp(14px, 2.5vw, 16px)',
      fontWeight: '700',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minHeight: '48px'
    }}
    onMouseEnter={(e) => {
      e.target.style.background = 'white';
      e.target.style.color = '#1E40AF';
      e.target.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.target.style.background = 'rgba(255,255,255,0.1)';
      e.target.style.color = 'white';
      e.target.style.transform = 'translateY(0)';
    }}
  >
    <Icon size={20} />
    {label}
  </a>
);

export default Support;
