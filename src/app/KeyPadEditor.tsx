import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import useKeyPadEditorStore from '../hook/useKeyPadEditorStore';

export default function KeyPadEditor() {
    const router = useRouter();
    const keyPad = useKeyPadEditorStore((s) => s.keyPad);

    return (
        <View className='flex-1 grid grid-cols-4 place-items-center bg-primary gap-4 p-4'>
            {keyPad &&
                keyPad.keys.map((key) => (
                    <Pressable
                        key={key.id}
                        className='size-20 bg-btn p-2 rounded-md'
                        onPress={() => {
                            router.push('/KeyEditor');
                        }}
                    >
                        <Text className='text-black m-auto text-2xl'>{key.title}</Text>
                    </Pressable>
                ))}
        </View>
    );
}
