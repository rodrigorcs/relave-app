import { vehicleModelsRepository } from '../repositories/vehicleModels'

export const vehicleModelsService = {
  getVehicleModelsByBrandId: vehicleModelsRepository.getVehicleModelsByBrandId,
}
