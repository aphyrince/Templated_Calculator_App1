import { Ionicons } from '@expo/vector-icons';
import { randomUUID } from 'expo-crypto';
import { useNavigation } from 'expo-router';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import KeyAddModal from '../component/keyPadEditor/KeyAddModal';
import KeyPadEditorGrid from '../component/keyPadEditor/KeyPadEditorGrid';
import KeyPadTitle from '../component/keyPadEditor/KeyPadTitle';
import { addKeyItem, updateKeyPad, useKeyPadsStore } from '../hook/useKeyPadsStore';

export default function KeyPadEditor() {
    const selectedKeyPad = useKeyPadsStore((s) => s.selectedKeyPad);
    const [showAddModal, setShowAddModal] = useState(false);
    const navigation = useNavigation();

    const toggleAddModal = useCallback(() => {
        setShowAddModal((prev) => !prev);
    }, []);

    const handleAddKeyItem = useCallback(
        (name: string, value: number) => {
            if (selectedKeyPad === null) return;
            const newItem: KeyItem = {
                padId: selectedKeyPad.id,
                id: randomUUID(),
                name,
                value,
                type: 'Constant',
            };
            addKeyItem(newItem);
        },
        [selectedKeyPad],
    );

    const handleEditKeyPadName = useCallback(
        (name: string) => {
            if (selectedKeyPad === null) return;
            updateKeyPad(selectedKeyPad.id, { name });
        },
        [selectedKeyPad],
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: selectedKeyPad?.name ?? 'KeyPad?',
            headerBackButtonDisplayMode: 'minimal',
            headerRight: () => (
                <Pressable className='w-20 flex justify-center items-center' onPress={toggleAddModal}>
                    <Ionicons name='add' size={32} color={'#FF8D28'} />
                </Pressable>
            ),
        });
    }, [navigation, toggleAddModal, selectedKeyPad]);

    return (
        <View className='flex-1 flex gap-4 pt-6 bg-primary '>
            {selectedKeyPad && <KeyPadTitle onEditKeyPadName={handleEditKeyPadName} />}
            {selectedKeyPad && <KeyPadEditorGrid data={selectedKeyPad.items} />}
            <KeyAddModal show={showAddModal} onSubmit={handleAddKeyItem} />
        </View>
    );
}
