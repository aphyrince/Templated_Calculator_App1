import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import KeyAddModal from '../component/keyPadEditor/KeyAddModal';
import KeyPadEditorGrid from '../component/keyPadEditor/KeyPadEditorGrid';
import useEditorStore from '../hook/useEditorStore';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function KeyPadEditor() {
    const padId = useEditorStore((s) => s.editorPadId);
    const [keyPad, setKeyPad] = useState<KeyPad_Type | undefined>(undefined);
    const [keys, setKeys] = useState<Key_Type[] | undefined>(keyPad?.keys);
    const getKeyPadById = useKeyPadsStore((s) => s.getKeyPadById);
    const setKeyId = useEditorStore((s) => s.setEditorKeyId);
    const addKey = useKeyPadsStore((s) => s.addKey);

    const [showAddModal, setShowAddModal] = useState(false);

    const navigation = useNavigation();

    const toggleAddModal = useCallback(() => {
        setShowAddModal((prev) => !prev);
    }, []);

    const handdleAdd = useCallback(
        (name: string, value: number) => {
            if (!keyPad) return;
            toggleAddModal();
            addKey(keyPad.id, { title: name, value, type: 'Constant' });
            setKeyPad(getKeyPadById(keyPad.id));
        },
        [keyPad, addKey, toggleAddModal, getKeyPadById],
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: keyPad?.title ?? 'KeyPad?',
            headerBackButtonDisplayMode: 'minimal',
            headerRight: () => (
                <Pressable className='w-20 flex justify-center items-center' onPress={toggleAddModal}>
                    <Ionicons name='add' size={32} color={'#FF8D28'} />
                </Pressable>
            ),
        });
    }, [navigation, keyPad, toggleAddModal]);

    useEffect(() => {
        if (!padId) {
            console.log('current padId is null!');
            return;
        }
        setKeyPad(getKeyPadById(padId));
    }, [padId, getKeyPadById, setKeyId]);

    useEffect(() => {
        if (!keyPad) {
            return;
        }
        setKeys(keyPad.keys);
    }, [keyPad]);

    return (
        <View className='flex-1 flex gap-4 pt-6 bg-primary '>
            <View className='bg-third mx-5 p-4 rounded-lg'>
                <Text className='text-white text-2xl'>{keyPad?.title}</Text>
            </View>
            {keyPad && keys && <KeyPadEditorGrid data={keys} />}
            <KeyAddModal show={showAddModal} onSubmit={handdleAdd} />
        </View>
    );
}
