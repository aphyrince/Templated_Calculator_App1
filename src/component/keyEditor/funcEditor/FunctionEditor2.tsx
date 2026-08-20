import { useKeyPadsStore } from '@/src/hook/useKeyPadsStore';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import FunctionEditorKeyPad from './FunctionEditorKeyPad';
import FunctionExpDisplay from './FunctionExpDisplay';

export default function FunctionEditor2() {
    const keyItem = useKeyPadsStore((s) => s.editorKeyItem);
    const [funcTokens, setFuncTokens] = useState<FuncToken[]>(keyItem?.expression || []);

    return (
        <View className='justify-start items-start gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl font-bold'>Function Editor</Text>
            {/* Preview */}
            <View className='w-full gap-1 bg-black p-3 rounded-md'>
                <Text className='text-gray-300 text-xs font-semibold'>Preview</Text>
                <Text className='text-white text-lg font-bold'>
                    {keyItem?.name}
                    {'('}
                    {funcTokens
                        .filter((token) => token.value === 'Blank')
                        .map(() => '[]')
                        .join(',')}
                    {')'}
                </Text>
            </View>
            <View className='w-full gap-2 bg-black/30 p-3 rounded-md'>
                <FunctionExpDisplay tokens={funcTokens} />
                <FunctionEditorKeyPad setTokens={setFuncTokens} />
            </View>
        </View>
    );
}
