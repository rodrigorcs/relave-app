import { servicesActions } from '../../core/actions/services'
import { useAsyncData, usePosition, useSelection } from '../../hooks'
import { IService } from '../../models/contracts/service'
import { IServiceBundleWithDetails } from '../../models/contracts/serviceBundle'
import { setSelectedAdditionalServices } from '../../state/slices/cart'
import { cn } from '../../utils/cn'
import { getDisplayPrice } from '../../utils/price'
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
import { FlatList, View } from 'react-native'
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
  const { ref: footerRef, position: footerPosition } = usePosition()
  const listMargin = footerPosition.height ? footerPosition.height + 28 : null

  const [services] = useAsyncData(() => servicesActions.getAll())
  const serviceIdsInBundle = (selectedServiceBundle?.allServices ?? []).map((service) => service.id)
  const avaliableServices = (services ?? []).filter(
    (service) => !service.onlyInBundle && !serviceIdsInBundle.includes(service.id),
  )

  const [selectedServiceIds, selectServiceId, unselectServiceId] = useSelection()

  const handleProceedWithSelection = (selectedServiceIds: IService['id'][]) => {
    const selectedServices = avaliableServices.filter((service) =>
      selectedServiceIds.includes(service.id),
    )
    dispatch(setSelectedAdditionalServices(selectedServices))
    router.push('/appointment')
  }

  // TODO: Check all FlatLists and ScrollViews
  return (
    <BottomSheet ref={bottomSheetRef} height={HEIGHT} isOpen={isOpen} close={close}>
      <View className="flex-1">
        <CustomText variant={ECustomTextVariants.HEADING4}>Adicionais</CustomText>
        <CustomText variant={ECustomTextVariants.BODY3} customClassName="mt-1 text-neutrals-600">
          Adicione serviços extras para um toque final
        </CustomText>
        <View className={cn('mt-6 mb-10')}>
          <FlatList
            data={avaliableServices}
            style={{ marginBottom: listMargin }}
            renderItem={({ item: service, index }) => {
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
                </View>
              )
            }}
          />
        </View>
        <View ref={footerRef} className="absolute bottom-0 w-full">
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
