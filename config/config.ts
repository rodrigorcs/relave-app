import { EnvVariables } from "../models/constants/EnvVariables";
import { isAndroid } from "../utils/platform";

const PROJECT_NAME = 'relave'
const REGION = 'southamerica-east1'
const FIREBASE_PROJECT_ID = `${PROJECT_NAME}-${EnvVariables.STAGE}` as const

const LOCALHOST_ADDRESS = isAndroid ? '10.0.2.2' : 'localhost' as const
const FIREBASE_REMOTE_FUNCTIONS_URL = `https://${REGION}-${FIREBASE_PROJECT_ID}.cloudfunctions.net` as const
const FIREBASE_LOCAL_FUNCTIONS_URL = `http://${LOCALHOST_ADDRESS}:5001/${FIREBASE_PROJECT_ID}/${REGION}` as const

const IS_PROD = EnvVariables.STAGE === 'prod'
const IS_LOCAL = EnvVariables.STAGE === 'local'

export const Config = {
  REGION,
  PROJECT_NAME,
  STAGE: EnvVariables.STAGE,
  FIREBASE_PROJECT_ID,
  IS_PROD,
  IS_LOCAL,
  GOOGLE_MAPS_API_URL: 'https://maps.googleapis.com/maps/api',
  FIREBASE_CLOUD_FUNCTIONS_URL: IS_LOCAL ? FIREBASE_LOCAL_FUNCTIONS_URL : FIREBASE_REMOTE_FUNCTIONS_URL,
  IOS_MERCHANT_IDENTIFIER: 'merchant.com.rodrigorcs.relave'
} as const