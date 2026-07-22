import React from 'react';
import { Text, View } from 'react-native';

export default function Printer() {
    // 현재 수식, 숫자 등 상태정보 처리해야함.
    return (
        <View className='flex flex-row justify-start items-center w-full h-[28%] bg-white/30 p-4'>
            <Text className='text-white text-4xl'>Printer</Text>
            <Text className='text-amber-400 text-4xl'> v!</Text>
            {/* <View> 현재 입력 위치 따라다니는 커서</View> */}
        </View>
    );
}
