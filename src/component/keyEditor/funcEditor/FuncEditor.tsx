import { useKeyPadsStore } from '@/src/hook/useKeyPadsStore';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import FuncDisplay from './FuncDisplay';
import FuncKeyPad from './FuncKeyPad';

export default function FuncEditor() {
    const keyItem = useKeyPadsStore((s) => s.editorKeyItem);
    const [funcTokens, setFuncTokens] = useState<FuncToken[]>(keyItem?.expression || []);

    return (
        <View className='justify-start items-start gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl font-bold'>Function Editor</Text>
            {/* Preview */}
            <View className='w-full gap-1 bg-black p-3 rounded-md '>
                <Text className='text-gray-300 text-xs font-semibold'>Preview</Text>
                <View className='flex-row items-center'>
                    <Text className='text-white text-xl font-bold'>{keyItem?.name}</Text>
                    <Text className='text-white text-xl font-bold'>{'('}</Text>
                    {funcTokens
                        .filter((token) => token.value === 'Blank')
                        .map((token, idx, arr) => {
                            return (
                                <View key={token.id} className='flex-row justify-center items-center h-full'>
                                    <View className='h-[90%] w-5 bg-transparent border-2 border-white rounded-sm mx-1' />
                                    {idx <= arr.length - 2 && <Text className='text-white text-xl font-bold'>, </Text>}
                                </View>
                            );
                        })}
                    <Text className='text-white text-xl font-bold'>{')'}</Text>
                </View>
            </View>
            <View className='w-full gap-2 bg-black/30 p-3 rounded-md'>
                <FuncDisplay tokens={funcTokens} />
                <FuncKeyPad setTokens={setFuncTokens} />
            </View>
        </View>
    );
}
