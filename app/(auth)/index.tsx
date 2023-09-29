/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react'
import { SafeAreaView, ScrollView, View, Text, Dimensions, Platform } from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const CARD_WIDTH = screenWidth * 0.8
const CARD_HEIGHT = screenHeight * 0.7
const SPACING_FOR_CARD_INSET = screenWidth * 0.1 - 10

const cards = [{ name: 'Card 1' }, { name: 'Card 2' }, { name: 'Card 3' }]

export default function Onboarding() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        horizontal // Change the direction to horizontal
        pagingEnabled // Enable paging
        decelerationRate={0} // Disable deceleration
        snapToInterval={CARD_WIDTH + 10} // Calculate the size for a card including marginLeft and marginRight
        snapToAlignment="center" // Snap to the center
        contentInset={{
          // iOS ONLY
          top: 0,
          left: SPACING_FOR_CARD_INSET, // Left spacing for the very first card
          bottom: 0,
          right: SPACING_FOR_CARD_INSET, // Right spacing for the very last card
        }}
        contentContainerStyle={{
          // contentInset alternative for Android
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0, // Horizontal spacing before and after the ScrollView
        }}
      >
        {cards.map((card) => {
          return (
            <View
              className="mx-[10] bg-feedback-positive-300 rounded-2xl"
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            >
              <Text>{card.name}</Text>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}
