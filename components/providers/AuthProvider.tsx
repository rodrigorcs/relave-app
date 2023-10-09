import { usersActions } from '../../core/actions/users'
import { storeUser, clearCredentials, getName } from '../../state/slices/auth'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { FC, ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { IAppState } from '../../state/store'
import { IUser } from '../../models/contracts/user'

interface IProps {
  children: ReactNode
}

export const AuthProvider: FC<IProps> = ({ children }) => {
  const name = useSelector((state: IAppState) => getName(state.auth))
  const dispatch = useDispatch()

  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (!user) return dispatch(clearCredentials() as unknown as AnyAction)

    const uncheckedUser: Omit<IUser, "id"> = {
      name,
      firebaseId: user.uid,
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
