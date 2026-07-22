import React from 'react';
import { Pressable, Text } from 'react-native';

export default function Item() {
    return (
        <Pressable className='flex justify-center items-center size-16 bg-btn rounded-md'>
            <Text className='text-2xl font-semibold'>1</Text>
        </Pressable>
    );
}
