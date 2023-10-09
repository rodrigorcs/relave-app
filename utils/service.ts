import { IService } from '../models/contracts/service'

export const getDuration = (services: IService[] | undefined) => {
  if (!services) return 0
  return services.map((service) => service.duration).reduce((a, b) => a + b)
}
