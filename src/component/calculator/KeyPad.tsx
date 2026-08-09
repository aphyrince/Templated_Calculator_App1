import useDisplayStore from '@/src/hook/useDisplayStore';
import useKeyPadsStore from '@/src/hook/useKeyPadsStore';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function KeyPad() {
    const keyPads = useKeyPadsStore((s) => s.keyPads);
    const selectedKeyPadId = useKeyPadsStore((s) => s.selectedKeyPadId);
    const getKeyPadById = useKeyPadsStore((s) => s.getKeyPadById);
    const [keyPad, setKeyPad] = useState<KeyPad_Type | undefined>(undefined);

    const insertExp = useDisplayStore((s) => s.insertExp);

    useEffect(() => {
        setKeyPad(getKeyPadById(selectedKeyPadId));
    }, [selectedKeyPadId, getKeyPadById, keyPads]);

    return (
        <View className='flex-1 flex-row flex-wrap justify-evenly gap-7 p-4'>
            {keyPad &&
                keyPad.keys.map((key) => (
                    <Pressable
                        key={key.id}
                        className='size-20 bg-btn p-2 rounded-md'
                        onPress={() => {
                            insertExp(key.value);
                        }}
                    >
                        <Text className='text-black m-auto text-2xl'>{key.title}</Text>
                    </Pressable>
                ))}
        </View>
    );
}
