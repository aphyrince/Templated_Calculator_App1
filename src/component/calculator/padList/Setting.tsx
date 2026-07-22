import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export default function Setting() {
    const router = useRouter();
    return (
        <Pressable
            onPress={() => {
                router.push('/KeyPadList');
            }}
            className='ml-auto flex justify-center items-center size-16 p-2 bg-accent rounded-xl font-extrabold text-xl color-black/90'
        >
            설정
        </Pressable>
    );
}
