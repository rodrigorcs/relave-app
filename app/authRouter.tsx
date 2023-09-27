import { getIsUserSignedIn } from '../state/slices/auth'
import { IAppState } from '../state/store'
import { Stack } from 'expo-router'
import React from 'react'
import { useSelector } from 'react-redux'

export default function AuthRouter() {
  const isUserSignedIn = useSelector(({ auth }: IAppState) => getIsUserSignedIn(auth))
  console.log({ isUserSignedIn })

  return (
    <Stack>{isUserSignedIn ? <Stack.Screen name="(app)" /> : <Stack.Screen name="(auth)" />}</Stack>
  )
}
