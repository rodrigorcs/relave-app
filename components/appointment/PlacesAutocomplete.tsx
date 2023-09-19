import { locationActions } from '../../core/actions/location'
import { useAsyncData, useDebounce } from '../../hooks'
import { TGoogleMapsPlaceResult } from '../../models/contracts/externalApi/googleMaps'
import { Autocomplete, CustomText, ECustomTextVariants } from '../common'
import React, { FC, useState } from 'react'
import { View } from 'react-native'

interface IPlaceOption {
  id: string
  name: string
  address: string
}

interface IProps {
  selectedPlace: TGoogleMapsPlaceResult | null
  onChange: (selectedPlace: TGoogleMapsPlaceResult | null) => void
}

export const PlacesAutocomplete: FC<IProps> = ({ selectedPlace, onChange }) => {
  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input, 500)

  const [places] = useAsyncData(
    () => locationActions.getNearbyPlaces(debouncedInput),
    [debouncedInput],
  )

  const placeToOption = (place: TGoogleMapsPlaceResult | null): IPlaceOption | null => {
    if (!place) return null

    return {
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
    } as IPlaceOption
  }

  const placeFromOption = (places: TGoogleMapsPlaceResult[] | null, placeId: string) => {
    const place = places?.find((place) => place.place_id === placeId)
    return place
  }

  const options = (places ?? []).map((place) => placeToOption(place)) ?? []

  const selectedOption = placeToOption(selectedPlace)

  const handleChangeAddress = (place: IPlaceOption | null) => {
    if (!place?.id) return

    const googlePlace = placeFromOption(places, place.id)
    onChange(googlePlace ?? null)
  }

  return (
    <>
      {/* @ts-expect-error // FIXME: IPlace does not satisfy IOption */}
      <Autocomplete<IPlace>
        title="Digite o seu endereço"
        placeholder="Av. Tancredo Neves, 148"
        options={options}
        selectedOption={selectedOption}
        onChange={handleChangeAddress}
        onInputChange={setInput}
        filterOnType={false}
        large
      >
        {(option) => (
          <View className="flex-1 flex-col items-start">
            <CustomText variant={ECustomTextVariants.BODY2}>{option.name}</CustomText>
            <CustomText variant={ECustomTextVariants.HELPER2} customClassName="text-neutrals-500">
              {option.address as string}
            </CustomText>
          </View>
        )}
      </Autocomplete>
    </>
  )
}
