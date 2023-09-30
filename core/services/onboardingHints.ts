import { onboardingHintsRepository } from '../repositories/onboardingHints'

export const onboardingHintsService = {
  getAll: onboardingHintsRepository.getAll,
}