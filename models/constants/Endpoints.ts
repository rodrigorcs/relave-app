import { isAndroid } from '../../utils/platform'
import { Config } from '../../config/config'
import { IOnboardingHint } from '../contracts/onboardingHint'
import { IVehicleBrand } from '../contracts/vehicleBrand'

const LOCALHOST_ADDRESS = isAndroid ? '10.0.2.2' : 'localhost'
const LOCAL_CLOUD_FUNCTIONS_URL = `http://${LOCALHOST_ADDRESS}:5001/${Config.FIREBASE_PROJECT_ID}/${Config.REGION}`

const FIREBASE_CLOUD_FUNCTIONS_URL = `https://${Config.REGION}-${Config.FIREBASE_PROJECT_ID}.cloudfunctions.net`

const BaseUrls = {
  GOOGLE_MAPS_API: 'https://maps.googleapis.com/maps/api',
  FIREBASE_CLOUD_FUNCTIONS: Config.IS_LOCAL ? LOCAL_CLOUD_FUNCTIONS_URL : FIREBASE_CLOUD_FUNCTIONS_URL,
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
