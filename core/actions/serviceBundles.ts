import { IServiceBundleWithDetails } from "../../models/contracts/serviceBundle";
import { serviceBundlesService } from "../services/serviceBundles";
import { servicesService } from "../services/services";

export const serviceBundlesActions = {
  getAll: serviceBundlesService.getAllServiceBundles,
  getAllWithDetails: async (): Promise<IServiceBundleWithDetails[]> => {
    const serviceBundles = await serviceBundlesService.getAllServiceBundles()
    const services = await servicesService.getAllServices()

    const serviceBundleWithDetails = serviceBundles.map(serviceBundle => {
      const servicesInBundle = services.filter(service => serviceBundle.services.includes(service.id))
      return {
        ...serviceBundle,
        services: servicesInBundle
      }
    })

    return serviceBundleWithDetails
  }
}