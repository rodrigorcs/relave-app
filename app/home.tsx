import {
  CustomButton,
  CustomText,
  ECustomButtonVariants,
  ECustomTextVariants,
} from '../components/common'
import { AddVehicleBottomSheet } from '../components/home/AddVehicleBottomSheet'
import { UserVehicleCard } from '../components/home/UserVehicleCard'
import { vehiclesActions } from '../core/actions/vehicles'
import { useAsyncData } from '../hooks/useAsyncData'
import { IVehicle } from '../models/contracts/vehicle'
import { getCurrentUser } from '../state/slices/auth'
import { IAppState } from '../state/store'
import { theme } from '../theme'
import { cn } from '../utils/cn'
import {
  ArrowRight as ArrowRightIcon,
  Plus as PlusIcon,
  Check as CheckIcon,
  Flash as FlashIcon,
  DropletHalf as DropletIcon,
  IconoirProvider,
  Spark as SparkIcon,
} from 'iconoir-react-native'
import React, { useCallback, useState } from 'react'
import { TouchableOpacity, SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

const tierIcons = Object.freeze({
  1: <FlashIcon />,
  2: <SparkIcon />,
  3: <DropletIcon />,
})

const services = [
  {
    price: 7000,
    name: 'Lavagem Simples',
    tier: 1,
    features: ['Lavagem exterior', 'Limpeza dos vidros', 'Aspiração interna'],
  },
  {
    price: 12000,
    name: 'Lavagem Avançada',
    tier: 2,
    includes: 'Lavagem Simples',
    features: ['Enceramento', 'Higienização interna', 'Revitalização de plásticos'],
  },
  {
    price: 18000,
    name: 'Lavagem Premium',
    tier: 3,
    includes: 'Lavagem Avançada',
    features: ['Polimento da pintura', 'Higienização interna completa', 'Tratamento de couro'],
  },
]

export default function Home() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<IVehicle['id'] | null>(null)
  const [openBottomSheet, setOpenBottomSheet] = useState<string | null>(null)

  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))
  if (!currentUser) return //FIXME: Add auth boundaries so currentUser is always truthy

  const [vehicles] = useAsyncData(
    currentUser ? () => vehiclesActions.getVehiclesByUserId(currentUser.id) : null,
  )

  const handleChangeVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId)
  }

  const handleOpenAddVehicleBottomSheet = useCallback(() => {
    setOpenBottomSheet('AddVehicle')
  }, [])

  const handleCloseBottomSheet = useCallback(() => {
    setOpenBottomSheet(null)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex flex-1 bg-brand-500">
        <View className="flex-1">
          <View className="py-8 bg-common-background">
            <CustomText variant={ECustomTextVariants.HEADING3} customClassName="ml-4">
              Selecione seu carro
            </CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-4">
              {(vehicles ?? []).map((vehicle, index) => {
                const isSelected = vehicle.id === selectedVehicleId
                return (
                  <UserVehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    handleChangeVehicle={handleChangeVehicle}
                    isSelected={isSelected}
                    index={index}
                  />
                )
              })}
              <TouchableOpacity
                className={cn(
                  'h-32 w-32 bg-neutrals-100 rounded-2xl items-center justify-center ml-2 mr-4',
                )}
                onPress={handleOpenAddVehicleBottomSheet}
              >
                <PlusIcon color={theme.colors['neutrals-800']} width={24} height={24} />
                <CustomText variant={ECustomTextVariants.BODY3} customClassName="mt-2 text-center">
                  {`Adicionar\ncarro`}
                </CustomText>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View className="flex-1 py-8 bg-brand-500">
            <CustomText variant={ECustomTextVariants.HEADING3} customClassName="ml-4" white>
              Serviços
            </CustomText>
            <CustomText variant={ECustomTextVariants.BODY3} customClassName="ml-4 mt-1" white>
              Escolha o tipo de cuidado que o seu carro precisa
            </CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-4">
              {services.map((service, index) => {
                return (
                  <View
                    key={service.name}
                    className={cn(
                      'w-[272] bg-neutrals-white rounded-2xl ml-4',
                      vehicles && index === vehicles.length - 1 && 'mr-4',
                    )}
                  >
                    <View className="flex-row justify-between items-center border-b border-neutrals-200 px-6 py-5">
                      <View className="w-10 h-10 items-center justify-center rounded-full bg-brand-300">
                        <IconoirProvider
                          iconProps={{
                            width: 20,
                            height: 20,
                            color: theme.colors['brand-500'],
                            fill: theme.colors['brand-500'],
                          }}
                        >
                          {tierIcons[service.tier as 1 | 2 | 3]}
                        </IconoirProvider>
                      </View>
                      <CustomText variant={ECustomTextVariants.HEADING2}>
                        {`R$${service.price / 100}`}
                      </CustomText>
                    </View>
                    <View className="p-6 flex-1">
                      <CustomText variant={ECustomTextVariants.HEADING4} customClassName="mb-4">
                        {service.name}
                      </CustomText>
                      <View className="flex-1">
                        {service.features.map((feature, index) => {
                          return (
                            <View
                              key={feature}
                              className={cn('flex-row items-center', index > 0 && 'mt-3')}
                            >
                              <View className="w-5 h-5 bg-brand-500 rounded-full items-center justify-center">
                                <CheckIcon
                                  width={16}
                                  height={16}
                                  strokeWidth={2}
                                  color={theme.colors['neutrals-white']}
                                />
                              </View>
                              <CustomText
                                key={feature}
                                variant={ECustomTextVariants.BODY3}
                                customClassName="ml-2"
                              >
                                {feature}
                              </CustomText>
                            </View>
                          )
                        })}
                      </View>
                      <CustomButton
                        variant={ECustomButtonVariants.SECONDARY}
                        onPress={() => {}}
                        IconRight={
                          <ArrowRightIcon
                            width={20}
                            height={20}
                            strokeWidth={2}
                            color={theme.colors['brand-500']}
                          />
                        }
                      >
                        Escolher
                      </CustomButton>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
        <AddVehicleBottomSheet
          userId={currentUser.id}
          addVehicle={() => {}}
          isOpen={openBottomSheet === 'AddVehicle'}
          close={handleCloseBottomSheet}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
