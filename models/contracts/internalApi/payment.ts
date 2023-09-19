export interface ICreatePaymentIntentResponseBody {
  paymentIntent: string | null,
  ephemeralKey: string | undefined,
  customer: string | null,
  publishableKey: string
}