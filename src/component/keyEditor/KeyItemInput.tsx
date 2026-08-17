import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface Props {
    name: string;
    initialValue: string;
    onChange: (change: Partial<KeyItem>) => void;
}

export default function KeyItemInput({ name, initialValue, onChange }: Props) {
    const [value, setValue] = useState(initialValue);

    return (
        <View className='flex-row justify-start items-center gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl w-24 text-center'>{name}</Text>
            <TextInput
                className='flex-1 px-4 py-2 rounded-md bg-white'
                value={value}
                onChangeText={(txt) => {
                    setValue(txt);
                    onChange({ [name]: txt });
                }}
            />
        </View>
    );
}
