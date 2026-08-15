import { setSelectedKeyPad, useKeyPadsStore } from '@/src/hook/useKeyPadsStore';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

export default function KeyPadSelector() {
    const keyPads = useKeyPadsStore((state) => state.keyPads);

    return (
        <View className='flex flex-row justify-start items-center gap-1 w-full h-20 p-2 bg-third '>
            <View style={{ flex: 1, height: '100%' }}>
                <FlatList
                    horizontal={true}
                    data={keyPads}
                    keyExtractor={(keyPad) => keyPad.id}
                    renderItem={({ item: keyPad }) => (
                        <Pressable
                            className='size-16 bg-btn rounded-lg text-center p-1 mr-2'
                            onPress={() => {
                                setSelectedKeyPad(keyPad);
                            }}
                        >
                            <Text>{keyPad.name}</Text>
                        </Pressable>
                    )}
                />
            </View>
        </View>
    );
}
