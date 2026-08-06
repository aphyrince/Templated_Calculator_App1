import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyPadAddModal from '../component/keyPadList/KeyPadAddModal';
import KeyPadListItem from '../component/keyPadList/KeyPadListItem';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function KeyPadList() {
    const navigation = useNavigation();

    const keyPads = useKeyPadsStore((s) => s.keyPads);
    const addKeyPad = useKeyPadsStore((s) => s.addKeyPad);
    const setKeyPads = useKeyPadsStore((s) => s.setKeyPads);

    const [showAddModal, setShowAddModal] = useState(false);

    const toggleAddModal = useCallback(() => {
        setShowAddModal((prev) => !prev);
    }, []);

    const handleAddKeyPad = useCallback(
        (title: string) => {
            const newKeyPad: KeyPad_Ing_Type = {
                title,
                keys: [],
            };
            addKeyPad(newKeyPad);
            toggleAddModal();
        },
        [addKeyPad, toggleAddModal],
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable className='w-20 justify-center items-center' onPress={toggleAddModal}>
                    <Ionicons name='add' size={32} color='#FF8D28' />
                </Pressable>
            ),
        });
    }, [navigation, toggleAddModal]);

    return (
        <View className='flex-1  relative items-center  bg-primary'>
            <KeyPadAddModal show={showAddModal} onSubmit={handleAddKeyPad} />
            <GestureHandlerRootView
                style={{
                    width: '100%',
                    padding: 16,
                }}
            >
                <DraggableFlatList
                    className='w-full h-full'
                    data={keyPads}
                    onDragEnd={({ data }) => setKeyPads(data)}
                    keyExtractor={(keyPad) => keyPad.id}
                    renderItem={KeyPadListItem}
                />
            </GestureHandlerRootView>
        </View>
    );
}
