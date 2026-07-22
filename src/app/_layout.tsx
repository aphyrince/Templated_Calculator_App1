import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import '../global.css';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#757575' },
                headerTintColor: '#ffffff',
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 24 },
                headerRight: () => (
                    <Pressable className='w-20 flex justify-center items-center'>
                        <Ionicons name='add' size={32} color={'#FF8D28'} />
                    </Pressable>
                ),
            }}
        >
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen
                name='KeyPadList'
                options={{ headerTitle: 'KeyPad List', headerBackButtonDisplayMode: 'minimal' }}
            />
            <Stack.Screen name='KeyPad' options={{ headerTitle: 'KeyPad', headerBackButtonDisplayMode: 'minimal' }} />
            <Stack.Screen
                name='KeyEditor'
                options={{ headerTitle: 'Key Editor', headerBackButtonDisplayMode: 'minimal' }}
            />
        </Stack>
    );
}
