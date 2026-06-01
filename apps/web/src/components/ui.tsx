import React from 'react';

export const theme = {
  bg: '#0b1220',
  panel: '#0f172a',
  card: '#111827',
  border: 'rgba(255,255,255,0.08)',
  text: '#e5e7eb',
  muted: '#94a3b8',
  primary: '#6366f1',
  danger: '#ef4444',
  success: '#22c55e'
};

export function Card({ children }: any) {
  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 16, color: theme.text }}>
      {children}
    </div>
  );
}

export function MetricCard({ label, value, icon }: any) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: theme.muted, fontSize: 12 }}>{label}</div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{value}</div>
        </div>
        <div style={{ fontSize: 22 }}>{icon}</div>
      </div>
    </Card>
  );
}

export function Button({ children, variant = 'primary' }: any) {
  const styles: any = {
    primary: { background: theme.primary, color: 'white' },
    danger: { background: theme.danger, color: 'white' },
    ghost: { background: 'transparent', border: `1px solid ${theme.border}`, color: theme.text }
  };

  return (
    <button style={{ padding: '10px 14px', borderRadius: 10, cursor: 'pointer', ...styles[variant] }}>
      {children}
    </button>
  );
}

export function Table({ headers, rows }: any) {
  return (
    <div style={{ overflow: 'auto', borderRadius: 12, border: `1px solid ${theme.border}` }}>
      <table style={{ width: '100%', color: theme.text }}>
        <thead>
          <tr>
            {headers.map((h: string, i: number) => (
              <th key={i} style={{ textAlign: 'left', padding: 12, color: theme.muted }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any, i: number) => (
            <tr key={i}>
              {r.map((c: any, j: number) => (
                <td key={j} style={{ padding: 12 }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Page({ title, children }: any) {
  return (
    <div style={{ padding: 24, color: theme.text }}>
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>{title}</h1>
      {children}
    </div>
  );
}