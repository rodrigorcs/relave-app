export interface ICreatePaymentIntentResponseBody {
  paymentIntentClientSecret: string | null,
  customerEphemeralKeySecret: string | undefined,
  customerId: string | null,
  publishableKey: string
}

export interface ICreateCustomerRequestBody {
  customerInternalId: string
  phoneNumber: string
}