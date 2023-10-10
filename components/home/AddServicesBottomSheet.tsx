import { servicesActions } from '../../core/actions/services'
import { useAsyncData, useSelection } from '../../hooks'
import { IService } from '../../models/contracts/service'
import { IServiceBundleWithDetails } from '../../models/contracts/serviceBundle'
import { confirmSelectedServices } from '../../state/slices/cart'
import { cn } from '../../utils/cn'
import { getDisplayPrice } from '../../utils/price'
import { getDuration } from '../../utils/service'
import {
  BottomSheet,
  CustomText,
  ECustomTextVariants,
  CustomButton,
  IBottomSheetRefProps,
  Checkbox,
  ECustomButtonVariants,
} from '../common'
import { router } from 'expo-router'
import { ArrowRight as ArrowRightIcon } from 'iconoir-react-native'
import React, { FC, useRef } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

interface IProps {
  selectedServiceBundle: IServiceBundleWithDetails | null
  isOpen: boolean
  close: () => void
}

export const AddServicesBottomSheet: FC<IProps> = ({ selectedServiceBundle, isOpen, close }) => {
  const HEIGHT = 600
  const dispatch = useDispatch()
  const bottomSheetRef = useRef<IBottomSheetRefProps>(null)
  const [services] = useAsyncData(() => servicesActions.getAll())
  const serviceIdsInBundle = (selectedServiceBundle?.allServices ?? []).map((service) => service.id)
  const avaliableServices = (services ?? []).filter(
    (service) => !service.onlyInBundle && !serviceIdsInBundle.includes(service.id),
  )

  const [selectedServiceIds, selectServiceId, unselectServiceId] = useSelection()
  const toggleService = (serviceId: string) => {
    const isSelected = selectedServiceIds.includes(serviceId)
    return isSelected ? unselectServiceId(serviceId) : selectServiceId(serviceId)
  }

  const handleProceedWithSelection = (selectedServiceIds: IService['id'][]) => {
    const selectedServices = avaliableServices.filter((service) =>
      selectedServiceIds.includes(service.id),
    )
    const duration = getDuration([
      ...(selectedServiceBundle?.allServices ?? []),
      ...selectedServices,
    ])

    dispatch(confirmSelectedServices({ additionalServices: selectedServices, duration }))
    router.push('/appointment')
    close()
  }

  // TODO: Check all FlatLists and ScrollViews
  return (
    <BottomSheet ref={bottomSheetRef} height={HEIGHT} isOpen={isOpen} close={close}>
      <View className="flex-1">
        <CustomText variant={ECustomTextVariants.HEADING4}>Adicionais</CustomText>
        <CustomText variant={ECustomTextVariants.BODY3} customClassName="mt-1 text-neutrals-600">
          Adicione serviços extras para um toque final
        </CustomText>
        <View className={cn('mt-6 flex-1')}>
          <FlatList
            data={avaliableServices}
            renderItem={({ item: service, index }) => {
              const isSelected = selectedServiceIds.includes(service.id)
              return (
                <TouchableOpacity
                  key={service.id}
                  activeOpacity={0.8}
                  onPress={() => toggleService(service.id)}
                  className={cn('flex-row', index > 0 && 'mt-4')}
                >
                  <Checkbox key={service.id} isSelected={isSelected} />
                  <View className="ml-4">
                    <CustomText
                      variant={ECustomTextVariants.BODY2}
                      customClassName={cn('leading-6')}
                    >
                      {service.name}
                    </CustomText>
                    <CustomText
                      variant={ECustomTextVariants.BODY3}
                      customClassName="mt-1 text-neutrals-500"
                    >
                      {`+${getDisplayPrice(service.price, true)}`}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
        <View className="mt-6 w-full">
          <CustomButton
            onPress={() => handleProceedWithSelection(selectedServiceIds)}
            IconRight={<ArrowRightIcon />}
          >
            Confirmar escolha
          </CustomButton>
          <CustomButton
            onPress={() => handleProceedWithSelection([])}
            variant={ECustomButtonVariants.TERTIARY}
            customClassName="mt-2"
          >
            Não quero adicionais
          </CustomButton>
        </View>
      </View>
    </BottomSheet>
  )
}
