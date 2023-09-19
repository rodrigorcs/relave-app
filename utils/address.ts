export const formatPlaceAddress = (name: string | null, address: string | null, types: string[]) => {
  const SECTION_DIVIDER = ' - '
  const isEstablishment = types.includes('establishment')

  if (isEstablishment) {
    const mainAddressSection = address ? address.split(SECTION_DIVIDER)[0].trim() : null
    return {
      primaryText: name ?? '',
      secondaryText: mainAddressSection
    }
  }

  const splitAddress = address ? address.split(SECTION_DIVIDER) : []
  const [mainSection, ...otherSections] = splitAddress

  return {
    primaryText: mainSection.trim(),
    secondaryText: otherSections.join(SECTION_DIVIDER).trim()
  }

}