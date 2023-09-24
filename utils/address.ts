import { TGoogleMapsPlaceResult } from "../models/contracts/externalApi/googleMaps"

export const formatPlaceAddress = (place: TGoogleMapsPlaceResult | null) => {
  const placeName = place?.name ?? null
  const placeAddress = place?.formatted_address ?? null
  const placeTypes = place?.types ?? []

  const SECTION_DIVIDER = ' - '
  const isEstablishment = placeTypes.includes('establishment')

  if (isEstablishment) {
    const mainAddressSection = placeAddress ? placeAddress.split(SECTION_DIVIDER)[0].trim() : null
    return {
      primaryText: placeName ?? '',
      secondaryText: mainAddressSection
    }
  }

  const splitAddress = placeAddress ? placeAddress.split(SECTION_DIVIDER) : []
  const [mainSection, ...otherSections] = splitAddress

  return {
    primaryText: mainSection.trim(),
    secondaryText: otherSections.join(SECTION_DIVIDER).trim()
  }

}