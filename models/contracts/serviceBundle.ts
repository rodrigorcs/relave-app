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
  services: (IService['id'])[]
}

export interface IServiceBundleWithDetails extends Omit<IServiceBundle, 'services'> {
  services: IService[]
}

export enum EServiceBundleKeys {
  ID = 'id',
  NAME = 'name',
  TIER = 'tier',
  PRICE = 'price',
  SERVICES = 'services'
}