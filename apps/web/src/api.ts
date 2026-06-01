// TAMKEEN Frontend API Layer
// Connects Dashboard UI to Backend Microservices

const API_BASE = "http://localhost:8080";

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface Wallet {
  id: string;
  balance: number;
  currency: string;
}

// -----------------------------
// REST CLIENT
// -----------------------------

export async function fetchDashboardMetrics() {
  const res = await fetch(`${API_BASE}/metrics`);
  return res.json();
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${API_BASE}/transactions`);
  return res.json();
}

export async function fetchWallets(): Promise<Wallet[]> {
  const res = await fetch(`${API_BASE}/wallets`);
  return res.json();
}

// -----------------------------
// REAL-TIME LAYER (WebSocket)
// -----------------------------

export function createBankingSocket(onMessage: (data: any) => void) {
  const socket = new WebSocket("ws://localhost:8080/realtime");

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "SUBSCRIBE", channel: "BANKING_EVENTS" }));
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (e) {
      console.error("Invalid WS message", e);
    }
  };

  socket.onerror = (err) => {
    console.error("WebSocket error", err);
  };

  return socket;
}

// -----------------------------
// DASHBOARD AGGREGATION LAYER
// -----------------------------

export async function fetchFullDashboard() {
  const [metrics, transactions, wallets] = await Promise.all([
    fetchDashboardMetrics(),
    fetchTransactions(),
    fetchWallets()
  ]);

  return {
    metrics,
    transactions,
    wallets
  };
}