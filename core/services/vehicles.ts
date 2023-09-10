import { vehiclesRepository } from '../repositories/vehicles'
import { uuid } from '../../utils/uuid'
import { IVehicle } from '../../models/contracts/vehicle'

export const vehiclesService = {
  getVehiclesByUserId: vehiclesRepository.getVehiclesByUserId,
  createVehicle: async (vehicle: Omit<IVehicle, 'id'>) => {
    const newVehicle = { ...vehicle, id: uuid() }
    const createdVehicle = await vehiclesRepository.createVehicle(newVehicle)

    return createdVehicle
  }
}