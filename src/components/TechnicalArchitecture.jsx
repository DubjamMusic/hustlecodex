import React, { useState } from 'react';

const TechnicalArchitecture = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const layers = {
    client: {
      name: 'Client Layer',
      color: '#00D4AA',
      nodes: [
        { id: 'web', name: 'Web App (Next.js)', x: 80, y: 60, desc: 'SSR/SSG React app with Tailwind CSS, deployed on Vercel' },
        { id: 'mobile', name: 'Mobile (React Native)', x: 280, y: 60, desc: 'Cross-platform iOS/Android with Expo' },
        { id: 'pwa', name: 'PWA', x: 480, y: 60, desc: 'Offline-first progressive web app for recovery tracking' },
      ]
    },
    gateway: {
      name: 'API Gateway & Auth',
      color: '#FF6B35',
      nodes: [
        { id: 'gateway', name: 'API Gateway', x: 180, y: 160, desc: 'Kong/Express gateway with rate limiting, caching' },
        { id: 'auth', name: 'Auth Service', x: 380, y: 160, desc: 'NextAuth.js + JWT, OAuth2, social login' },
      ]
    },
    services: {
      name: 'Microservices',
      color: '#7B68EE',
      nodes: [
        { id: 'user', name: 'User Service', x: 60, y: 280, desc: 'Profile management, achievements, progression' },
        { id: 'game', name: 'Game Engine', x: 200, y: 280, desc: 'RPG mechanics, quests, XP, skill trees' },
        { id: 'recovery', name: 'Recovery Service', x: 340, y: 280, desc: 'Check-ins, milestones, sponsor matching' },
        { id: 'social', name: 'Social Service', x: 480, y: 280, desc: 'Community, groups, messaging, events' },
        { id: 'content', name: 'Content CMS', x: 620, y: 280, desc: 'Strapi/Sanity for quests, educational content' },
      ]
    },
    ai: {
      name: 'AI/ML Layer',
      color: '#FFD700',
      nodes: [
        { id: 'llm', name: 'LLM Service', x: 140, y: 380, desc: 'Claude API for personalized coaching, journaling insights' },
        { id: 'recommend', name: 'Recommendation Engine', x: 340, y: 380, desc: 'Quest suggestions, community matching' },
        { id: 'analytics', name: 'Predictive Analytics', x: 540, y: 380, desc: 'Relapse risk detection, engagement optimization' },
      ]
    },
    data: {
      name: 'Data Layer',
      color: '#00BFFF',
      nodes: [
        { id: 'postgres', name: 'PostgreSQL', x: 100, y: 480, desc: 'Primary relational DB (Supabase/Neon)' },
        { id: 'redis', name: 'Redis', x: 240, y: 480, desc: 'Session cache, leaderboards, real-time state' },
        { id: 'mongo', name: 'MongoDB', x: 380, y: 480, desc: 'Quest templates, user-generated content' },
        { id: 's3', name: 'S3/Cloudflare R2', x: 520, y: 480, desc: 'Media assets, avatars, achievement badges' },
        { id: 'vector', name: 'Pinecone/Weaviate', x: 660, y: 480, desc: 'Vector DB for semantic search, AI context' },
      ]
    },
    infra: {
      name: 'Infrastructure',
      color: '#FF4757',
      nodes: [
        { id: 'vercel', name: 'Vercel', x: 120, y: 580, desc: 'Frontend hosting, edge functions, analytics' },
        { id: 'railway', name: 'Railway/Render', x: 280, y: 580, desc: 'Backend services, auto-scaling' },
        { id: 'cloudflare', name: 'Cloudflare', x: 440, y: 580, desc: 'CDN, DDoS protection, Workers' },
        { id: 'monitoring', name: 'Monitoring Stack', x: 600, y: 580, desc: 'Sentry, LogRocket, Grafana, Prometheus' },
      ]
    }
  };

  const connections = [
    { from: 'web', to: 'gateway' }, { from: 'mobile', to: 'gateway' }, { from: 'pwa', to: 'gateway' },
    { from: 'gateway', to: 'auth' }, { from: 'gateway', to: 'user' }, { from: 'gateway', to: 'game' },
    { from: 'gateway', to: 'recovery' }, { from: 'gateway', to: 'social' }, { from: 'gateway', to: 'content' },
    { from: 'game', to: 'llm' }, { from: 'recovery', to: 'llm' }, { from: 'user', to: 'recommend' },
    { from: 'recovery', to: 'analytics' }, { from: 'social', to: 'recommend' },
    { from: 'user', to: 'postgres' }, { from: 'game', to: 'redis' }, { from: 'content', to: 'mongo' },
    { from: 'social', to: 's3' }, { from: 'llm', to: 'vector' }, { from: 'recommend', to: 'vector' },
    { from: 'web', to: 'vercel' }, { from: 'gateway', to: 'railway' },
    { from: 'vercel', to: 'cloudflare' }, { from: 'railway', to: 'monitoring' },
  ];

  const findNode = (id) => {
    for (const layer of Object.values(layers)) {
      const node = layer.nodes.find(n => n.id === id);
      if (node) return { ...node, color: layer.color };
    }
    return null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      color: '#e0e0e0',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          background: 'linear-gradient(90deg, #00D4AA, #7B68EE, #FF6B35)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          letterSpacing: '-1px'
        }}>
          RecoveryRPG Technical Architecture
        </h1>
        <p style={{ color: '#888', fontSize: '1rem' }}>
          HustleCodeX V3 • Microservices Backend • Multi-Cloud Infrastructure
        </p>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        {Object.entries(layers).map(([key, layer]) => (
          <button
            key={key}
            onClick={() => setActiveLayer(activeLayer === key ? null : key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: activeLayer === key ? layer.color + '33' : 'rgba(255,255,255,0.05)',
              border: `2px solid ${activeLayer === key ? layer.color : 'transparent'}`,
              borderRadius: '8px',
              color: layer.color,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: layer.color
            }} />
            {layer.name}
          </button>
        ))}
      </div>

      {/* Architecture Diagram */}
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '24px',
        overflow: 'auto'
      }}>
        <svg viewBox="0 0 760 650" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'block' }}>
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Connections */}
          {connections.map((conn, i) => {
            const from = findNode(conn.from);
            const to = findNode(conn.to);
            if (!from || !to) return null;
            const isActive = !activeLayer || 
              Object.entries(layers).some(([k, l]) => 
                (activeLayer === k) && (l.nodes.some(n => n.id === conn.from || n.id === conn.to))
              );
            return (
              <line
                key={i}
                x1={from.x + 60}
                y1={from.y + 20}
                x2={to.x + 60}
                y2={to.y + 20}
                stroke={isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)'}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Nodes */}
          {Object.entries(layers).map(([layerKey, layer]) =>
            layer.nodes.map(node => {
              const isActive = !activeLayer || activeLayer === layerKey;
              const isHovered = hoveredNode === node.id;
              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.3, transition: 'opacity 0.2s' }}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width="120"
                    height="40"
                    rx="8"
                    fill={isHovered ? layer.color + '44' : 'rgba(0,0,0,0.6)'}
                    stroke={layer.color}
                    strokeWidth={isHovered ? 2 : 1}
                    filter={isHovered ? 'url(#glow)' : undefined}
                  />
                  <text
                    x={node.x + 60}
                    y={node.y + 25}
                    textAnchor="middle"
                    fill={layer.color}
                    fontSize="10"
                    fontWeight="600"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      </div>

      {/* Node Details Panel */}
      {hoveredNode && (
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: '12px',
          border: `2px solid ${findNode(hoveredNode)?.color}`,
          maxWidth: '600px',
          margin: '24px auto 0'
        }}>
          <h3 style={{ color: findNode(hoveredNode)?.color, marginBottom: '8px' }}>
            {findNode(hoveredNode)?.name}
          </h3>
          <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
            {findNode(hoveredNode)?.desc}
          </p>
        </div>
      )}

      {/* Tech Stack Summary */}
      <div style={{
        marginTop: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {[
          { title: 'Frontend', tech: 'Next.js 15, React 19, Tailwind CSS, Framer Motion', icon: '⚛️' },
          { title: 'Backend', tech: 'Node.js, Express, tRPC, GraphQL Federation', icon: '🔧' },
          { title: 'Database', tech: 'PostgreSQL (Supabase), Redis, MongoDB Atlas', icon: '🗄️' },
          { title: 'AI/ML', tech: 'Claude API, OpenAI, Pinecone, LangChain', icon: '🧠' },
          { title: 'Infrastructure', tech: 'Vercel, Railway, Cloudflare, Docker', icon: '☁️' },
          { title: 'DevOps', tech: 'GitHub Actions, Terraform, Sentry, Grafana', icon: '🚀' },
        ].map((stack, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{stack.icon}</div>
            <h4 style={{ color: '#00D4AA', marginBottom: '4px' }}>{stack.title}</h4>
            <p style={{ color: '#888', fontSize: '0.85rem' }}>{stack.tech}</p>
          </div>
        ))}
      </div>

      {/* Data Flow Section */}
      <div style={{
        marginTop: '40px',
        padding: '24px',
        background: 'rgba(123, 104, 238, 0.1)',
        borderRadius: '16px',
        border: '1px solid rgba(123, 104, 238, 0.3)'
      }}>
        <h2 style={{ color: '#7B68EE', marginBottom: '16px' }}>🔄 Key Data Flows</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {[
            { flow: 'User Check-In', path: 'Mobile → API Gateway → Recovery Service → PostgreSQL → AI Analytics → Push Notification' },
            { flow: 'Quest Completion', path: 'Web App → Game Engine → XP Calculator → Redis (Leaderboard) → Achievement Service' },
            { flow: 'AI Coaching', path: 'Journal Entry → LLM Service → Claude API → Vector DB → Personalized Response' },
            { flow: 'Community Match', path: 'User Profile → Recommendation Engine → Pinecone → Social Service → Real-time Notification' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '16px',
              borderRadius: '8px'
            }}>
              <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>{item.flow}</h4>
              <p style={{ color: '#aaa', fontSize: '0.8rem', fontFamily: 'monospace' }}>{item.path}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalArchitecture;
