import useKeyPadsStore from '@/src/hook/useKeyPadsStore';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function KeyPadSelector() {
    const { keyPads, selectedKeyPad, setSelectedKeyPad } = useKeyPadsStore();

    return (
        <View className='flex-1 h-full flex-row gap-4'>
            {keyPads.map((keyPad) => (
                <Pressable
                    key={keyPad.id}
                    onPress={() => {
                        console.log(keyPad);
                        setSelectedKeyPad(keyPad);
                    }}
                    className='flex justify-center items-center bg-btn p-1 size-16 rounded-lg'
                >
                    <Text className='color-black '>{keyPad.title}</Text>
                </Pressable>
            ))}
        </View>
    );
}
