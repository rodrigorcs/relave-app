import { IVehicle } from '../../models/contracts/vehicle'
import { uuid } from '../../utils/uuid'
import { formatVehicleName } from '../../utils/vehicle'
import { vehiclesRepository } from '../repositories/vehicles'

export const vehiclesService = {
  getVehiclesByUserId: async (userId: string) => {
    const vehicles = await vehiclesRepository.getVehiclesByUserId(userId)
    const formattedVehicles: IVehicle[] = vehicles.map((vehicle) => {
      return {
        ...vehicle,
        modelName: formatVehicleName(vehicle.brandSlug, vehicle.modelName),
      }
    })
    return formattedVehicles
  },
  createVehicle: async (vehicle: Omit<IVehicle, 'id'>) => {
    const newVehicle = { ...vehicle, id: uuid() }
    const createdVehicle = await vehiclesRepository.createVehicle(newVehicle)

    return createdVehicle
  },
  deleteVehicleById: vehiclesRepository.deleteVehicleById
}
