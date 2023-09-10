import { IVehicle } from "../../models/contracts/vehicle"
import { vehiclesService } from "../services/vehicles"

export const vehiclesActions = {
  createVehicle: async (vehicle: Omit<IVehicle, 'id'>) => {
    const createdVehicle = await vehiclesService.createVehicle(vehicle)
    return createdVehicle
  }
}