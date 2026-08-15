import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import useEditorStore from '../hook/useEditorStore';
import { updateKey, useKeyPadsStore } from '../hook/useKeyPadsStore';

const typeOptions: { label: string; value: KeyItem['type'] }[] = [
    { label: 'Constant', value: 'Constant' },
    { label: 'Function', value: 'Function' },
];

const colorOptions = ['#000000', '#f59e0b', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#facc15'];
const defaultColor = '#000000';

export default function KeyEditor() {
    const keyId = useEditorStore((s) => s.editorKeyId);
    const padId = useEditorStore((s) => s.editorPadId);

    const [keyData, setKeyData] = useState<KeyItem | null>(null);
    const getKeyByIds = useKeyPadsStore((s) => s.getKeyByIds);

    useEffect(() => {
        if (!padId || !keyId) {
            console.log('KeyEditor : padId or keyId is null!');
            return;
        }
        setKeyData({ ...(getKeyByIds(padId, keyId) as KeyItem) });
    }, [padId, keyId, setKeyData, getKeyByIds]);

    const handleChange = (changed: Partial<KeyItem>) => {
        setKeyData((prev) => (prev ? { ...prev, ...changed } : null));
        if (!padId || !keyId) return;
        updateKey(keyData, changed);
    };

    if (!keyData) {
        return (
            <View className='flex-1 items-center justify-center bg-primary px-6'>
                <Text className='text-white text-lg'>선택된 키가 없습니다.</Text>
            </View>
        );
    }

    const showArgs = keyData.type === 'Function';
    const showExpression = keyData.type === 'Formula' || keyData.type === 'Function';

    return (
        <View className='flex-1 justify-start items-center py-4 gap-4 bg-primary'>
            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>name</Text>
                <View className='flex-1'>
                    <TextInput
                        className='px-4 py-2 rounded-md bg-white'
                        value={keyData.title}
                        onChangeText={(title) => {
                            handleChange({ title });
                        }}
                    />
                </View>
            </View>

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>value</Text>
                <TextInput
                    className='flex-1 px-4 py-2 rounded-md bg-white'
                    keyboardType='numeric'
                    value={String(keyData.value)}
                    onChangeText={(value) => {
                        handleChange({ value: parseInt(value) });
                    }}
                />
            </View>

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>type</Text>
                <View className='flex-1 flex-row gap-2'>
                    {typeOptions.map((option) => {
                        const selected = keyData.type === option.value;
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

            {showExpression && (
                <View className='flex justify-start items-start gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                    <View className='flex-row items-center gap-2'>
                        <Text className='text-white text-2xl'>expression</Text>
                        <Text className='text-white/80 text-sm'>숫자, 연산자, 빈칸([])만 입력 가능</Text>
                    </View>
                    <TextInput
                        className='w-full px-4 py-2 rounded-md bg-white'
                        placeholder={
                            keyData.type === 'Function' ? '예: [ + 3] * 2 또는 func([] , [])' : '예: [ + 3] * 2'
                        }
                        value={keyData.expression}
                        onChangeText={(expression) => handleChange({ expression })}
                    />
                    {keyData.type === 'Function' && (
                        <Text className='text-white/80 text-sm'>
                            이 경우에는 함수 이름과 빈칸만 보이거나, 빈칸과 수식이 함께 보일 수 있습니다.
                        </Text>
                    )}
                </View>
            )}

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>color</Text>
                <View className='flex-1 flex-row flex-wrap gap-2'>
                    {colorOptions.map((option) => {
                        const selected = keyData.color === option;
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
                        className={`px-3 py-2 rounded-md ${keyData.color === defaultColor ? 'bg-btn' : 'bg-white'}`}
                        onPress={() => handleChange({ color: defaultColor })}
                    >
                        <Text className={`${keyData.color === defaultColor ? 'text-white' : 'text-black'}`}>
                            default
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>memo</Text>
                <TextInput
                    className='flex-1 px-4 py-2 rounded-md bg-white'
                    value={keyData.memo}
                    onChangeText={(memo) => handleChange({ memo })}
                />
            </View>
        </View>
    );
}
