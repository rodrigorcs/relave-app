import { isAndroid } from '../../utils/platform'
import { IOnboardingHint } from '../contracts/onboardingHint'
import { IVehicleBrand } from '../contracts/vehicleBrand'

const LOCALHOST_URL = isAndroid ? 'http://10.0.2.2' : 'http://localhost'

const BaseUrls = {
  GOOGLE_MAPS_API: 'https://maps.googleapis.com/maps/api',
  FIREBASE_CLOUD_FUNCTIONS: `${LOCALHOST_URL}:5001/lavei-firebase/southamerica-east1`,
}

export const Endpoints = {
  VEHICLE_BRANDS_LOGOS: (brandSlug: IVehicleBrand['slug']) => `vehicleBrandsLogos/${brandSlug}.png`,
  ONBOARDING_HINTS_IMAGES: (hintSlug: IOnboardingHint['slug']) =>
    `onboardingHintsImages/${hintSlug}.jpg`,
  GOOGLE_MAPS_TEXTSEARCH: `${BaseUrls.GOOGLE_MAPS_API}/place/textsearch/json`,
  CREATE_STRIPE_PAYMENT_INTENT: `${BaseUrls.FIREBASE_CLOUD_FUNCTIONS}/createStripePaymentIntent`,
  CREATE_STRIPE_CUSTOMER: `${BaseUrls.FIREBASE_CLOUD_FUNCTIONS}/createStripeCustomer`,
  GET_ORDERS_AVAILABILITY: `${BaseUrls.FIREBASE_CLOUD_FUNCTIONS}/getOrdersAvailabilityByDate`,
}
