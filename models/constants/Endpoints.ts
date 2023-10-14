// import { isAndroid } from '../../utils/platform'
import { IOnboardingHint } from '../contracts/onboardingHint'
import { IVehicleBrand } from '../contracts/vehicleBrand'

const REGION = 'southamerica-east1'
const PROJECT_NAME = 'lavei-firebase'

// const LOCALHOST_ADDRESS = isAndroid ? '10.0.2.2' : 'localhost'
// const LOCALHOST_PORT = '5001'
// const LOCALHOST_URL = `http://${LOCALHOST_ADDRESS}:${LOCALHOST_PORT}/${PROJECT_NAME}/${REGION}`

const SANDBOX_URL = `https://${REGION}-${PROJECT_NAME}.cloudfunctions.net`

const BaseUrls = {
  GOOGLE_MAPS_API: 'https://maps.googleapis.com/maps/api',
  FIREBASE_CLOUD_FUNCTIONS: SANDBOX_URL,
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
