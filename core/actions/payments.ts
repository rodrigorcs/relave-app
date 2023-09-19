import { Endpoints } from "../../models/constants/Endpoints"
import { ICreatePaymentIntentResponseBody } from "../../models/contracts/internalApi/payment"
import { httpClient } from "../../utils/httpClient"

export const paymentActions = {
  createPaymentIntent: async (amount: number, customerStripeId: string | null) => {
    const { data: createdPaymentIntent } = await httpClient.post(
      Endpoints.CREATE_PAYMENT_INTENT,
      {
        amount,
        customerStripeId,
      },
    )

    const { paymentIntent, ephemeralKey, customer } = createdPaymentIntent as ICreatePaymentIntentResponseBody

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    }
  }
}