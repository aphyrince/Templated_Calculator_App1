import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import KeyPadEditorGrid from '../component/keyPadEditor/KeyPadEditorGrid';
import useEditorStore from '../hook/useEditorStore';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function KeyPadEditor() {
    const router = useRouter();
    const padId = useEditorStore((s) => s.editorPadId);
    const [keyPad, setKeyPad] = useState<KeyPad_Type | undefined>(undefined);
    const [keys, setKeys] = useState<Key_Type[] | undefined>(keyPad?.keys);
    const getKeyPadById = useKeyPadsStore((s) => s.getKeyPadById);
    const setKeyId = useEditorStore((s) => s.setEditorKeyId);
    const updateKeyPad = useKeyPadsStore((s) => s.updateKeyPad);

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: keyPad?.title ?? 'KeyPad?',
            headerBackButtonDisplayMode: 'minimal',
            headerRight: () => (
                <Pressable className='w-20 flex justify-center items-center'>
                    <Ionicons name='add' size={32} color={'#FF8D28'} />
                </Pressable>
            ),
        });
    }, [navigation, keyPad]);

    useEffect(() => {
        if (!padId) {
            console.log('current padId is null!');
            return;
        }
        setKeyPad(getKeyPadById(padId));
    }, [padId, getKeyPadById, setKeyId]);

    useEffect(() => {
        if (!keyPad) {
            return;
        }
        setKeys(keyPad.keys);
    }, [keyPad]);

    return (
        <View className='flex-1 flex gap-4 pt-6 bg-primary '>
            <View className='bg-third mx-5 p-4 rounded-lg'>
                <Text className='text-white text-2xl'>{keyPad?.title}</Text>
            </View>
            {keyPad && keys && (
                <KeyPadEditorGrid data={keys} />
                // <GestureHandlerRootView>
                //     <DraggableFlatList
                //         data={keys}
                //         keyExtractor={(key) => key.id}
                //         onDragEnd={({ data }) => {
                //             setKeys(data);
                //             updateKeyPad(keyPad.id, { keys: data });
                //             setKeyPad(getKeyPadById(keyPad.id));
                //         }}
                //         renderItem={({ item, drag, isActive }) => (
                //             <ScaleDecorator>
                //                 <Pressable
                //                     onLongPress={drag}
                //                     disabled={isActive}
                //                     className='size-20 bg-btn p-2 rounded-md'
                //                 >
                //                     <Text className='text-black m-auto text-2xl'>{item.title}</Text>
                //                 </Pressable>
                //             </ScaleDecorator>
                //         )}
                //     />
                // </GestureHandlerRootView>
            )}
            {/* <View className='flex-1 flex-row flex-wrap justify-evenly bg-primary gap-7 p-4'>
                {keyPad &&
                    keyPad.keys.map((key) => (
                        <Pressable
                            key={key.id}
                            className='size-20 bg-btn p-2 rounded-md'
                            onPress={() => {
                                setKeyId(key.id);
                                router.push('/KeyEditor');
                            }}
                        >
                            <Text className='text-black m-auto text-2xl'>{key.title}</Text>
                        </Pressable>
                    ))}
            </View> */}
        </View>
    );
}
