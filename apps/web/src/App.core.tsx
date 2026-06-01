import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useDashboard } from './hooks/useDashboard';

type Role = 'SUPER_ADMIN' | 'MANAGER' | 'AGENT' | 'MERCHANT' | 'CUSTOMER';

function useAuth() {
  const [user] = useState<{ id: string; role: Role } | null>({
    id: 'u_1',
    role: 'SUPER_ADMIN'
  });

  return { user };
}

function ProtectedRoute({ children, allowedRoles }: any) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <div>Access Denied</div>;

  return children;
}

function Login() {
  return <div style={{ padding: 40 }}>Login Page</div>;
}

function Sidebar() {
  return (
    <div style={{ width: 260, background: '#111827', color: 'white', height: '100vh', padding: 16 }}>
      <h3>System Panel</h3>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link to="/">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/wallets">Wallets</Link>
        <Link to="/fraud">Fraud</Link>
        <Link to="/aml">AML</Link>
        <Link to="/fx">FX</Link>
      </nav>
    </div>
  );
}

function Topbar({ user }: any) {
  const { connected } = useDashboard();

  return (
    <div style={{ height: 60, background: '#0f172a', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
      <div>LIVE SYSTEM</div>
      <div>{user.role} • {connected ? 'ONLINE' : 'OFFLINE'}</div>
    </div>
  );
}

function Dashboard() {
  const { data, events } = useDashboard();

  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h2>Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <div>Liquidity: {data?.metrics?.liquidity || 0}</div>
        <div>TPS: {data?.metrics?.tps || 0}</div>
        <div>Alerts: {data?.metrics?.alerts || 0}</div>
      </div>

      <h3>Live Events</h3>
      <div style={{ maxHeight: 300, overflow: 'auto' }}>
        {events.map((e, i) => (
          <div key={i}>{JSON.stringify(e)}</div>
        ))}
      </div>
    </div>
  );
}

function Placeholder({ title }: any) {
  return <div style={{ padding: 20 }}>{title}</div>;
}

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, background: '#0b1220', minHeight: '100vh' }}>
          <Topbar user={user} />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["SUPER_ADMIN", "MANAGER"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/transactions" element={<Placeholder title="Transactions" />} />
            <Route path="/wallets" element={<Placeholder title="Wallets" />} />
            <Route path="/fraud" element={<Placeholder title="Fraud" />} />
            <Route path="/aml" element={<Placeholder title="AML" />} />
            <Route path="/fx" element={<Placeholder title="FX" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}