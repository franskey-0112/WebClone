import React from 'react';
import Link from 'next/link';

export default function Home() {
  const sites = [
    {
      name: '航班预订',
      path: '/flights',
      description: '航班搜索和预订系统',
      color: '#2196F3',
      icon: '✈️'
    },
    {
      name: '亚马逊购物',
      path: '/amazon',
      description: '在线购物平台',
      color: '#FF9900',
      icon: '🛒'
    }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>WebClone</h1>
        <p>网站克隆项目 - 用于 Web Agent 测试与评估</p>
        <div className="home-subtitle">
          选择您要访问的网站
        </div>
      </header>

      <main className="sites-grid">
        {sites.map((site) => (
          <Link key={site.path} href={site.path}>
            <div className="site-card" style={{ borderColor: site.color }}>
              <div className="site-icon" style={{ backgroundColor: site.color }}>
                {site.icon}
              </div>
              <h2>{site.name}</h2>
              <p>{site.description}</p>
              <div className="site-link" style={{ color: site.color }}>
                访问网站 →
              </div>
            </div>
          </Link>
        ))}
      </main>

      <footer className="home-footer">
        <p>📖 查看 <a href="https://github.com/anthropics/WebClone" target="_blank" rel="noopener noreferrer">README</a> 了解如何添加新网站</p>
      </footer>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 40px 20px;
        }

        .home-header {
          text-align: center;
          color: white;
          margin-bottom: 50px;
        }

        .home-header h1 {
          font-size: 56px;
          font-weight: bold;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .home-header p {
          font-size: 18px;
          opacity: 0.8;
          margin-bottom: 8px;
        }

        .home-subtitle {
          font-size: 16px;
          opacity: 0.6;
        }

        .sites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          max-width: 800px;
          margin: 0 auto;
        }

        .site-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 30px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .site-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.1);
        }

        .site-icon {
          width: 70px;
          height: 70px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          margin-bottom: 20px;
        }

        .site-card h2 {
          font-size: 24px;
          color: white;
          margin-bottom: 10px;
        }

        .site-card p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          margin-bottom: 20px;
        }

        .site-link {
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .site-card:hover .site-link {
          letter-spacing: 1px;
        }

        .home-footer {
          text-align: center;
          margin-top: 60px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }

        .home-footer a {
          color: #00d9ff;
          text-decoration: none;
        }

        .home-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .home-header h1 {
            font-size: 36px;
          }

          .sites-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  );
}
