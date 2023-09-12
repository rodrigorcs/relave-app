import { servicesActions } from '../../core/actions/services'
import { useAsyncData, useSelection } from '../../hooks'
import { IServiceBundleWithDetails } from '../../models/contracts/serviceBundle'
import { IUser } from '../../models/contracts/user'
import { IVehicle } from '../../models/contracts/vehicle'
import { cn } from '../../utils/cn'
import { getDisplayPrice } from '../../utils/price'
import {
  BottomSheet,
  CustomText,
  ECustomTextVariants,
  CustomButton,
  IBottomSheetRefProps,
  Checkbox,
} from '../common'
import React, { FC, useRef } from 'react'
import { View } from 'react-native'

interface IProps {
  userId: IUser['id']
  selectedVehicleId: IVehicle['id']
  selectedServiceBundle: IServiceBundleWithDetails
  isOpen: boolean
  close: () => void
}

export const AddServicesBottomSheet: FC<IProps> = ({
  // userId,
  // selectedVehicleId,
  selectedServiceBundle,
  isOpen,
  close,
}) => {
  const HEIGHT = 700
  const bottomSheetRef = useRef<IBottomSheetRefProps>(null)

  const [services] = useAsyncData(() => servicesActions.getAll())
  const serviceIdsInBundle = (selectedServiceBundle?.services ?? []).map((service) => service.id)
  const avaliableServices = (services ?? []).filter(
    (service) => !service.onlyInBundle && !serviceIdsInBundle.includes(service.id),
  )

  const [selectedServiceIds, selectServiceId, unselectServiceId] = useSelection()

  return (
    <BottomSheet ref={bottomSheetRef} height={HEIGHT} isOpen={isOpen} close={close}>
      <View className="flex-1">
        <CustomText variant={ECustomTextVariants.HEADING4}>Adicionais</CustomText>
        <View className="mt-6">
          {avaliableServices.map((service, index) => {
            const isSelected = selectedServiceIds.includes(service.id)
            return (
              <View key={service.id} className={cn('flex-row', index > 0 && 'mt-4')}>
                <Checkbox
                  id={service.id}
                  isSelected={isSelected}
                  select={selectServiceId}
                  unselect={unselectServiceId}
                />
                <View className="ml-4">
                  <CustomText variant={ECustomTextVariants.BODY2} customClassName={cn('leading-6')}>
                    {service.name}
                  </CustomText>
                  <CustomText
                    variant={ECustomTextVariants.BODY3}
                    customClassName="mt-1 text-neutrals-500"
                  >
                    {getDisplayPrice(service.price)}
                  </CustomText>
                </View>
              </View>
            )
          })}
        </View>
        <CustomButton onPress={() => {}} customClassName="mt-8 absolute bottom-0 w-full">
          Confirmar escolha
        </CustomButton>
      </View>
    </BottomSheet>
  )
}
