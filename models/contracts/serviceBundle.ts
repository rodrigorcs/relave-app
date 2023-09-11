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