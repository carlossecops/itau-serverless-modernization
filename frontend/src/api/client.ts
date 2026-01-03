import type { Payment } from "../types/payment";

const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();

/**
 * Quando a API ainda não existe, usamos um mock em memória.
 * Assim a UI fica "bonita" e demonstrável para o case.
 */
let mockDb: Payment[] = [
  { id: "pay_001", customer_id: "cust-001", amount: 120.5, currency: "BRL", status: "PENDING", created_at: new Date().toISOString() },
  { id: "pay_002", customer_id: "cust-002", amount: 90, currency: "BRL", status: "PROCESSING", created_at: new Date().toISOString() },
];

function hasApi(): boolean {
  return !!baseUrl && baseUrl.length > 0 && !baseUrl.includes("localhost:3000");
}

function apiBase(): string {
  if (!baseUrl) throw new Error("VITE_API_BASE_URL não configurada.");
  return baseUrl.replace(/\/$/, "");
}

function newId(): string {
  return `pay_${Math.random().toString(16).slice(2, 8)}`;
}

export async function listPayments(): Promise<Payment[]> {
  if (!hasApi()) {
    // mock
    await new Promise((r) => setTimeout(r, 300));
    return [...mockDb].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
  }

  const res = await fetch(`${apiBase()}/payments`);
  if (!res.ok) throw new Error(`Erro ao listar pagamentos (${res.status})`);
  return res.json();
}

export async function createPayment(input: { customer_id: string; amount: number; currency: string }): Promise<{ payment_id: string; status: string }> {
  if (!hasApi()) {
    // mock
    await new Promise((r) => setTimeout(r, 300));
    const p: Payment = {
      id: newId(),
      customer_id: input.customer_id,
      amount: input.amount,
      currency: input.currency,
      status: "PENDING",
      created_at: new Date().toISOString(),
    };
    mockDb = [p, ...mockDb];
    return { payment_id: p.id, status: p.status };
  }

  const idempotencyKey = crypto.randomUUID();

  const res = await fetch(`${apiBase()}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error(`Erro ao criar pagamento (${res.status})`);
  return res.json();
}

export async function getPayment(id: string): Promise<Payment> {
  if (!hasApi()) {
    await new Promise((r) => setTimeout(r, 200));
    const found = mockDb.find((p) => p.id === id);
    if (!found) throw new Error("Pagamento não encontrado (mock).");
    return found;
  }

  const res = await fetch(`${apiBase()}/payments/${id}`);
  if (!res.ok) throw new Error(`Erro ao buscar pagamento (${res.status})`);
  return res.json();
}
