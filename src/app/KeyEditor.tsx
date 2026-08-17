import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import KeyItemInput from '../component/keyEditor/KeyItemInput';
import KeyItemTypeSelector from '../component/keyEditor/KeyItemTypeSelector';
import { setEditorKeyItem, updateKey, useKeyPadsStore } from '../hook/useKeyPadsStore';

const typeOptions: { label: string; value: KeyItem['type'] }[] = [
    { label: 'Constant', value: 'Constant' },
    { label: 'Function', value: 'Function' },
];

const colorOptions = ['#000000', '#f59e0b', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#facc15'];
const defaultColor = '#000000';

export default function KeyEditor() {
    const keyItem = useKeyPadsStore((s) => s.editorKeyItem);

    const handleChange = useCallback(
        (changed: Partial<KeyItem>) => {
            if (keyItem === null) return;
            console.log('keyItem Changed! : ', changed);
            updateKey(keyItem, changed);
            setEditorKeyItem(keyItem);
        },
        [keyItem],
    );

    if (!keyItem) {
        return (
            <View className='flex-1 items-center justify-center bg-primary px-6'>
                <Text className='text-white text-lg'>선택된 키가 없습니다.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <KeyItemInput name='name' initialValue={keyItem.name} onChange={handleChange} />
            <KeyItemInput
                name='value'
                initialValue={keyItem.value.toString()}
                keyboardType='numeric'
                onChange={({ value }) => {
                    if (typeof value === 'string') {
                        handleChange({ value: parseInt(value) });
                    }
                }}
            />

            <KeyItemTypeSelector initialType={keyItem.type} onChange={(type) => handleChange({ type })} />

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

            <KeyItemInput name='memo' initialValue={keyItem.memo || ''} onChange={handleChange} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 16,
        gap: 16,
        backgroundColor: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: '0.375rem',
        width: '92%',
        backgroundColor: '#1e1e1e',
    },
    inputLabel: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        width: 100,
    },
    inputArea: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: '0.375rem',
        backgroundColor: 'white',
    },
    type: {},
    typeBtn: {},
    color: {},
    colorBtn: {},
    memo: {},
});
