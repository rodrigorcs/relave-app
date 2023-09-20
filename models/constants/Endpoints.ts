import { IVehicleBrand } from "../contracts/vehicleBrand";

const BaseUrls = {
  GOOGLE_MAPS_API: 'https://maps.googleapis.com/maps/api',
  FIREBASE_CLOUD_FUNCTIONS: 'http://localhost:5001/lavei-firebase/southamerica-east1'
}

export const Endpoints = {
  VEHICLE_BRANDS_LOGOS: (brandSlug: IVehicleBrand['slug']) =>
    `vehicleBrandsLogos/${brandSlug}.png`,
  GOOGLE_MAPS_TEXTSEARCH: `${BaseUrls.GOOGLE_MAPS_API}/place/textsearch/json`,
  CREATE_STRIPE_PAYMENT_INTENT: `${BaseUrls.FIREBASE_CLOUD_FUNCTIONS}/createStripePaymentIntent`,
  CREATE_STRIPE_CUSTOMER: `${BaseUrls.FIREBASE_CLOUD_FUNCTIONS}/createStripeCustomer`,
} 