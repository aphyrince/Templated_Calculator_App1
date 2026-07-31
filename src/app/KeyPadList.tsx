import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, FlatList, Pressable, TextInput, View } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import SwipeableKeyPadListItem from '../component/keyPadList/SwipeableKeyPadListItem';
import useEditorStore from '../hook/useEditorStore';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function KeyPadList() {
    const router = useRouter();
    const navigation = useNavigation();

    const keyPads = useKeyPadsStore((s) => s.keyPads);
    const addKeyPad = useKeyPadsStore((s) => s.addKeyPad);
    const deleteKeyPad = useKeyPadsStore((s) => s.deleteKeyPad);

    const setEditorKeyPadId = useEditorStore((s) => s.setEditorPadId);

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
                        // transform: [{ translateY: translateY.value }],
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
            <FlatList
                className='w-full py-4'
                data={keyPads}
                keyExtractor={(keyPad) => keyPad.id}
                renderItem={({ item: keyPad }) => (
                    <SwipeableKeyPadListItem
                        keyPad={keyPad}
                        onPress={() => {
                            setEditorKeyPadId(keyPad.id);
                            router.push('/KeyPadEditor');
                        }}
                        onDelete={() => {
                            deleteKeyPad(keyPad.id);
                        }}
                    />
                )}
            />
        </View>
    );
}
