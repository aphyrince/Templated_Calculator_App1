import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default function FunctionEditor() {
    return (
        <View className='flex-row justify-start items-center gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl w-24 text-center'>function</Text>
            <TextInput className='flex-1 px-4 py-2 rounded-md bg-white' />
        </View>
    );
}
