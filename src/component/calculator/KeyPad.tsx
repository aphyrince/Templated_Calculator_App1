import useKeyPadsStore from '@/src/hook/useKeyPadsStore';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function KeyPad() {
    const keyPads = useKeyPadsStore((s) => s.keyPads);
    const selectedKeyPadId = useKeyPadsStore((s) => s.selectedKeyPadId);
    const getKeyPadById = useKeyPadsStore((s) => s.getKeyPadById);
    const [keyPad, setKeyPad] = useState<KeyPad_Type | undefined>(undefined);

    useEffect(() => {
        setKeyPad(getKeyPadById(selectedKeyPadId));
    }, [selectedKeyPadId, getKeyPadById, keyPads]);

    return (
        <View className='flex-1 flex-row flex-wrap justify-evenly gap-7 p-4'>
            {keyPad &&
                keyPad.keys.map((key) => (
                    <View key={key.id} className='size-20 bg-btn p-2 rounded-md'>
                        <Text className='text-black m-auto text-2xl'>{key.title}</Text>
                    </View>
                ))}
        </View>
    );
}
