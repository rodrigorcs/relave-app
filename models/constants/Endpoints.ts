import { IVehicleBrand } from "../contracts/vehicleBrand";

export const Endpoints = {
  VEHICLE_BRANDS_LOGOS: (brandSlug: IVehicleBrand['slug']) =>
    `vehicleBrandsLogos/${brandSlug}.png`,
  GOOGLE_MAPS_AUTOCOMPLETE: 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
} 