import { deleteKeyPad, setEditorKeyPad } from '@/src/hook/useKeyPadsStore';

import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export default function KeyPadListItem({ item, drag, isActive }: RenderItemParams<KeyPad>) {
    const handleDelete = useCallback(() => {
        deleteKeyPad(item.id);
    }, [item]);

    const handleClick = useCallback(() => {
        setEditorKeyPad(item);
        router.push('/KeyPadEditor');
    }, [item]);

    return (
        <ScaleDecorator>
            <Swipeable
                renderRightActions={() => (
                    <View className='w-14 mb-4'>
                        <Pressable
                            className='bg-red-500 justify-center items-center size-11  rounded-md '
                            onPress={handleDelete}
                        >
                            <Text className='text-white font-bold'>삭제</Text>
                        </Pressable>
                    </View>
                )}
                overshootRight={false}
                overshootLeft={false}
                friction={2}
                // rightThreshold={20}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={drag}
                    disabled={isActive}
                    className='p-4 mb-4 w-full rounded-lg bg-btn'
                    onPress={handleClick}
                >
                    <Text className='text-xl'>{item.name}</Text>
                </TouchableOpacity>
            </Swipeable>
        </ScaleDecorator>
    );
}
