export interface ICreatePaymentIntentResponseBody {
  paymentIntentClientSecret: string | null,
  customerEphemeralKeySecret: string | undefined,
  customerId: string | null,
  publishableKey: string
}