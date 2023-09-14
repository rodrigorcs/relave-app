import { Autocomplete, CustomText, ECustomTextVariants } from '../components/common'
import { locationActions } from '../core/actions/location'
import { useAsyncData } from '../hooks'
import { useDebounce } from '../hooks/useDebounce'
import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'

export default function Appointment() {
  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input, 500)

  const [places] = useAsyncData(
    () => locationActions.getNearbyPlaces(debouncedInput),
    [debouncedInput],
  )

  const options =
    (places ?? []).map((place) => ({
      id: place.place_id as string,
      name: place.name as string,
      address: place.formatted_address as string,
    })) ?? []

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1">
        <Autocomplete
          options={options}
          selectedOption={null}
          onInputChange={setInput}
          filterOnType={false}
          listItemClassName={'flex-col items-start'}
          large
        >
          {(option) => (
            <>
              <CustomText variant={ECustomTextVariants.BODY2}>{option.name}</CustomText>
              <CustomText variant={ECustomTextVariants.HELPER2} customClassName="text-neutrals-500">
                {option.address as string}
              </CustomText>
            </>
          )}
        </Autocomplete>
      </View>
    </SafeAreaView>
  )
}
