import { IServiceBundleWithDetails } from "../../models/contracts/serviceBundle";
import { serviceBundlesService } from "../services/serviceBundles";
import { servicesService } from "../services/services";

export const serviceBundlesActions = {
  getAll: serviceBundlesService.getAllServiceBundles,
  getAllWithDetails: async (): Promise<IServiceBundleWithDetails[]> => {
    const serviceBundles = await serviceBundlesService.getAllServiceBundles()
    const services = await servicesService.getAllServices()

    const serviceBundleWithDetails = serviceBundles.map(serviceBundle => {
      const exclusiveServicesInBundle = services.filter(service => serviceBundle.exclusiveServices.includes(service.id))
      const allServicesInBundle = services.filter(service => serviceBundle.allServices.includes(service.id))
      return {
        ...serviceBundle,
        exclusiveServices: exclusiveServicesInBundle,
        allServices: allServicesInBundle
      }
    })

    return serviceBundleWithDetails
  }
}