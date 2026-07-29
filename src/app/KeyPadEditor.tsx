import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import useEditorStore from '../hook/useEditorStore';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function KeyPadEditor() {
    const router = useRouter();
    const padId = useEditorStore((s) => s.editorPadId);
    const [keyPad, setKeyPad] = useState<KeyPad_Type | undefined>(undefined);
    const getKeyPadById = useKeyPadsStore((s) => s.getKeyPadById);
    const setKeyId = useEditorStore((s) => s.setEditorKeyId);

    useEffect(() => {
        if (!padId) {
            console.log('current padId is null!');
            return;
        }
        setKeyPad(getKeyPadById(padId));
    }, [padId, getKeyPadById, setKeyId]);

    return (
        <View className='flex-1 flex gap-4 pt-6 bg-primary '>
            <View className='bg-third mx-5 p-4 rounded-lg'>
                <Text className='text-white text-2xl'>{keyPad?.title}</Text>
            </View>
            <View className='flex-1 grid grid-cols-4 place-items-center bg-primary gap-4 p-4'>
                {keyPad &&
                    keyPad.keys.map((key) => (
                        <Pressable
                            key={key.id}
                            className='size-20 bg-btn p-2 rounded-md'
                            onPress={() => {
                                setKeyId(key.id);
                                router.push('/KeyEditor');
                            }}
                        >
                            <Text className='text-black m-auto text-2xl'>{key.title}</Text>
                        </Pressable>
                    ))}
            </View>
        </View>
    );
}
