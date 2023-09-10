import { vehicleBrandsRepository } from '../repositories/vehicleBrands'

export const vehicleBrandsService = {
  getAllVehicleBrands: vehicleBrandsRepository.getVehicleBrands,
}