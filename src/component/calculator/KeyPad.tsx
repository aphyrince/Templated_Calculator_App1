import useKeyPadsStore from '@/src/hook/useKeyPadsStore';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function KeyPad() {
    const selectedKeyPadId = useKeyPadsStore((s) => s.selectedKeyPadId);
    const getKeyPadById = useKeyPadsStore((s) => s.getKeyPadById);
    const [keyPad, setKeyPad] = useState<KeyPad_Type | undefined>(undefined);

    useEffect(() => {
        setKeyPad(getKeyPadById(selectedKeyPadId));
    }, [selectedKeyPadId, getKeyPadById]);

    return (
        <View className='flex-1 grid grid-cols-4 place-items-center gap-4 p-4'>
            {keyPad &&
                keyPad.keys.map((key) => (
                    <View key={key.id} className='size-20 bg-btn p-2 rounded-md'>
                        <Text className='text-black m-auto text-2xl'>{key.title}</Text>
                    </View>
                ))}
        </View>
    );
}
