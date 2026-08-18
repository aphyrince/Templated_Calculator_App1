import { setEditorKeyItem, setEditorKeyPad, updateKey, useKeyPadsStore } from '@/src/hook/useKeyPadsStore';
import { randomUUID } from 'expo-crypto';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const OPERATORS = ['+', '-', '*', '/', '(', ')', '^'];
const FUNCTIONS = ['sin', 'cos', 'tan', 'sqrt', 'abs', 'log', 'exp', 'pow', 'min', 'max'];
const CONSTANTS = ['PI', 'E'];

export default function FunctionEditor() {
    const keyItem = useKeyPadsStore((s) => s.editorKeyItem);
    const [parameters, setParameters] = useState<string[]>(keyItem?.parameters || []);
    const [newParam, setNewParam] = useState('');
    const [funcTokens, setFuncTokens] = useState<Token[]>(keyItem?.expression || []);

    const updateFunctionData = useCallback(
        (newParams: string[], newTokens: Token[]) => {
            if (keyItem === null) return;

            updateKey(keyItem, {
                parameters: newParams,
                expression: newTokens,
            });

            const editorKeyPad = useKeyPadsStore
                .getState()
                .keyPads.find((keyPad) => keyPad.id === keyItem.padId) as KeyPad;
            setEditorKeyPad(editorKeyPad);
            const updatedKeyItem = editorKeyPad.items.find((item) => item.id === keyItem.id) as KeyItem;
            setEditorKeyItem(updatedKeyItem);
        },
        [keyItem],
    );

    const handleAddParameter = useCallback(() => {
        if (newParam.trim() === '') return;
        const trimmedParam = newParam.trim();
        if (parameters.includes(trimmedParam)) return;

        const newParams = [...parameters, trimmedParam];
        setParameters(newParams);
        setNewParam('');
        updateFunctionData(newParams, funcTokens);
    }, [newParam, parameters, funcTokens, updateFunctionData]);

    const handleRemoveParameter = useCallback(
        (param: string) => {
            const newParams = parameters.filter((p) => p !== param);
            setParameters(newParams);
            updateFunctionData(newParams, funcTokens);
        },
        [parameters, funcTokens, updateFunctionData],
    );

    const handleAddToken = useCallback(
        (value: string | number) => {
            const newToken: Token = {
                id: randomUUID(),
                idx: funcTokens.length,
                value,
            };
            const newTokens = [...funcTokens, newToken];
            setFuncTokens(newTokens);
            updateFunctionData(parameters, newTokens);
        },
        [funcTokens, parameters, updateFunctionData],
    );

    const handleAddBlank = useCallback(() => {
        const newToken: Token = {
            id: randomUUID(),
            idx: funcTokens.length,
            value: 'Blank',
        };
        const newTokens = [...funcTokens, newToken];
        setFuncTokens(newTokens);
        updateFunctionData(parameters, newTokens);
    }, [funcTokens, parameters, updateFunctionData]);

    const handleRemoveToken = useCallback(
        (id: string) => {
            const newTokens = funcTokens
                .filter((token) => token.id !== id)
                .map((token, idx) => ({
                    ...token,
                    idx,
                }));
            setFuncTokens(newTokens);
            updateFunctionData(parameters, newTokens);
        },
        [funcTokens, parameters, updateFunctionData],
    );

    const handleClearExpression = useCallback(() => {
        setFuncTokens([]);
        updateFunctionData(parameters, []);
    }, [parameters, updateFunctionData]);

    if (!keyItem) return null;

    return (
        <View className='justify-start items-start gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl font-bold'>Function Editor</Text>

            {/* Parameters Section */}
            <View className='w-full gap-2 bg-black/30 p-3 rounded-md'>
                <Text className='text-white text-lg font-semibold'>Parameters</Text>
                <View className='gap-2'>
                    {/* Add Parameter Input */}
                    <View className='flex-row gap-2'>
                        <TextInput
                            className='flex-1 bg-black rounded-md px-3 py-2 text-white text-base'
                            placeholder='Add parameter (e.g., x)'
                            placeholderTextColor='#999'
                            value={newParam}
                            onChangeText={setNewParam}
                        />
                        <TouchableOpacity
                            className='bg-blue-600 rounded-md px-3 py-2 justify-center'
                            onPress={handleAddParameter}
                        >
                            <Text className='text-white font-semibold'>Add</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Parameter List */}
                    <View className='flex-row flex-wrap gap-2'>
                        {parameters.map((param) => (
                            <TouchableOpacity
                                key={param}
                                className='flex-row items-center bg-blue-500 rounded-full px-3 py-1 gap-1'
                                onPress={() => handleRemoveParameter(param)}
                            >
                                <Text className='text-white text-sm font-semibold'>{param}</Text>
                                <Text className='text-white text-xs'>✕</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            {/* Expression Section */}
            <View className='w-full gap-2 bg-black/30 p-3 rounded-md'>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-white text-lg font-semibold'>Expression</Text>
                    {funcTokens.length > 0 && (
                        <TouchableOpacity onPress={handleClearExpression} className='bg-red-600 px-2 py-1 rounded'>
                            <Text className='text-white text-xs'>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Expression Display */}
                <View className='bg-black w-full min-h-16 rounded-md p-2 flex-row flex-wrap items-start gap-1'>
                    {funcTokens.length === 0 ? (
                        <Text className='text-gray-400 text-sm'>No expression yet</Text>
                    ) : (
                        funcTokens.map((token) => (
                            <TouchableOpacity
                                key={token.id}
                                className='bg-green-600 rounded-md px-2 py-1 flex-row items-center gap-1'
                                onPress={() => handleRemoveToken(token.id)}
                            >
                                <Text className='text-white font-semibold'>
                                    {token.value === 'Blank' ? '□' : token.value}
                                </Text>
                                <Text className='text-white text-xs'>✕</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </View>

                {/* Token Input */}
                <View className='gap-2'>
                    {/* Numbers */}
                    <View>
                        <Text className='text-gray-300 text-xs mb-1'>Numbers</Text>
                        <View className='flex-row flex-wrap gap-1'>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    className='bg-purple-600 rounded-md px-3 py-2 min-w-10'
                                    onPress={() => handleAddToken(num)}
                                >
                                    <Text className='text-white font-bold text-center'>{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Operators */}
                    <View>
                        <Text className='text-gray-300 text-xs mb-1'>Operators</Text>
                        <View className='flex-row flex-wrap gap-1'>
                            {OPERATORS.map((op) => (
                                <TouchableOpacity
                                    key={op}
                                    className='bg-orange-600 rounded-md px-3 py-2 min-w-10'
                                    onPress={() => handleAddToken(op)}
                                >
                                    <Text className='text-white font-bold text-center'>{op}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Functions */}
                    <View>
                        <Text className='text-gray-300 text-xs mb-1'>Functions</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='gap-1'>
                            {FUNCTIONS.map((func) => (
                                <TouchableOpacity
                                    key={func}
                                    className='bg-indigo-600 rounded-md px-3 py-2'
                                    onPress={() => handleAddToken(func)}
                                >
                                    <Text className='text-white font-semibold'>{func}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Constants */}
                    <View>
                        <Text className='text-gray-300 text-xs mb-1'>Constants</Text>
                        <View className='flex-row flex-wrap gap-1'>
                            {CONSTANTS.map((const_) => (
                                <TouchableOpacity
                                    key={const_}
                                    className='bg-teal-600 rounded-md px-3 py-2'
                                    onPress={() => handleAddToken(const_)}
                                >
                                    <Text className='text-white font-semibold'>{const_}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Special Tokens */}
                    <View className='flex-row gap-1'>
                        <TouchableOpacity className='flex-1 bg-red-600 rounded-md px-3 py-2' onPress={handleAddBlank}>
                            <Text className='text-white font-semibold text-center'>Add Blank (□)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Preview Section */}
            <View className='w-full gap-1 bg-black/50 p-3 rounded-md'>
                <Text className='text-gray-300 text-xs font-semibold'>Preview</Text>
                <Text className='text-white text-lg font-bold'>
                    f({parameters.join(', ')}) = {funcTokens.map((t) => (t.value === 'Blank' ? '□' : t.value)).join('')}
                </Text>
            </View>
        </View>
    );
}
