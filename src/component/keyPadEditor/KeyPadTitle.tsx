import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';

interface Props {
    keyPad: KeyPad_Type;
    onEditTitle: (title: string) => void;
}

export default function KeyPadTitle({ keyPad, onEditTitle }: Props) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(keyPad.title);

    const longPress = Gesture.Pan()
        .activateAfterLongPress(300)
        .onStart(() => {
            scheduleOnRN(setIsEditMode, true);
        });

    const handleChange = useCallback((text: string) => {
        setTitle(text);
    }, []);

    const handdleSubmit = useCallback(() => {
        setIsEditMode(false);
        if (title !== '' && keyPad.title !== title) {
            onEditTitle(title);
        } else {
            setTitle(keyPad.title);
        }
    }, [title, keyPad, onEditTitle]);

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
                        value={title}
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
                        <Text className='text-white text-2xl'>{title}</Text>
                    </View>
                </GestureDetector>
            )}
        </GestureHandlerRootView>
    );
}
