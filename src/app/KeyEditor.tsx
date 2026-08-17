import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import KeyItemColorSelector from '../component/keyEditor/KeyItemColorSelector';
import KeyItemInput from '../component/keyEditor/KeyItemInput';
import KeyItemTypeSelector from '../component/keyEditor/KeyItemTypeSelector';
import KeyItemNumericValueInput from '../component/keyEditor/KeyItemValueInput';
import { setEditorKeyItem, updateKey, useKeyPadsStore } from '../hook/useKeyPadsStore';

export default function KeyEditor() {
    const keyItem = useKeyPadsStore((s) => s.editorKeyItem);

    const handleChange = useCallback(
        (changed: Partial<KeyItem>) => {
            if (keyItem === null) return;
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
        <View className='flex-1 justify-start items-center py-4 gap-4 bg-primary'>
            <KeyItemInput name='name' initialValue={keyItem.name} onChange={handleChange} />
            {keyItem.type === 'Constant' && typeof keyItem.value === 'number' && (
                <KeyItemNumericValueInput initialValue={keyItem.value} onChange={(value) => handleChange({ value })} />
            )}
            <KeyItemTypeSelector initialType={keyItem.type} onChange={(type) => handleChange({ type })} />
            <KeyItemColorSelector initialColor={keyItem.color} onChange={(color) => handleChange({ color })} />
            <KeyItemInput name='memo' initialValue={keyItem.memo || ''} onChange={handleChange} />
        </View>
    );
}
