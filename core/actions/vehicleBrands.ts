import { vehicleBrandsService } from "../services/vehicleBrands"

export const vehicleBrandsActions = {
  getAll: vehicleBrandsService.getAllVehicleBrands,
}