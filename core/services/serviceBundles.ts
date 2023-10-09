import { serviceBundlesRepository } from '../repositories/serviceBundles'

export const serviceBundlesService = {
  getAllServiceBundles: serviceBundlesRepository.getAllServiceBundles,
}
