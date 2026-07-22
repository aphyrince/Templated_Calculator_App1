import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function KeyPadList() {
    const router = useRouter();

    return (
        <View className='flex-1 items-center py-4 gap-4 w-full bg-primary'>
            <Pressable className='w-11/12 bg-btn p-2 rounded-md' onPress={() => router.push('/KeyPad')}>
                <Text className='text-primary text-xl'>하하!</Text>
            </Pressable>
            <Pressable className='w-11/12 bg-btn p-2 rounded-md'>
                <Text className='text-primary text-xl'>하하!</Text>
            </Pressable>
            <Pressable className='w-11/12 bg-btn p-2 rounded-md'>
                <Text className='text-primary text-xl'>하하!</Text>
            </Pressable>
            <Pressable className='w-11/12 bg-btn p-2 rounded-md'>
                <Text className='text-primary text-xl'>하하!</Text>
            </Pressable>
        </View>
    );
}
