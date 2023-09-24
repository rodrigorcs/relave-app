import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { CustomText, ECustomTextVariants } from '../common'
import { IconoirProvider } from 'iconoir-react-native'
import React, { FC, ReactNode } from 'react'
import { View } from 'react-native'

interface IProps {
  Icon: ReactNode
  primaryText: string | undefined
  secondaryText?: string
  marginLeft?: boolean
}

export const AppointmentCard: FC<IProps> = ({ Icon, primaryText, secondaryText, marginLeft }) => {
  return (
    <View
      className={cn(
        'flex-1 h-36 p-4 justify-between rounded-2xl border border-neutrals-200',
        marginLeft && 'ml-4',
      )}
    >
      <IconoirProvider
        iconProps={{
          width: 20,
          height: 20,
          color: theme.colors['neutrals-800'],
        }}
      >
        {Icon}
      </IconoirProvider>
      <View>
        <CustomText variant={ECustomTextVariants.BODY3}>{primaryText ?? ''}</CustomText>
        {secondaryText && (
          <CustomText
            variant={ECustomTextVariants.HELPER2}
            customClassName="text-neutrals-500 mt-1"
          >
            {secondaryText}
          </CustomText>
        )}
      </View>
    </View>
  )
}
