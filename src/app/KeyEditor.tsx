import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import FunctionEditor from '../component/keyEditor/FunctionEditor';
import KeyItemColorSelector from '../component/keyEditor/KeyItemColorSelector';
import KeyItemInput from '../component/keyEditor/KeyItemInput';
import KeyItemMemoInput from '../component/keyEditor/KeyItemMemoInput';
import KeyItemTypeSelector from '../component/keyEditor/KeyItemTypeSelector';
import KeyItemNumericValueInput from '../component/keyEditor/KeyItemValueInput';
import { setEditorKeyItem, setEditorKeyPad, updateKey, useKeyPadsStore } from '../hook/useKeyPadsStore';

export default function KeyEditor() {
    const keyItem = useKeyPadsStore((s) => s.editorKeyItem);

    const handleChange = useCallback(
        (changed: Partial<KeyItem>) => {
            if (keyItem === null) return;

            updateKey(keyItem, changed);
            const editorKeyPad = useKeyPadsStore
                .getState()
                .keyPads.find((keyPad) => keyPad.id === keyItem.padId) as KeyPad;
            setEditorKeyPad(editorKeyPad);
            const editorKeyItem = editorKeyPad.items.find((item) => item.id === keyItem.id) as KeyItem;
            setEditorKeyItem(editorKeyItem);
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
            <KeyItemTypeSelector initialType={keyItem.type} onChange={(type) => handleChange({ type })} />
            {keyItem.type === 'Constant' && typeof keyItem.value === 'number' && (
                <KeyItemNumericValueInput initialValue={keyItem.value} onChange={(value) => handleChange({ value })} />
            )}
            {keyItem.type === 'Function' && <FunctionEditor />}
            <KeyItemColorSelector initialColor={keyItem.color} onChange={(color) => handleChange({ color })} />
            <KeyItemMemoInput initialValue={keyItem.memo || ''} onChange={handleChange} />
        </View>
    );
}
