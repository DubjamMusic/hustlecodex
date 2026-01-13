import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Mock inventory data - would come from API
  const [inventory, setInventory] = useState([
    { id: 1, name: "Hero's Journey Pack", category: "Starter Packs", type: "cosmetic", stock: 999, sold: 1247, revenue: 12469.53, status: "active", rarity: "common" },
    { id: 2, name: "Phoenix Rising Badge", category: "Achievements", type: "badge", stock: 500, sold: 892, revenue: 4459.08, status: "active", rarity: "rare" },
    { id: 3, name: "Midnight Guardian Avatar", category: "Avatars", type: "cosmetic", stock: 250, sold: 523, revenue: 7844.77, status: "active", rarity: "epic" },
    { id: 4, name: "30-Day Streak Shield", category: "Achievements", type: "badge", stock: 100, sold: 2341, revenue: 0, status: "active", rarity: "legendary" },
    { id: 5, name: "Wisdom Tree Theme", category: "Themes", type: "cosmetic", stock: 750, sold: 156, revenue: 779.44, status: "low_stock", rarity: "rare" },
    { id: 6, name: "Warrior's Path Quest Line", category: "Quests", type: "content", stock: 999, sold: 3892, revenue: 19459.08, status: "active", rarity: "common" },
    { id: 7, name: "Serenity Soundscape", category: "Audio", type: "cosmetic", stock: 50, sold: 89, revenue: 444.11, status: "low_stock", rarity: "epic" },
    { id: 8, name: "Legacy Champion Title", category: "Titles", type: "cosmetic", stock: 25, sold: 12, revenue: 599.88, status: "limited", rarity: "legendary" },
  ]);

  const [stats, setStats] = useState({
    totalRevenue: 45556.89,
    totalSold: 9152,
    activeItems: 8,
    lowStock: 2,
    conversionRate: 8.4,
    avgOrderValue: 4.98
  });

  const categories = ["All", "Starter Packs", "Achievements", "Avatars", "Themes", "Quests", "Audio", "Titles"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const rarityColors = {
    common: { bg: '#4a5568', text: '#e2e8f0' },
    rare: { bg: '#3182ce', text: '#bee3f8' },
    epic: { bg: '#805ad5', text: '#e9d8fd' },
    legendary: { bg: '#d69e2e', text: '#fefcbf' }
  };

  const statusColors = {
    active: { bg: '#22543d', text: '#9ae6b4' },
    low_stock: { bg: '#744210', text: '#fbd38d' },
    limited: { bg: '#742a2a', text: '#feb2b2' },
    inactive: { bg: '#1a202c', text: '#718096' }
  };

  const filteredInventory = inventory
    .filter(item => 
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === filteredInventory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredInventory.map(i => i.id));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#e0e0e0'
    }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '260px',
        height: '100vh',
        background: 'rgba(0,0,0,0.4)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '32px', padding: '0 8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #7B68EE, #00D4AA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ⚔️
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>RecoveryRPG</div>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Admin Console</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1 }}>
          {[
            { id: 'overview', icon: '📊', label: 'Overview' },
            { id: 'inventory', icon: '📦', label: 'Inventory' },
            { id: 'orders', icon: '🧾', label: 'Orders' },
            { id: 'users', icon: '👥', label: 'Users' },
            { id: 'quests', icon: '🗺️', label: 'Quest Editor' },
            { id: 'analytics', icon: '📈', label: 'Analytics' },
            { id: 'settings', icon: '⚙️', label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                marginBottom: '4px',
                background: activeTab === item.id ? 'rgba(123, 104, 238, 0.2)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: activeTab === item.id ? '#7B68EE' : '#888',
                cursor: 'pointer',
                fontSize: '0.9rem',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div style={{
          padding: '16px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px'
          }}>
            D
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>Dusty</div>
            <div style={{ fontSize: '0.7rem', color: '#666' }}>Admin</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '260px', padding: '24px 32px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              marginBottom: '4px',
              color: '#fff'
            }}>
              Inventory Management
            </h1>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Manage cosmetics, achievements, and in-app items
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}>
              Export CSV
            </button>
            <button style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #7B68EE, #00D4AA)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}>
              + Add Item
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: '#00D4AA' },
            { label: 'Items Sold', value: stats.totalSold.toLocaleString(), icon: '🛒', color: '#7B68EE' },
            { label: 'Active Items', value: stats.activeItems, icon: '✨', color: '#FFD700' },
            { label: 'Low Stock', value: stats.lowStock, icon: '⚠️', color: '#FF6B35' },
            { label: 'Conversion', value: `${stats.conversionRate}%`, icon: '📈', color: '#00BFFF' },
            { label: 'Avg Order', value: `$${stats.avgOrderValue}`, icon: '🎯', color: '#FF4757' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              </div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: stat.color,
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#666' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          alignItems: 'center'
        }}>
          <div style={{
            flex: 1,
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1rem'
            }}>🔍</span>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  background: selectedCategory === cat 
                    ? 'rgba(123, 104, 238, 0.2)' 
                    : 'rgba(255,255,255,0.03)',
                  border: selectedCategory === cat 
                    ? '1px solid #7B68EE' 
                    : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px',
                  color: selectedCategory === cat ? '#7B68EE' : '#888',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 16px',
            background: 'rgba(123, 104, 238, 0.1)',
            border: '1px solid rgba(123, 104, 238, 0.3)',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <span style={{ color: '#7B68EE', fontWeight: 600 }}>
              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
            </span>
            <button style={{
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}>
              Edit Bulk
            </button>
            <button style={{
              padding: '6px 12px',
              background: 'rgba(255,71,87,0.2)',
              border: 'none',
              borderRadius: '4px',
              color: '#FF4757',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}>
              Delete
            </button>
          </div>
        )}

        {/* Inventory Table */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ 
                  padding: '16px', 
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <input 
                    type="checkbox"
                    checked={selectedItems.length === filteredInventory.length && filteredInventory.length > 0}
                    onChange={selectAll}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                {[
                  { key: 'name', label: 'Item Name' },
                  { key: 'category', label: 'Category' },
                  { key: 'rarity', label: 'Rarity' },
                  { key: 'stock', label: 'Stock' },
                  { key: 'sold', label: 'Sold' },
                  { key: 'revenue', label: 'Revenue' },
                  { key: 'status', label: 'Status' },
                ].map(col => (
                  <th 
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      padding: '16px',
                      textAlign: 'left',
                      color: '#888',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    {col.label}
                    {sortConfig.key === col.key && (
                      <span style={{ marginLeft: '4px' }}>
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                ))}
                <th style={{ 
                  padding: '16px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)'
                }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, i) => (
                <tr 
                  key={item.id}
                  style={{
                    background: selectedItems.includes(item.id) 
                      ? 'rgba(123, 104, 238, 0.08)' 
                      : i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{item.type}</div>
                  </td>
                  <td style={{ 
                    padding: '16px', 
                    color: '#888', 
                    fontSize: '0.85rem',
                    borderBottom: '1px solid rgba(255,255,255,0.04)'
                  }}>
                    {item.category}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      background: rarityColors[item.rarity].bg,
                      color: rarityColors[item.rarity].text
                    }}>
                      {item.rarity}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '16px', 
                    fontFamily: 'monospace',
                    borderBottom: '1px solid rgba(255,255,255,0.04)'
                  }}>
                    {item.stock === 999 ? '∞' : item.stock}
                  </td>
                  <td style={{ 
                    padding: '16px', 
                    fontFamily: 'monospace',
                    borderBottom: '1px solid rgba(255,255,255,0.04)'
                  }}>
                    {item.sold.toLocaleString()}
                  </td>
                  <td style={{ 
                    padding: '16px', 
                    fontFamily: 'monospace',
                    color: '#00D4AA',
                    borderBottom: '1px solid rgba(255,255,255,0.04)'
                  }}>
                    ${item.revenue.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      background: statusColors[item.status].bg,
                      color: statusColors[item.status].text
                    }}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <button style={{
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      color: '#888',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '24px',
          color: '#666',
          fontSize: '0.85rem'
        }}>
          <span>Showing {filteredInventory.length} of {inventory.length} items</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3].map(page => (
              <button
                key={page}
                style={{
                  width: '32px',
                  height: '32px',
                  background: page === 1 ? 'rgba(123, 104, 238, 0.2)' : 'rgba(255,255,255,0.03)',
                  border: page === 1 ? '1px solid #7B68EE' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px',
                  color: page === 1 ? '#7B68EE' : '#888',
                  cursor: 'pointer'
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
