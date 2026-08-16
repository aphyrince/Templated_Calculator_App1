import { Ionicons } from '@expo/vector-icons';
import { randomUUID } from 'expo-crypto';
import { useNavigation } from 'expo-router';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import KeyAddModal from '../component/keyPadEditor/KeyAddModal';
import KeyPadEditorGrid from '../component/keyPadEditor/KeyPadEditorGrid';
import KeyPadTitle from '../component/keyPadEditor/KeyPadTitle';
import { addKeyItem, setEditorKeyPad, updateKeyPad, useKeyPadsStore } from '../hook/useKeyPadsStore';

export default function KeyPadEditor() {
    const editorKeyPad = useKeyPadsStore((s) => s.editorKeyPad);
    const [showAddModal, setShowAddModal] = useState(false);
    const navigation = useNavigation();

    const toggleAddModal = useCallback(() => {
        setShowAddModal((prev) => !prev);
    }, []);

    const handleAddKeyItem = useCallback(
        (name: string, value: number) => {
            if (editorKeyPad === null) return;
            const newItem: KeyItem = {
                padId: editorKeyPad.id,
                id: randomUUID(),
                name,
                value,
                type: 'Constant',
            };
            addKeyItem(newItem);
            setEditorKeyPad(
                useKeyPadsStore.getState().keyPads.find((keyPad) => keyPad.id === editorKeyPad.id) as KeyPad,
            );
            setShowAddModal(false);
        },
        [editorKeyPad],
    );

    const handleEditKeyPadName = useCallback(
        (name: string) => {
            if (editorKeyPad === null) return;
            updateKeyPad(editorKeyPad.id, { name });
        },
        [editorKeyPad],
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: editorKeyPad?.name ?? 'KeyPad?',
            headerBackButtonDisplayMode: 'minimal',
            headerRight: () => (
                <Pressable className='w-20 flex justify-center items-center' onPress={toggleAddModal}>
                    <Ionicons name='add' size={32} color={'#FF8D28'} />
                </Pressable>
            ),
        });
    }, [navigation, toggleAddModal, editorKeyPad]);

    return (
        <View className='flex-1 flex gap-4 pt-6 bg-primary '>
            {editorKeyPad && <KeyPadTitle onEditKeyPadName={handleEditKeyPadName} />}
            {editorKeyPad && <KeyPadEditorGrid data={editorKeyPad.items} />}
            <KeyAddModal show={showAddModal} onSubmit={handleAddKeyItem} />
        </View>
    );
}
