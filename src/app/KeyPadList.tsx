import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import useEditorStore from '../hook/useEditorStore';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function KeyPadList() {
    const router = useRouter();
    const keyPads = useKeyPadsStore((s) => s.keyPads);
    const setEditorKeyPadId = useEditorStore((s) => s.setEditorPadId);

    return (
        <View className='flex-1 items-center py-4 gap-4 w-full bg-primary'>
            {keyPads.map((keyPad) => (
                <Pressable
                    key={keyPad.id}
                    className='w-11/12 bg-btn p-2 rounded-md'
                    onPress={() => {
                        setEditorKeyPadId(keyPad.id);
                        router.push('/KeyPadEditor');
                    }}
                >
                    <Text className='text-primary text-xl'>{keyPad.title}</Text>
                </Pressable>
            ))}
        </View>
    );
}
