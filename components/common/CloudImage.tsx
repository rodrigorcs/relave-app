import { cn } from '../../utils/cn'
import { Skeleton } from './Skeleton'
import React, { ReactNode, FC, useState, useEffect } from 'react'
import { Image } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

enum EImageState {
  SUCCESS = 'success',
  LOADING = 'loading',
  ERROR = 'error',
}

interface IBrandLogoProps {
  imageUrl: string | null
  hasImageUrlError?: boolean
  width?: number
  customClassName?: ClassNameValue
  Fallback?: ReactNode
}

export const CloudImage: FC<IBrandLogoProps> = ({
  imageUrl,
  hasImageUrlError,
  width,
  customClassName,
  Fallback,
}) => {
  const [imageState, setImageState] = useState<EImageState>(EImageState.LOADING)

  useEffect(() => {
    if (hasImageUrlError) setImageState(EImageState.ERROR)
  }, [hasImageUrlError])

  return (
    <Skeleton
      customClassName={customClassName}
      style={{ width }}
      isLoaded={imageState !== EImageState.LOADING}
    >
      <Image
        source={{ uri: imageUrl ?? undefined }}
        className={cn(customClassName)}
        resizeMode="cover"
        style={{
          position: imageState === EImageState.SUCCESS ? undefined : 'absolute',
          top: imageState === EImageState.SUCCESS ? undefined : -1000,
          height: 1, // Required for onLoadEnd to work
          width,
        }}
        onLoadEnd={() => setImageState(EImageState.SUCCESS)}
        onError={() => setImageState(EImageState.ERROR)}
      />
      {imageState === EImageState.ERROR && <>{Fallback && Fallback}</>}
    </Skeleton>
  )
}
