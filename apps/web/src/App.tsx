import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={{ width: 260, background: '#0f172a', color: 'white', height: '100vh', padding: 16 }}>
      <h2 style={{ fontSize: 18, marginBottom: 20 }}>TAMKEEN BANK</h2>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Link to="/" style={{ color: 'white' }}>📊 Dashboard</Link>
        <Link to="/transactions" style={{ color: 'white' }}>💸 Transactions</Link>
        <Link to="/wallets" style={{ color: 'white' }}>👛 Wallets</Link>
        <Link to="/fraud" style={{ color: 'white' }}>🚨 Fraud Monitor</Link>
        <Link to="/aml" style={{ color: 'white' }}>🛡️ AML Console</Link>
        <Link to="/fx" style={{ color: 'white' }}>💱 FX Engine</Link>
      </nav>
    </div>
  );
}

function Topbar() {
  return (
    <div style={{ height: 60, background: '#111827', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
      <div>Live Banking System</div>
      <div>Admin • ONLINE</div>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Bank Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
        <div style={{ background: '#1f2937', color: 'white', padding: 16 }}>💰 Total Liquidity: $1,250,000</div>
        <div style={{ background: '#1f2937', color: 'white', padding: 16 }}>📈 TPS: 1,240</div>
        <div style={{ background: '#1f2937', color: 'white', padding: 16 }}>🚨 Risk Alerts: 3</div>
      </div>
    </div>
  );
}

function Transactions() {
  return <div style={{ padding: 20, color: 'white' }}>Transactions Feed (live stream placeholder)</div>;
}

function Wallets() {
  return <div style={{ padding: 20, color: 'white' }}>Wallet Management Console</div>;
}

function Fraud() {
  return <div style={{ padding: 20, color: 'white' }}>Fraud Detection Monitor</div>;
}

function AML() {
  return <div style={{ padding: 20, color: 'white' }}>AML Compliance Dashboard</div>;
}

function FX() {
  return <div style={{ padding: 20, color: 'white' }}>FX Conversion Engine</div>;
}

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, background: '#0b1220', minHeight: '100vh', color: 'white' }}>
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/fraud" element={<Fraud />} />
            <Route path="/aml" element={<AML />} />
            <Route path="/fx" element={<FX />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}