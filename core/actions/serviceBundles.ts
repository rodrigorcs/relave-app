import { serviceBundlesService } from "../services/serviceBundles";

export const serviceBundlesActions = {
  getAll: serviceBundlesService.getAllServiceBundles,
}