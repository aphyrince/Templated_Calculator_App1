import { randomUUID } from 'expo-crypto';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const OPERATORS = ['+', '-', '*', '/', '(', ')', '^'];
const FUNCTIONS = ['sin', 'cos', 'tan', 'sqrt', 'abs', 'log', 'exp', 'pow', 'min', 'max'];
const CONSTANTS = ['PI', 'E'];

interface Props {
    onAddExp: (exp: FuncExp) => void;
}

export default function FuncKeyPad({ onAddExp }: Props) {
    const handleAddBlank = () => {
        const newBlank: Blank = {
            id: randomUUID(),
            idx: 0,
            name: 'a',
            value: null,
        };
        onAddExp(newBlank);
    };

    return (
        <View className='w-full flex-row flex-wrap gap-y-4'>
            <View className='w-1/2 gap-1'>
                <Text className='text-gray-300 text-xs mb-1'>Numbers</Text>
                <View className='flex-row flex-wrap gap-1 w-full'>
                    {NUMBERS.map((num) => (
                        <TouchableOpacity
                            key={num}
                            className='bg-purple-600 rounded-md px-3 py-2 min-w-10'
                            onPress={() => onAddExp(num)}
                        >
                            <Text className='text-white font-bold text-center'>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View className='w-1/2 gap-1'>
                <Text className='text-gray-300 text-xs mb-1'>Operator</Text>
                <View className='flex-row flex-wrap gap-1 w-full'>
                    {OPERATORS.map((num) => (
                        <TouchableOpacity
                            key={num}
                            className='bg-orange-600 rounded-md px-3 py-2 min-w-10'
                            onPress={() => onAddExp(num)}
                        >
                            <Text className='text-white font-bold text-center'>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View className='w-1/2 gap-1'>
                <Text className='text-gray-300 text-xs mb-1'>Function</Text>
                <View className='flex-row flex-wrap gap-1 w-full'>
                    {FUNCTIONS.map((num) => (
                        <TouchableOpacity
                            key={num}
                            className='bg-indigo-600 rounded-md px-safe-or-3 py-2 min-w-10'
                            onPress={() => onAddExp(num)}
                        >
                            <Text className='text-white font-bold text-center'>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View className='w-1/2 gap-1'>
                <Text className='text-gray-300 text-xs mb-1'>Constant</Text>
                <View className='flex-row flex-wrap gap-1 w-full'>
                    {CONSTANTS.map((num) => (
                        <TouchableOpacity
                            key={num}
                            className='bg-teal-600 rounded-md px-3 py-2 min-w-10'
                            onPress={() => onAddExp(num)}
                        >
                            <Text className='text-white font-bold text-center'>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View className='w-full'>
                <TouchableOpacity className='flex-1 bg-red-600 rounded-md px-3 py-2' onPress={handleAddBlank}>
                    <Text className='text-white font-semibold text-center'>Add Blank (□)</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
