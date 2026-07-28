import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const DummyKey = () => {
    const router = useRouter();
    return (
        <Pressable
            className='flex justify-center items-center size-16 bg-btn rounded-md'
            onPress={() => {
                router.push('/KeyEditor');
            }}
        >
            <Text className='text-2xl font-semibold'>1</Text>
        </Pressable>
    );
};

export default function KeyPadEditor() {
    return (
        <View className='flex-1 w-full bg-primary p-4 gap-4'>
            <DummyKey />
            <DummyKey />
            <DummyKey />
            <DummyKey />
            <DummyKey />
        </View>
    );
}
