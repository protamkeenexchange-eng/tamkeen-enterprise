import { useEffect, useState } from 'react';
import { fetchFullDashboard, createBankingSocket } from '../api';

export function useDashboard() {
  const [data, setData] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    let socket: WebSocket | null = null;

    async function init() {
      const initial = await fetchFullDashboard();
      setData(initial);

      socket = createBankingSocket((msg) => {
        setEvents((prev) => [msg, ...prev].slice(0, 50));

        // LIVE STATE RECONCILIATION
        setData((prev: any) => {
          if (!prev) return prev;

          switch (msg.type) {
            case 'TRANSACTION_CREATED':
              return {
                ...prev,
                transactions: [msg.payload, ...prev.transactions]
              };

            case 'WALLET_UPDATED':
              return {
                ...prev,
                wallets: prev.wallets.map((w: any) =>
                  w.id === msg.payload.id ? msg.payload : w
                )
              };

            case 'METRICS_UPDATED':
              return {
                ...prev,
                metrics: msg.payload
              };

            default:
              return prev;
          }
        });
      });

      socket.onopen = () => setConnected(true);
      socket.onclose = () => setConnected(false);
    }

    init();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  return {
    data,
    connected,
    events
  };
}