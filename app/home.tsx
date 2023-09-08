import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

export default function Home() {
  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1 px-6 py-2">
        <View className="my-8 w-fit items-center">
          <Text>Home</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
