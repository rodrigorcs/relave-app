import { IService } from '../../models/contracts/service'
import { IServiceBundleWithDetails } from '../../models/contracts/serviceBundle'
import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { getDisplayPrice } from '../../utils/price'
import { CustomText, ECustomTextVariants, CustomButton, ECustomButtonVariants } from '../common'
import {
  IconoirProvider,
  Check as CheckIcon,
  ArrowRight as ArrowRightIcon,
} from 'iconoir-react-native'
import React, { FC, ReactNode } from 'react'
import { View } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

interface IProps {
  serviceBundle: IServiceBundleWithDetails
  previousBundleName: string | undefined
  onPress: (serviceBundle: IServiceBundleWithDetails) => void
  Icon: ReactNode
  customClassName: ClassNameValue
}

export const ServiceBundleCard: FC<IProps> = ({
  serviceBundle,
  previousBundleName,
  onPress,
  Icon,
  customClassName,
}) => {
  const previousBundleAsService: Partial<IService> = {
    id: `${serviceBundle.id}-previousBundle`,
    name: `Inclui ${previousBundleName}`,
  }

  const services =
    (previousBundleName
      ? [previousBundleAsService, ...serviceBundle.exclusiveServices]
      : serviceBundle.exclusiveServices) ?? []

  return (
    <View className={cn('ml-4 w-[272] rounded-2xl bg-neutrals-white', customClassName)}>
      <View className="flex-row items-center justify-between border-b border-neutrals-200 px-6 py-5">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-brand-300">
          <IconoirProvider
            iconProps={{
              width: 20,
              height: 20,
              color: theme.colors['brand-500'],
              fill: theme.colors['brand-500'],
            }}
          >
            {Icon}
          </IconoirProvider>
        </View>
        <CustomText variant={ECustomTextVariants.HEADING2}>
          {getDisplayPrice(serviceBundle.price)}
        </CustomText>
      </View>
      <View className="flex-1 p-6">
        <CustomText variant={ECustomTextVariants.HEADING4} customClassName="mb-4">
          {serviceBundle.name}
        </CustomText>
        <View className="flex-1">
          {services.map((service, index) => {
            return (
              <View key={service.id} className={cn('flex-row items-center', index > 0 && 'mt-3')}>
                <View className="h-5 w-5 items-center justify-center rounded-full bg-brand-500">
                  <CheckIcon
                    width={16}
                    height={16}
                    strokeWidth={2}
                    color={theme.colors['neutrals-white']}
                  />
                </View>
                <CustomText variant={ECustomTextVariants.BODY3} customClassName="ml-2">
                  {service.name}
                </CustomText>
              </View>
            )
          })}
        </View>
        <CustomButton
          variant={ECustomButtonVariants.SECONDARY}
          onPress={() => onPress(serviceBundle)}
          IconRight={
            <ArrowRightIcon
              width={20}
              height={20}
              strokeWidth={2}
              color={theme.colors['brand-500']}
            />
          }
          customClassName="bg-neutrals-white"
        >
          Escolher
        </CustomButton>
      </View>
    </View>
  )
}
