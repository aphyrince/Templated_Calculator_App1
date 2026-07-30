import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import useEditorStore from '../hook/useEditorStore';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function KeyPadList() {
    const router = useRouter();
    const keyPads = useKeyPadsStore((s) => s.keyPads);
    const setEditorKeyPadId = useEditorStore((s) => s.setEditorPadId);
    const navigation = useNavigation();
    const addKeyPad = useKeyPadsStore((s) => s.addKeyPad);

    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const [newKeyPadTitle, setNewKeyPadTitle] = useState('');

    const translateY = useSharedValue(100);

    const handleRightAddBtnClick = useCallback(() => {
        setShowInput((prev) => {
            translateY.value = prev ? withSpring(100) : withSpring(0);
            return !prev;
        });
        translateY.value = withSpring(0);
    }, [translateY]);

    const onAddKeyPad = (title: string) => {
        if (title === '') return;
        const newKeyPad: KeyPad_Ing_Type = {
            title,
            keys: [],
        };
        addKeyPad(newKeyPad);
        setNewKeyPadTitle('');
    };

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
                <Pressable className='w-20 flex justify-center items-center' onPress={handleRightAddBtnClick}>
                    <Ionicons name='add' size={32} color={'#FF8D28'} />
                </Pressable>
            ),
        });
    }, [navigation, handleRightAddBtnClick]);

    return (
        <View className='flex-1 items-center py-4 gap-4 w-full bg-primary'>
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
                    className='flex-row w-11/12 items-center   bg-third border-btn/50 border-2 rounded-lg'
                    style={{ transform: [{ translateY }] }}
                    onBlur={() => {
                        handleRightAddBtnClick();
                        onAddKeyPad(newKeyPadTitle);
                    }}
                >
                    <TextInput
                        className='flex-1 flex-row justify-start items-center text-white text-xl p-2'
                        ref={inputRef}
                        value={newKeyPadTitle}
                        placeholder={'new KeyPad Title'}
                        onChangeText={(txt) => {
                            setNewKeyPadTitle(txt);
                        }}
                    />
                    <Pressable
                        onPress={() => {
                            handleRightAddBtnClick();
                            onAddKeyPad(newKeyPadTitle);
                        }}
                    >
                        <Ionicons name='add' size={24} color='white' className='bg-green-500 rounded-md p-2' />
                    </Pressable>
                </Animated.View>
            )}
        </View>
    );
}
