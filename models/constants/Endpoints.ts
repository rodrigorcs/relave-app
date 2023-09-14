import { IVehicleBrand } from "../contracts/vehicleBrand";

const BaseUrls = {
  GOOGLE_MAPS_API: 'https://maps.googleapis.com/maps/api'
}

export const Endpoints = {
  VEHICLE_BRANDS_LOGOS: (brandSlug: IVehicleBrand['slug']) =>
    `vehicleBrandsLogos/${brandSlug}.png`,
  GOOGLE_MAPS_TEXTSEARCH: `${BaseUrls.GOOGLE_MAPS_API}/place/textsearch/json`
} 