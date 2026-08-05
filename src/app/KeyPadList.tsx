import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Pressable, TextInput, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import KeyPadListItem from '../component/keyPadList/KeyPadListItem';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function KeyPadList() {
    const navigation = useNavigation();

    const keyPads = useKeyPadsStore((s) => s.keyPads);
    const addKeyPad = useKeyPadsStore((s) => s.addKeyPad);
    const setKeyPads = useKeyPadsStore((s) => s.setKeyPads);

    const [showInput, setShowInput] = useState(false);
    const [newKeyPadTitle, setNewKeyPadTitle] = useState('');

    const inputRef = useRef<TextInput>(null);

    const translateY = useSharedValue(-100);

    const onAddKeyPad = useCallback(
        (title: string) => {
            if (!title.trim()) return;

            const newKeyPad: KeyPad_Ing_Type = {
                title: title.trim(),
                keys: [],
            };

            addKeyPad(newKeyPad);
        },
        [addKeyPad],
    );

    const openInput = useCallback(() => {
        if (showInput) return;

        setShowInput(true);
        translateY.value = withSpring(0);
    }, [showInput, translateY]);

    const closeInput = useCallback(() => {
        translateY.value = withSpring(-100);

        setTimeout(() => {
            setShowInput(false);
        }, 180);
    }, [translateY]);

    const finishEditing = useCallback(() => {
        onAddKeyPad(newKeyPadTitle);

        setNewKeyPadTitle('');

        inputRef.current?.blur();

        closeInput();
    }, [newKeyPadTitle, onAddKeyPad, closeInput]);

    useEffect(() => {
        if (showInput) {
            requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
        }
    }, [showInput]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable className='w-20 justify-center items-center' onPress={openInput}>
                    <Ionicons name='add' size={32} color='#FF8D28' />
                </Pressable>
            ),
        });
    }, [navigation, openInput]);

    return (
        <View className='flex-1 items-center  bg-primary'>
            {showInput && (
                <Animated.View
                    style={{
                        marginTop: 16,
                        backgroundColor: '#1E1E1E',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '91%',
                        borderRadius: '8px',
                    }}
                >
                    <TextInput
                        ref={inputRef}
                        className='flex-1 text-white text-xl p-2'
                        value={newKeyPadTitle}
                        placeholder='New KeyPad Title'
                        placeholderTextColor='#999'
                        onChangeText={setNewKeyPadTitle}
                        onBlur={finishEditing}
                        onSubmitEditing={finishEditing}
                        returnKeyType='done'
                    />

                    <Pressable className='p-2' onPress={finishEditing}>
                        <Ionicons name='add' size={24} color='white' />
                    </Pressable>
                </Animated.View>
            )}
            <GestureHandlerRootView className='w-full p-4'>
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
