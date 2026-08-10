import useDisplayStore from '@/src/hook/useDisplayStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function MenuBar() {
    const deleteLastExp = useDisplayStore((s) => s.deleteLastExp);
    const clearExps = useDisplayStore((s) => s.clearExps);
    const excute = useDisplayStore((s) => s.excute);

    return (
        <View className='flex-row justify-start items-start m-0 w-full gap-2 p-2'>
            <Pressable
                onPress={() => {
                    router.push('/KeyPadList');
                }}
                className='mr-auto flex justify-center items-center size-16 p-2 bg-accent rounded-xl font-extrabold text-xl color-black/90'
            >
                <Ionicons name='reorder-three' size={32} />
            </Pressable>

            <Pressable
                className='flex justify-center items-center h-16 w-32 p-2 mx-auto bg-accent rounded-xl font-extrabold text-xl color-black/90'
                onPress={excute}
            >
                <Text className='text-black text-xl tracking-widest'>excute</Text>
            </Pressable>

            <Pressable
                className='flex justify-center items-center size-16 p-2 bg-accent rounded-xl font-extrabold text-xl color-black/90'
                onPress={deleteLastExp}
            >
                <Text className='text-black'>DEL</Text>
            </Pressable>
            <Pressable
                className='flex justify-center items-center size-16 p-2 bg-accent rounded-xl font-extrabold text-xl color-black/90'
                onPress={clearExps}
            >
                <Text className='text-black'>AC</Text>
            </Pressable>
        </View>
    );
}
