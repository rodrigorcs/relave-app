import {
  CustomButton,
  CustomText,
  ECustomButtonVariants,
  ECustomTextVariants,
  SafeAreaView,
} from '../../components/common'
import {
  AddVehicleCard,
  AddVehicleBottomSheet,
  ServiceBundleCard,
  UserVehicleCard,
  AddServicesBottomSheet,
  ServiceBundleCardSkeleton,
  UserVehicleCardSkeleton,
} from '../../components/home'
import { serviceBundlesActions } from '../../core/actions/serviceBundles'
import { vehiclesActions } from '../../core/actions/vehicles'
import { useAsyncData, useSkeletonArray } from '../../hooks'
import {
  EServiceBundleTiers,
  IServiceBundleWithDetails,
} from '../../models/contracts/serviceBundle'
import { IVehicle } from '../../models/contracts/vehicle'
import { getCurrentUser, signOut } from '../../state/slices/auth'
import {
  getSelectedServiceBundle,
  getSelectedVehicle,
  setSelectedServiceBundle,
  setSelectedVehicle,
} from '../../state/slices/cart'
import { IAppState } from '../../state/store'
import { useIsFocused } from '@react-navigation/native'
import {
  Flash as FlashIcon,
  Spark as SparkIcon,
  DropletHalf as DropletIcon,
} from 'iconoir-react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { AnyAction } from 'redux'

const TIER_ICONS = Object.freeze({
  [EServiceBundleTiers.SIMPLE]: <FlashIcon />,
  [EServiceBundleTiers.ADVANCED]: <SparkIcon />,
  [EServiceBundleTiers.PREMIUM]: <DropletIcon />,
})

export default function Home() {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  const [openAddVehicleBottomSheet, setOpenAddVehicleBottomSheet] = useState<boolean>(false)
  const [openAddServicesBottomSheet, setOpenAddServicesBottomSheet] = useState<boolean>(false)
  const [addedVehicle, setAddedVehicle] = useState<IVehicle | null>(null)
  const [removedVehicleId, setRemovedVehicleId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))
  const selectedVehicle = useSelector(({ cart }: IAppState) => getSelectedVehicle(cart))
  const selectedServiceBundle = useSelector(({ cart }: IAppState) => getSelectedServiceBundle(cart))

  if (!currentUser) throw new Error('No user logged in')

  const [vehicles, isLoadingVehicles] = useAsyncData(
    () => vehiclesActions.getVehiclesByUserId(currentUser.id),
    [addedVehicle, removedVehicleId],
  )
  const [serviceBundles, isLoadingServiceBundles] = useAsyncData(() =>
    serviceBundlesActions.getAllWithDetails(),
  )

  const vehicleSkeletons = useSkeletonArray(3)
  const serviceBundleSkeletons = useSkeletonArray(3)

  useEffect(() => {
    if (openAddServicesBottomSheet) handleCloseAddServicesBottomSheet()
  }, [isFocused])

  useEffect(() => {
    if (vehicles?.length === 1) dispatch(setSelectedVehicle(vehicles[0]))
  }, [vehicles])

  useEffect(() => {
    if (addedVehicle) dispatch(setSelectedVehicle(addedVehicle))
  }, [addedVehicle])

  useEffect(() => {
    if (selectedVehicle && error) setError(null)
  }, [selectedVehicle])

  const handleChangeVehicle = (vehicle: IVehicle) => {
    dispatch(setSelectedVehicle(vehicle))
  }

  const handleAddVehicle = (vehicle: IVehicle) => {
    setAddedVehicle(vehicle)
  }

  const handleDeleteVehicle = async (vehicleId: IVehicle['id']) => {
    try {
      await vehiclesActions.deleteVehicleById(vehicleId)
      setRemovedVehicleId(vehicleId)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenAddVehicleBottomSheet = useCallback(() => {
    setOpenAddVehicleBottomSheet(true)
  }, [])

  const handleCloseAddVehicleBottomSheet = useCallback(() => {
    setOpenAddVehicleBottomSheet(false)
  }, [])

  const handleCloseAddServicesBottomSheet = useCallback(() => {
    setOpenAddServicesBottomSheet(false)
  }, [])
  const handleOpenAddServicesBottomSheet = useCallback(() => {
    setOpenAddServicesBottomSheet(true)
  }, [])

  const handleChooseServiceBundle = (serviceBundle: IServiceBundleWithDetails) => {
    if (!selectedVehicle) {
      if (vehicles?.length === 0) return setError('Adicione o seu carro para fazer o pedido.')
      return setError('Selecione o seu carro para fazer o pedido.')
    }
    dispatch(setSelectedServiceBundle(serviceBundle))
    handleOpenAddServicesBottomSheet()
  }

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView customClassName="flex flex-1 bg-brand-500">
          <View className="flex-1">
            {false && (
              <>
                <CustomButton
                  onPress={() => dispatch(signOut as unknown as AnyAction)}
                  variant={ECustomButtonVariants.TERTIARY}
                >
                  Sair
                </CustomButton>
              </>
            )}
            <View className="bg-common-background py-6">
              <CustomText variant={ECustomTextVariants.HEADING3} customClassName="ml-4">
                Selecione seu carro
              </CustomText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-4 flex-row"
              >
                {isLoadingVehicles ? (
                  vehicleSkeletons.map((_skeleton, index) => (
                    <UserVehicleCardSkeleton key={index} index={index} />
                  ))
                ) : (
                  <>
                    {(vehicles ?? []).map((vehicle, index) => {
                      const isSelected = vehicle.id === selectedVehicle?.id
                      return (
                        <UserVehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          handleChangeVehicle={handleChangeVehicle}
                          handleDeleteVehicle={handleDeleteVehicle}
                          isSelected={isSelected}
                          index={index}
                        />
                      )
                    })}
                  </>
                )}
                <AddVehicleCard
                  onPress={handleOpenAddVehicleBottomSheet}
                  isFirst={(vehicles ?? []).length === 0}
                />
              </ScrollView>
              <View className="mx-4">
                {error && (
                  <CustomText
                    variant={ECustomTextVariants.HELPER1}
                    customClassName="mt-1 text-feedback-negative-300"
                  >
                    {error}
                  </CustomText>
                )}
              </View>
            </View>
            <View className="flex-1 bg-brand-500 pb-2 pt-6">
              <CustomText variant={ECustomTextVariants.HEADING3} customClassName="ml-4" white>
                Serviços
              </CustomText>
              <CustomText variant={ECustomTextVariants.BODY3} customClassName="ml-4 mt-1" white>
                Escolha o tipo de cuidado que o seu carro precisa
              </CustomText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-4 flex-row"
              >
                {isLoadingServiceBundles ? (
                  <>
                    {serviceBundleSkeletons.map((_skeleton, index) => (
                      <ServiceBundleCardSkeleton key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    {(serviceBundles || []).map((serviceBundle, index) => {
                      const isLastItem = serviceBundles && index === serviceBundles?.length - 1
                      const previousBundle =
                        index > 0 && serviceBundles ? serviceBundles[index - 1] : null
                      return (
                        <ServiceBundleCard
                          key={serviceBundle.id}
                          serviceBundle={serviceBundle}
                          previousBundleName={previousBundle?.name}
                          onPress={handleChooseServiceBundle}
                          Icon={TIER_ICONS[serviceBundle.tier]}
                          customClassName={isLastItem && 'mr-4'}
                        />
                      )
                    })}
                  </>
                )}
              </ScrollView>
            </View>
          </View>
          <AddVehicleBottomSheet
            userId={currentUser.id}
            addVehicle={handleAddVehicle}
            isOpen={openAddVehicleBottomSheet}
            close={handleCloseAddVehicleBottomSheet}
          />
          <AddServicesBottomSheet
            selectedServiceBundle={selectedServiceBundle}
            isOpen={openAddServicesBottomSheet}
            close={handleCloseAddServicesBottomSheet}
          />
        </SafeAreaView>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  )
}
