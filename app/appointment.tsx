import { Autocomplete } from '../components/common'
import { locationActions } from '../core/actions/location'
import { useAsyncData } from '../hooks'
import { useDebounce } from '../hooks/useDebounce'
import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'

export default function Appointment() {
  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input, 1500)

  const [places] = useAsyncData(
    () => locationActions.getNearbyPlaces(debouncedInput),
    [debouncedInput],
  )

  const options =
    (places ?? []).map((place) => ({
      id: place.place_id as string,
      name: `${place.name}`,
    })) ?? []

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1">
        <Autocomplete
          options={options}
          selectedOption={null}
          onInputChange={setInput}
          filterOnType={false}
        />
      </View>
    </SafeAreaView>
  )
}
