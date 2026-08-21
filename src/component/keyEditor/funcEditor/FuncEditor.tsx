import { setEditorKeyItem, setEditorKeyPad, updateKey, useKeyPadsStore } from '@/src/hook/useKeyPadsStore';
import { isBlankType } from '@/src/utils/isBlankType';
import React from 'react';
import { Text, View } from 'react-native';
import FuncDisplay from './FuncDisplay';
import FuncKeyPad from './FuncKeyPad';

export default function FuncEditor() {
    const keyItem = useKeyPadsStore((s) => s.editorKeyItem);

    const handleDelete = () => {
        if (!keyItem || !keyItem.funcExps) return;
        updateKey(keyItem, { funcExps: [...keyItem.funcExps.slice(0, -1)] });
        const editorKeyPad = useKeyPadsStore.getState().keyPads.find((keyPad) => keyPad.id === keyItem.padId) as KeyPad;
        setEditorKeyPad(editorKeyPad);
        const editorKeyItem = editorKeyPad.items.find((item) => item.id === keyItem.id) as KeyItem;
        setEditorKeyItem(editorKeyItem);
    };

    const handleAddExp = (exp: FuncExp) => {
        if (!keyItem) return;
        const prevExps = keyItem.funcExps || [];
        updateKey(keyItem, { funcExps: [...prevExps, exp] });
        const editorKeyPad = useKeyPadsStore.getState().keyPads.find((keyPad) => keyPad.id === keyItem.padId) as KeyPad;
        setEditorKeyPad(editorKeyPad);
        const editorKeyItem = editorKeyPad.items.find((item) => item.id === keyItem.id) as KeyItem;
        setEditorKeyItem(editorKeyItem);
    };

    return (
        <View className='justify-start items-start gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl font-bold'>Function Editor</Text>
            {/* Preview */}
            <View className='w-full gap-1 bg-black p-3 rounded-md '>
                <Text className='text-gray-300 text-xs font-semibold'>Preview</Text>
                <View className='flex-row items-center'>
                    <Text className='text-white text-xl font-bold'>{keyItem?.name}</Text>
                    <Text className='text-white text-xl font-bold'>{'('}</Text>
                    {keyItem &&
                        keyItem.funcExps &&
                        keyItem.funcExps
                            .filter((exp) => isBlankType(exp))
                            .map((blank, idx, arr) => {
                                return (
                                    <View key={blank.id} className='flex-row justify-center items-center h-full'>
                                        <View className='h-[90%] w-5 bg-transparent border-2 border-white rounded-sm mx-1'>
                                            <Text className='text-center text-gray-400'>{blank.name}</Text>
                                        </View>
                                        {idx <= arr.length - 2 && (
                                            <Text className='text-white text-xl font-bold'>, </Text>
                                        )}
                                    </View>
                                );
                            })}
                    <Text className='text-white text-xl font-bold'>{')'}</Text>
                </View>
            </View>
            <View className='w-full gap-2 bg-black/30 p-3 rounded-md'>
                <FuncDisplay exps={keyItem?.funcExps || []} onDelete={handleDelete} />
                <FuncKeyPad onAddExp={handleAddExp} />
            </View>
        </View>
    );
}
