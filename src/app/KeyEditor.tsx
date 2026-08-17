import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import KeyItemColorSelector from '../component/keyEditor/KeyItemColorSelector';
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
            <KeyItemColorSelector initialColor={keyItem.color} onChange={(color) => handleChange({ color })} />
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
