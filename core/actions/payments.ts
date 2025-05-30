import { Endpoints } from '../../models/constants/Endpoints'
import { ICreatePaymentIntentResponseBody } from '../../models/contracts/internalApi/payment'
import { httpClient } from '../../utils/httpClient'

export const paymentActions = {
  createPaymentIntent: async (customerStripeId: string | null, orderId: string, amount: number) => {
    const { data: createdPaymentIntent } = await httpClient.post(
      Endpoints.CREATE_STRIPE_PAYMENT_INTENT,
      {
        amount,
        orderId,
        customerStripeId,
      },
    )

    const { paymentIntentClientSecret, customerEphemeralKeySecret, customerId } =
      createdPaymentIntent as ICreatePaymentIntentResponseBody

    return {
      paymentIntentClientSecret,
      customerEphemeralKeySecret,
      customerId,
    }
  },
}
