import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface Props {
    name: string;
    initialValue: string;
    onChange: (change: Partial<KeyItem>) => void;
    keyboardType?: TextInputProps['keyboardType'];
}

export default function KeyItemNameInput({ name, initialValue, onChange, keyboardType }: Props) {
    const [value, setValue] = useState(initialValue);

    return (
        <View className='flex-row justify-start items-center gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl w-24 font-semibold'>Name</Text>
            <TextInput
                className='flex-1 px-4 py-2 rounded-md bg-white'
                value={value}
                keyboardType={keyboardType}
                onChangeText={(txt) => {
                    setValue(txt);
                    onChange({ [name]: txt });
                }}
            />
        </View>
    );
}
