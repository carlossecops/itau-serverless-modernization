import type { Payment } from "../types/payment";

const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();

/**
 * Fallback em memória utilizado quando a API backend
 * ainda não está disponível ou configurada.
 *
 * Permite desenvolvimento, testes e validação da interface
 * de forma desacoplada da infraestrutura.
 */
let mockDb: Payment[] = [
  {
    id: "pay_001",
    customer_id: "cust-001",
    amount: 120.5,
    currency: "BRL",
    status: "PENDING",
    created_at: new Date().toISOString(),
  },
  {
    id: "pay_002",
    customer_id: "cust-002",
    amount: 90,
    currency: "BRL",
    status: "PROCESSING",
    created_at: new Date().toISOString(),
  },
];

function isApiConfigured(): boolean {
  return Boolean(baseUrl && baseUrl.length > 0 && !baseUrl.includes("localhost:3000"));
}

function getApiBaseUrl(): string {
  if (!baseUrl) {
    throw new Error("VITE_API_BASE_URL não configurada.");
  }
  return baseUrl.replace(/\/$/, "");
}

function generatePaymentId(): string {
  return `pay_${Math.random().toString(16).slice(2, 10)}`;
}

export async function listPayments(): Promise<Payment[]> {
  if (!isApiConfigured()) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...mockDb].sort((a, b) =>
      (b.created_at ?? "").localeCompare(a.created_at ?? "")
    );
  }

  const response = await fetch(`${getApiBaseUrl()}/payments`);

  if (!response.ok) {
    throw new Error(`Erro ao listar pagamentos (${response.status})`);
  }

  return response.json();
}

export async function createPayment(input: {
  customer_id: string;
  amount: number;
  currency: string;
}): Promise<{ payment_id: string; status: string }> {
  if (!isApiConfigured()) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const payment: Pa
