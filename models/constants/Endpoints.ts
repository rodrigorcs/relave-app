import { Config } from '../../config/config'
import { IOnboardingHint } from '../contracts/onboardingHint'
import { IVehicleBrand } from '../contracts/vehicleBrand'

const BaseUrls = {
  GOOGLE_MAPS_API: Config.GOOGLE_MAPS_API_URL,
  FIREBASE_CLOUD_FUNCTIONS: Config.FIREBASE_CLOUD_FUNCTIONS_URL,
}

export const Endpoints = {
  VEHICLE_BRANDS_LOGOS: (brandSlug: IVehicleBrand['slug']) => `vehicleBrandsLogos/${brandSlug}.png`,
  ONBOARDING_HINTS_IMAGES: (hintSlug: IOnboardingHint['slug']) =>
    `onboardingHintsImages/${hintSlug}.jpg`,
  GOOGLE_MAPS_TEXTSEARCH: `${BaseUrls.GOOGLE_MAPS_API}/place/textsearch/json`,
  CREATE_STRIPE_PAYMENT_INTENT: `${BaseUrls.FIREBASE_CLOUD_FUNCTIONS}/createStripePaymentIntent`,
  CREATE_STRIPE_CUSTOMER: `${BaseUrls.FIREBASE_CLOUD_FUNCTIONS}/createStripeCustomer`,
  GET_ORDERS_AVAILABILITY: `${BaseUrls.FIREBASE_CLOUD_FUNCTIONS}/getOrdersAvailabilityByDate`,
} as const
