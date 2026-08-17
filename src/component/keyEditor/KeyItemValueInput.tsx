import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface Props {
    initialValue: number;
    onChange: (value: number) => void;
}

export default function KeyItemNumericValueInput({ initialValue, onChange }: Props) {
    const [value, setValue] = useState(initialValue);

    return (
        <View className='flex-row justify-start items-center gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl w-24 text-center'>value</Text>
            <TextInput
                className='flex-1 px-4 py-2 rounded-md bg-white'
                value={value.toString()}
                keyboardType='numeric'
                onChangeText={(txt) => {
                    if (!Number.isInteger(Number(txt))) return;
                    setValue(Number(txt));
                    onChange(Number(txt));
                }}
            />
        </View>
    );
}
