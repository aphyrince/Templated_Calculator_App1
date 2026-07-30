import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import useEditorStore from '../hook/useEditorStore';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function KeyPadList() {
    const router = useRouter();
    const navigation = useNavigation();

    const keyPads = useKeyPadsStore((s) => s.keyPads);
    const addKeyPad = useKeyPadsStore((s) => s.addKeyPad);

    const setEditorKeyPadId = useEditorStore((s) => s.setEditorPadId);

    const [showInput, setShowInput] = useState(false);
    const [newKeyPadTitle, setNewKeyPadTitle] = useState('');

    const inputRef = useRef<TextInput>(null);

    const translateY = useSharedValue(100);

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
        translateY.value = withSpring(100);

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
        <View className='flex-1 items-center py-4 gap-4 bg-primary'>
            {keyPads.map((keyPad) => (
                <Pressable
                    key={keyPad.id}
                    className='w-11/12 bg-btn p-2 rounded-md'
                    onPress={() => {
                        setEditorKeyPadId(keyPad.id);
                        router.push('/KeyPadEditor');
                    }}
                >
                    <Text className='text-primary text-xl'>{keyPad.title}</Text>
                </Pressable>
            ))}

            {showInput && (
                <Animated.View
                    className='flex-row w-11/12 items-center bg-third border-btn/50 border-2 rounded-lg'
                    style={{
                        transform: [{ translateY }],
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
        </View>
    );
}
