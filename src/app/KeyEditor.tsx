import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import useKeyEditorStore from '../hook/useKeyEditorStore';
import useKeyPadsStore from '../hook/useKeyPadsStore';

const typeOptions: { label: string; value: Key_Ing_Type['type'] }[] = [
    { label: 'Constant', value: 'Constant' },
    { label: 'Formula', value: 'Formula' },
    { label: 'Function', value: 'Function' },
];

const colorOptions = ['#000000', '#f59e0b', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#facc15'];
const defaultColor = '#000000';

export default function KeyEditor() {
    const keyData = useKeyEditorStore((s) => s.key);
    const updateKey = useKeyPadsStore((s) => s.updateKey);

    const [title, setTitle] = useState(keyData?.title ?? '');
    const [value, setValue] = useState(keyData?.value ?? 0);
    const [type, setType] = useState<Key_Ing_Type['type']>(keyData?.type ?? 'Constant');
    const [args, setArgs] = useState(keyData?.args?.join(',') ?? '');
    const [expression, setExpression] = useState(keyData?.expression ?? '');
    const [color, setColor] = useState(keyData?.color ?? defaultColor);
    const [memo, setMemo] = useState(keyData?.memo ?? '');

    useEffect(() => {
        if (!keyData) return;

        setTitle(keyData.title ?? '');
        setValue(keyData.value ?? 0);
        setType(keyData.type ?? 'Constant');
        setArgs(keyData.args?.join(',') ?? '');
        setExpression(keyData.expression ?? '');
        setColor(keyData.color ?? defaultColor);
        setMemo(keyData.memo ?? '');
    }, [keyData]);

    if (!keyData) {
        return (
            <View className='flex-1 items-center justify-center bg-primary px-6'>
                <Text className='text-white text-lg'>선택된 키가 없습니다.</Text>
            </View>
        );
    }

    const handleTitleChange = (txt: string) => {
        setTitle(txt);
        updateKey(keyData.padId, keyData.id, { title: txt.trim() || 'Key' });
    };

    const displayTitle = type === 'Function' ? `${title}()` : title;

    const handleValueChange = (txt: string) => {
        const parsedValue = Number(txt);
        const nextValue = Number.isNaN(parsedValue) ? 0 : parsedValue;
        setValue(nextValue);
        updateKey(keyData.padId, keyData.id, { value: nextValue });
    };

    const handleTypeChange = (nextType: Key_Ing_Type['type']) => {
        setType(nextType);
        updateKey(keyData.padId, keyData.id, { type: nextType });
    };

    const handleArgsChange = (txt: string) => {
        setArgs(txt);
        const nextArgs = txt
            .split(',')
            .map((item) => Number(item.trim()))
            .filter((item) => !Number.isNaN(item));
        updateKey(keyData.padId, keyData.id, { args: nextArgs });
    };

    const handleExpressionChange = (txt: string) => {
        setExpression(txt);
        updateKey(keyData.padId, keyData.id, { expression: txt });
    };

    const handleColorChange = (nextColor: string) => {
        setColor(nextColor);
        updateKey(keyData.padId, keyData.id, { color: nextColor });
    };

    const handleMemoChange = (txt: string) => {
        setMemo(txt);
        updateKey(keyData.padId, keyData.id, { memo: txt });
    };

    const showArgs = type === 'Function';
    const showExpression = type === 'Formula' || type === 'Function';

    return (
        <View className='flex-1 justify-start items-center py-4 gap-4 bg-primary'>
            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>name</Text>
                <View className='flex-1'>
                    <TextInput
                        className='px-4 py-2 rounded-md bg-white'
                        value={title}
                        onChangeText={handleTitleChange}
                    />
                    {type === 'Function' && (
                        <Text className='text-white/80 text-sm mt-1'>
                            이 키는 사용자에게 {displayTitle} 형태로 보여집니다.
                        </Text>
                    )}
                </View>
            </View>

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>value</Text>
                <TextInput
                    className='flex-1 px-4 py-2 rounded-md bg-white'
                    keyboardType='numeric'
                    value={String(value)}
                    onChangeText={handleValueChange}
                />
            </View>

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>type</Text>
                <View className='flex-1 flex-row gap-2'>
                    {typeOptions.map((option) => {
                        const selected = type === option.value;
                        return (
                            <Pressable
                                key={option.value}
                                className={`flex-1 py-2 rounded-md ${selected ? 'bg-btn' : 'bg-white'}`}
                                onPress={() => handleTypeChange(option.value)}
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
                        placeholder='1,2,3'
                        value={args}
                        onChangeText={handleArgsChange}
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
                        placeholder={type === 'Function' ? '예: [ + 3] * 2 또는 func([] , [])' : '예: [ + 3] * 2'}
                        value={expression}
                        onChangeText={handleExpressionChange}
                    />
                    {type === 'Function' && (
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
                        const selected = color === option;
                        return (
                            <Pressable
                                key={option}
                                className={`size-8 rounded-full border-2 ${selected ? 'border-white' : 'border-transparent'}`}
                                style={{ backgroundColor: option }}
                                onPress={() => handleColorChange(option)}
                            />
                        );
                    })}
                    <Pressable
                        className={`px-3 py-2 rounded-md ${color === defaultColor ? 'bg-btn' : 'bg-white'}`}
                        onPress={() => handleColorChange(defaultColor)}
                    >
                        <Text className={`${color === defaultColor ? 'text-white' : 'text-black'}`}>default</Text>
                    </Pressable>
                </View>
            </View>

            <View className='flex-row justify-start items-center gap-4 bg-third w-[92%] py-2 px-4 rounded-md'>
                <Text className='text-white text-2xl w-24'>memo</Text>
                <TextInput
                    className='flex-1 px-4 py-2 rounded-md bg-white'
                    value={memo}
                    onChangeText={handleMemoChange}
                />
            </View>
        </View>
    );
}
