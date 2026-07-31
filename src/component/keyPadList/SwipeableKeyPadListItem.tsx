import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

interface Props {
    keyPad: KeyPad_Type;
    onPress: () => void;
    onDelete: () => void;
}

export default function SwipeableKeyPadListItem({ keyPad, onPress, onDelete }: Props) {
    return (
        <Swipeable
            renderRightActions={() => (
                <View className='w-14 mb-4'>
                    <Pressable
                        className='bg-red-500 justify-center items-center size-11  rounded-md '
                        onPress={onDelete}
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
            <Pressable className='w-11/12 bg-btn mx-auto p-2 mb-4 rounded-md' onPress={onPress}>
                <Text className='text-primary text-xl'>{keyPad.title}</Text>
            </Pressable>
        </Swipeable>
    );
}
