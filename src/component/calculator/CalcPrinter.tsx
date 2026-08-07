import React from 'react';
import { Text, View } from 'react-native';

export default function CalcPrinter() {
    return (
        <View className='flex flex-row justify-start items-center w-full h-1/4 bg-white/30 p-4'>
            <Text className='text-white text-4xl'>Printer</Text>
            <Text className='text-amber-400 text-4xl'> v!</Text>
            {/* <View> 현재 입력 위치 따라다니는 커서</View> */}
        </View>
    );
}
