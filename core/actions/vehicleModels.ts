import { vehicleModelsService } from "../services/vehicleModels"

export const vehicleModelsActions = {
  getByBrandId: vehicleModelsService.getVehicleModelsByBrandId,
}