import useDisplayStore from '@/src/hook/useDisplayStore';
import useKeyPadsStore from '@/src/hook/useKeyPadsStore';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const parseExpressionTokens = (expression: string): ExpValue[] => {
    const parts = expression.split(/(Blank)/g).filter(Boolean);
    return parts.flatMap((part) => (part === 'Blank' ? ['Blank'] : part.length > 0 ? [part] : []));
};

export default function KeyPad() {
    const keyPads = useKeyPadsStore((s) => s.keyPads);
    const selectedKeyPadId = useKeyPadsStore((s) => s.selectedKeyPadId);
    const getKeyPadById = useKeyPadsStore((s) => s.getKeyPadById);
    const [keyPad, setKeyPad] = useState<KeyPad_Type | undefined>(undefined);

    const insertExp = useDisplayStore((s) => s.insertExp);

    useEffect(() => {
        setKeyPad(getKeyPadById(selectedKeyPadId));
    }, [selectedKeyPadId, getKeyPadById, keyPads]);

    const handleKeyPress = (key: Key_Type) => {
        if (key.type === 'Formula' || key.type === 'Function') {
            const expression = key.expression?.trim() ?? String(key.value);
            const tokens = parseExpressionTokens(expression);
            if (tokens.length === 0) return;
            tokens.forEach((token) => insertExp(token));
            return;
        }

        insertExp(key.value);
    };

    return (
        <View className='flex-1 flex-row flex-wrap justify-evenly gap-3 p-4'>
            {keyPad &&
                keyPad.keys.map((key) => (
                    <Pressable
                        key={key.id}
                        className='size-20 bg-btn p-2 rounded-md'
                        onPress={() => handleKeyPress(key)}
                    >
                        <Text className='text-black m-auto text-2xl'>{key.title}</Text>
                    </Pressable>
                ))}
        </View>
    );
}
