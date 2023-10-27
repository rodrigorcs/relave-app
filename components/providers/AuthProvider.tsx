import { usersActions } from '../../core/actions/users'
import { ICreateUser } from '../../models/contracts/user'
import { storeUser, clearCredentials } from '../../state/slices/auth'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { FC, ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'

interface IProps {
  children: ReactNode
}

export const AuthProvider: FC<IProps> = ({ children }) => {
  const dispatch = useDispatch()

  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) return dispatch(clearCredentials() as unknown as AnyAction)

    const uncheckedUser: ICreateUser = {
      name: null,
      firebaseId: user.uid,
      lastAddress: null,
      credentials: {
        isAnonymous: user.isAnonymous,
        metadata: user.metadata,
        multiFactor: user.multiFactor,
        phoneNumber: user.phoneNumber,
        providerData: user.providerData,
        providerId: user.providerId,
      },
    }

    const checkedUser = await usersActions.getOrCreateUser(uncheckedUser)

    dispatch(storeUser(checkedUser))
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  useEffect(() => {
    auth().setLanguageCode('pt')
  }, [])

  return <>{children}</>
}
