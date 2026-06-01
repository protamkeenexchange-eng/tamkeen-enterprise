import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { Page, Card, MetricCard, Table } from '../components/ui';

function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: 80 }}>
      <polyline fill="none" stroke="#6366f1" strokeWidth="2" points={points} />
    </svg>
  );
}

export default function Dashboard() {
  const { data, events, connected } = useDashboard();

  const liquidityHistory = (data?.metrics?.history || [10, 30, 20, 50, 80, 60, 90]);

  return (
    <Page title="Fintech Control Center">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <MetricCard label="Liquidity" value={data?.metrics?.liquidity || 0} icon="💰" />
        <MetricCard label="TPS" value={data?.metrics?.tps || 0} icon="📈" />
        <MetricCard label="Alerts" value={data?.metrics?.alerts || 0} icon="🚨" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 20 }}>
        <Card>
          <h3>Liquidity Trend</h3>
          <MiniChart data={liquidityHistory} />
        </Card>

        <Card>
          <h3>Status</h3>
          <p>Connection: {connected ? 'LIVE' : 'OFFLINE'}</p>
          <p>Events: {events.length}</p>
        </Card>
      </div>

      <div style={{ marginTop: 20 }}>
        <Card>
          <h3>Recent Transactions</h3>
          <Table
            headers={["ID", "Amount", "Currency", "Status"]}
            rows={(data?.transactions || []).slice(0, 5).map((t: any) => [
              t.id,
              t.amount,
              t.currency,
              t.status
            ])}
          />
        </Card>
      </div>

      <div style={{ marginTop: 20 }}>
        <Card>
          <h3>Live Events</h3>
          <div style={{ maxHeight: 200, overflow: 'auto', fontSize: 12 }}>
            {events.slice(0, 20).map((e: any, i: number) => (
              <div key={i}>{JSON.stringify(e)}</div>
            ))}
          </div>
        </Card>
      </div>
    </Page>
  );
}