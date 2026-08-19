import React, { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface Props {
    initialColor: KeyItem['color'];
    onChange: (color: KeyItem['color']) => void;
}

const colorOptions = ['#000000', '#f59e0b', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#facc15'];

export default function KeyItemColorSelector({ initialColor = '#000000', onChange }: Props) {
    const [color, setColor] = useState(initialColor);

    const handleChange = useCallback((color: KeyItem['color']) => {
        if (!color) return;
        setColor(color);
    }, []);

    return (
        <View className='flex-row justify-start items-center gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl w-24 font-semibold'>Color</Text>
            <View className='flex-1 flex-row flex-wrap gap-2 p-2'>
                {colorOptions.map((option) => {
                    const selected = color === option;
                    return (
                        <Pressable
                            key={option}
                            onPress={() => handleChange(option)}
                            className='size-10 rounded-full border-4 box-border'
                            style={{
                                backgroundColor: option,
                                borderColor: selected ? 'white' : 'transparent',
                                boxShadow: selected ? '0 0 8px white' : '',
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
}
