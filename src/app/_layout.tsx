import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { stdNum, stdNum2 } from '../data/dummy';
import '../global.css';
import { useAsyncStorage } from '../hook/useAsyncStorage';
import useKeyPadsStore from '../hook/useKeyPadsStore';

export default function RootLayout() {
    const [storedKeyPadData, loading] = useAsyncStorage<KeyPad_Type[]>('@last_Calculator_KeyPads', [stdNum, stdNum2]);
    const [isInitialized, setIsInitialized] = useState(false);
    const setKeyPads = useKeyPadsStore((s) => s.setKeyPads);

    useEffect(() => {
        if (!loading && !isInitialized) {
            setKeyPads(storedKeyPadData);

            const timer = setTimeout(() => {
                setIsInitialized(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [loading, isInitialized, setKeyPads, storedKeyPadData]);

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#757575' },
                headerTintColor: '#ffffff',
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 24 },
            }}
        >
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen
                name='KeyPadList'
                options={{
                    headerTitle: 'KeyPad List',
                    headerBackButtonDisplayMode: 'minimal',
                    headerRight: () => (
                        <Pressable className='w-20 flex justify-center items-center'>
                            <Ionicons name='add' size={32} color={'#FF8D28'} />
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name='KeyPad'
                options={{
                    headerTitle: 'KeyPad',
                    headerBackButtonDisplayMode: 'minimal',
                    headerRight: () => (
                        <Pressable className='w-20 flex justify-center items-center'>
                            <Ionicons name='add' size={32} color={'#FF8D28'} />
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name='KeyEditor'
                options={{ headerTitle: 'Key Editor', headerBackButtonDisplayMode: 'minimal' }}
            />
        </Stack>
    );
}
