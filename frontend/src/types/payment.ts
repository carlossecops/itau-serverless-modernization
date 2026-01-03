export type PaymentStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type Payment = {
  id: string;
  customer_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at?: string;
};
