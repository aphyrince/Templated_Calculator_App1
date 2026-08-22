import { insertFuncToken, insertToken } from '@/src/hook/useDisplayStore';
import { useKeyPadsStore } from '@/src/hook/useKeyPadsStore';

import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function KeyPad() {
    const selectedKeyPad = useKeyPadsStore((s) => s.selectedKeyPad);

    const handleKeyPress = (key: KeyItem) => {
        if (key.type === 'Function') {
            if (!key.funcExps) return;
            insertFuncToken(key.funcExps, key.name);
        } else {
            insertToken(key.value);
        }
    };

    return (
        <View className='flex-1 flex-row flex-wrap justify-evenly gap-3 p-4'>
            {selectedKeyPad &&
                selectedKeyPad.items.map((item) => (
                    <Pressable
                        key={item.id}
                        className='size-20 bg-btn p-2 rounded-md'
                        onPress={() => handleKeyPress(item)}
                    >
                        <Text className='text-black m-auto text-2xl'>{item.name}</Text>
                    </Pressable>
                ))}
        </View>
    );
}
