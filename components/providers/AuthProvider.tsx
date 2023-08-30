import { storeCredentials, logout } from '../../state/slices/auth'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { FC, ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'

interface IProps {
  children: ReactNode
}

export const AuthProvider: FC<IProps> = ({ children }) => {
  const dispatch = useDispatch()

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) return dispatch(logout() as unknown as AnyAction)

    dispatch(
      storeCredentials({
        displayName: user.displayName,
        email: user.email,
        isEmailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        metadata: user.metadata,
        multiFactor: user.multiFactor,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerData: user.providerData,
        providerId: user.providerId,
        id: user.uid,
      }),
    )
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  return <>{children}</>
}
