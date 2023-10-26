import { EnvVariables } from "../models/constants/EnvVariables";

const PROJECT_NAME = 'relave'

export const Config = {
  REGION: 'southamerica-east1',
  PROJECT_NAME,
  STAGE: EnvVariables.STAGE,
  FIREBASE_PROJECT_ID: `${PROJECT_NAME}-${EnvVariables.STAGE}`,
  IS_PROD: EnvVariables.STAGE === 'prod',
  IS_LOCAL: EnvVariables.STAGE === 'local'
} as const