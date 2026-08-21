import React, { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FuncEditor from '../component/keyEditor/funcEditor/FuncEditor';
import ColorSelector from '../component/keyEditor/keyItemInput/ColorSelector';
import Memo from '../component/keyEditor/keyItemInput/Memo';
import Name from '../component/keyEditor/keyItemInput/Name';
import NumericValue from '../component/keyEditor/keyItemInput/NumericValue';
import TypeSelector from '../component/keyEditor/keyItemInput/TypeSelector';
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
        <ScrollView className='bg-black'>
            <View className='flex-1 justify-start items-center py-4 gap-4 bg-primary'>
                <Name name='name' initialValue={keyItem.name} onChange={handleChange} />
                <TypeSelector initialType={keyItem.type} onChange={(type) => handleChange({ type })} />
                {keyItem.type === 'Constant' && typeof keyItem.value === 'number' && (
                    <NumericValue initialValue={keyItem.value} onChange={(value) => handleChange({ value })} />
                )}
                {/* {keyItem.type === 'Function' && <FunctionEditor />} */}
                {keyItem.type === 'Function' && <FuncEditor />}
                <ColorSelector initialColor={keyItem.color} onChange={(color) => handleChange({ color })} />
                <Memo initialValue={keyItem.memo || ''} onChange={handleChange} />
            </View>
        </ScrollView>
    );
}
