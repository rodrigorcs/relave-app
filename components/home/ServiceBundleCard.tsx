import { IServiceBundleWithDetails } from '../../models/contracts/serviceBundle'
import { theme } from '../../theme'
import { cn } from '../../utils/cn'
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
  onPress: (serviceBundle: IServiceBundleWithDetails) => void
  Icon: ReactNode
  customClassName: ClassNameValue
}

export const ServiceBundleCard: FC<IProps> = ({
  serviceBundle,
  onPress,
  Icon,
  customClassName,
}) => {
  return (
    <View className={cn('w-[272] bg-neutrals-white rounded-2xl ml-4', customClassName)}>
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
            {Icon}
          </IconoirProvider>
        </View>
        <CustomText variant={ECustomTextVariants.HEADING2}>{`R$${
          serviceBundle.price / 100
        }`}</CustomText>
      </View>
      <View className="p-6 flex-1">
        <CustomText variant={ECustomTextVariants.HEADING4} customClassName="mb-4">
          {serviceBundle.name}
        </CustomText>
        <View className="flex-1">
          {serviceBundle.services.map((service, index) => {
            return (
              <View key={service.id} className={cn('flex-row items-center', index > 0 && 'mt-3')}>
                <View className="w-5 h-5 bg-brand-500 rounded-full items-center justify-center">
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
        >
          Escolher
        </CustomButton>
      </View>
    </View>
  )
}
