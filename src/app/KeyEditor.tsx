import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { updateKey, useKeyPadsStore } from '../hook/useKeyPadsStore';

const typeOptions: { label: string; value: KeyItem['type'] }[] = [
    { label: 'Constant', value: 'Constant' },
    { label: 'Function', value: 'Function' },
];

const colorOptions = ['#000000', '#f59e0b', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#facc15'];
const defaultColor = '#000000';

export default function KeyEditor() {
    const keyItem = useKeyPadsStore((s) => s.editorKeyItem);

    const handleChange = (changed: Partial<KeyItem>) => {
        if (keyItem === null) return;
        updateKey(keyItem, changed);
    };

    if (!keyItem) {
        return (
            <View className='flex-1 items-center justify-center bg-primary px-6'>
                <Text className='text-white text-lg'>선택된 키가 없습니다.</Text>
            </View>
        );
    }

    const showArgs = keyItem.type === 'Function';

    return (
        <View className='flex-1 justify-start items-center py-4 gap-4 bg-primary'>
            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>name</Text>
                <View className='flex-1'>
                    <TextInput
                        className='px-4 py-2 rounded-md bg-white'
                        value={keyItem.name}
                        onChangeText={(name) => {
                            handleChange({ name });
                        }}
                    />
                </View>
            </View>

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>value</Text>
                <TextInput
                    className='flex-1 px-4 py-2 rounded-md bg-white'
                    keyboardType='numeric'
                    value={String(keyItem.value)}
                    onChangeText={(value) => {
                        handleChange({ value: parseInt(value) });
                    }}
                />
            </View>

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>type</Text>
                <View className='flex-1 flex-row gap-2'>
                    {typeOptions.map((option) => {
                        const selected = keyItem.type === option.value;
                        return (
                            <Pressable
                                key={option.value}
                                className={`flex-1 py-2 rounded-md ${selected ? 'bg-btn' : 'bg-white'}`}
                                onPress={() => handleChange({ type: option.value })}
                            >
                                <Text className={`text-center ${selected ? 'text-white' : 'text-black'}`}>
                                    {option.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>

            {showArgs && (
                <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                    <Text className='text-white text-2xl w-24'>args</Text>
                    <TextInput
                        className='flex-1 px-4 py-2 rounded-md bg-white'
                        // placeholder='1,2,3'
                        // value={keyData.args || ''}
                        // onChangeText={handleArgsChange}
                    />
                </View>
            )}

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>color</Text>
                <View className='flex-1 flex-row flex-wrap gap-2'>
                    {colorOptions.map((option) => {
                        const selected = keyItem.color === option;
                        return (
                            <Pressable
                                key={option}
                                className={`size-8 rounded-full border-2 ${selected ? 'border-white' : 'border-transparent'}`}
                                style={{ backgroundColor: option }}
                                onPress={() => handleChange({ color: option })}
                            />
                        );
                    })}
                    <Pressable
                        className={`px-3 py-2 rounded-md ${keyItem.color === defaultColor ? 'bg-btn' : 'bg-white'}`}
                        onPress={() => handleChange({ color: defaultColor })}
                    >
                        <Text className={`${keyItem.color === defaultColor ? 'text-white' : 'text-black'}`}>
                            default
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>memo</Text>
                <TextInput
                    className='flex-1 px-4 py-2 rounded-md bg-white'
                    value={keyItem.memo}
                    onChangeText={(memo) => handleChange({ memo })}
                />
            </View>
        </View>
    );
}
