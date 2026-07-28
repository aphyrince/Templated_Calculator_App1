import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import useKeyEditorStore from '../hook/useKeyEditorStore';

export default function KeyEditor() {
    const keyData = useKeyEditorStore((s) => s.key) as Key_Type;
    console.log(keyData);

    const [name, setName] = useState<string>(keyData.title);

    return (
        <View className='flex-1 justify-start items-center py-4 gap-8 bg-primary'>
            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>name </Text>
                <TextInput className='flex-1 w-40 px-4 py-2 rounded-md bg-white'></TextInput>
            </View>
            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>value</Text>
                <TextInput className='flex-1 w-40 px-4 py-2 rounded-md bg-white'></TextInput>
            </View>
            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>type </Text>
                <Pressable className='size-8 bg-btn rounded-lg'></Pressable>
                <Pressable className='size-8 bg-btn rounded-lg'></Pressable>
                <Pressable className='size-8 bg-btn rounded-lg'></Pressable>
            </View>
            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>args </Text>
                <TextInput className='flex-1 w-16 px-4 py-2 rounded-md bg-white'></TextInput>
            </View>
            <View className='flex justify-start items-start gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl'>expression</Text>
                <TextInput className='flex-1 w-full px-4 py-2 rounded-md bg-white'></TextInput>
            </View>
            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>color </Text>
                <Pressable className='flex-1 h-full bg-white rounded-md'></Pressable>
            </View>
            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>memo </Text>
                <TextInput className='flex-1 w-40 px-4 py-2 rounded-md bg-white'></TextInput>
            </View>
        </View>
    );
}
