import { useKeyPadsStore } from '@/src/hook/useKeyPadsStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';

interface Props {
    onEditKeyPadName: (title: string) => void;
}

export default function KeyPadTitle({ onEditKeyPadName }: Props) {
    const selectedKeyPad = useKeyPadsStore((s) => s.selectedKeyPad);
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState(selectedKeyPad ? selectedKeyPad.name : '');

    const longPress = Gesture.Pan()
        .activateAfterLongPress(300)
        .onStart(() => {
            scheduleOnRN(setIsEditMode, true);
        });

    const handleChange = useCallback((text: string) => {
        setName(text);
    }, []);

    const handdleSubmit = useCallback(() => {
        if (selectedKeyPad === null) return;
        setIsEditMode(false);
        if (name !== '' && selectedKeyPad.name !== name) {
            onEditKeyPadName(name);
        } else {
            setName(selectedKeyPad.name);
        }
    }, [name, onEditKeyPadName, selectedKeyPad]);

    return (
        <GestureHandlerRootView
            style={{
                width: '100%',
            }}
        >
            {isEditMode ? (
                <View className='flex-row justify-center items-center mx-5 rounded-lg border-4 border-accent'>
                    <TextInput
                        className='w-full h-full p-4 items-center bg-third rounded-lg border-none color-accent text-2xl'
                        value={name}
                        onChangeText={handleChange}
                        onBlur={handdleSubmit}
                    />
                    <Pressable className='absolute right-0 top-0 bottom-0 bg-green-500 h-full rounded-lg justify-center'>
                        <Ionicons name='checkmark' size={32} color={'white'} />
                    </Pressable>
                </View>
            ) : (
                <GestureDetector gesture={longPress}>
                    <View className='justify-center items-start mx-5 p-4 rounded-lg border-4 border-third'>
                        <Text className='text-white text-2xl'>{name}</Text>
                    </View>
                </GestureDetector>
            )}
        </GestureHandlerRootView>
    );
}
