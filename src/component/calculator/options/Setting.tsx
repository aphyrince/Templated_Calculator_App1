import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

export default function Setting() {
    const router = useRouter();
    return (
        <Pressable
            onPress={() => {
                router.push('/groupList');
            }}
            className='ml-auto flex justify-center items-center size-20 p-2 bg-amber-600 rounded-xl font-extrabold text-xl color-black/90'
        >
            설정
        </Pressable>
    );
}
