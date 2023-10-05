import { vehiclesRepository } from '../repositories/vehicles'
import { uuid } from '../../utils/uuid'
import { IVehicle } from '../../models/contracts/vehicle'
import { formatVehicleName } from '../../utils/vehicle'

export const vehiclesService = {
  getVehiclesByUserId: async (userId: string) => {
    const vehicles = await vehiclesRepository.getVehiclesByUserId(userId)
    const formattedVehicles: IVehicle[] = vehicles.map((vehicle) => {
      return {
        ...vehicle,
        modelName: formatVehicleName(vehicle.brandSlug, vehicle.modelName)
      }
    })
    return formattedVehicles
  },
  createVehicle: async (vehicle: Omit<IVehicle, 'id'>) => {
    const newVehicle = { ...vehicle, id: uuid() }
    const createdVehicle = await vehiclesRepository.createVehicle(newVehicle)

    return createdVehicle
  }
}
