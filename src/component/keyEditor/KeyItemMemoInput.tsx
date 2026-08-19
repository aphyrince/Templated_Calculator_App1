import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface Props {
    initialValue: string;
    onChange: (change: Partial<KeyItem>) => void;
}

export default function KeyItemMemoInput({ initialValue, onChange }: Props) {
    const [memo, setMemo] = useState(initialValue);

    return (
        <View className='flex-row justify-start items-center gap-4 px-4 py-2 min-h-52 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl w-24 font-semibold'>Memo</Text>
            <TextInput
                className='flex-1 h-full px-4 py-2 rounded-md bg-white'
                value={memo}
                multiline={true}
                onChangeText={(txt) => {
                    setMemo(txt);
                    onChange({ memo: txt });
                }}
            />
        </View>
    );
}
