import { IService } from "./service"

export enum EServiceBundleTiers {
  SIMPLE = 'simple',
  ADVANCED = 'advanced',
  PREMIUM = 'premium'
}

export interface IServiceBundle {
  id: string
  name: string
  tier: EServiceBundleTiers
  price: number
  exclusiveServices: (IService['id'])[]
  allServices: (IService['id'])[]
}

export interface IServiceBundleWithDetails extends Omit<IServiceBundle, 'exclusiveServices' | 'allServices'> {
  exclusiveServices: IService[]
  allServices: IService[]
}

export enum EServiceBundleKeys {
  ID = 'id',
  NAME = 'name',
  TIER = 'tier',
  PRICE = 'price',
  EXCLUSIVE_SERVICES = 'exclusiveServices',
  ALL_SERVICES = 'allServices'
}
