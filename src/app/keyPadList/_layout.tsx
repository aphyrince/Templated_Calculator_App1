import { Stack } from 'expo-router';

export default function ListLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: 'KeyPad List' }} />
            <Stack.Screen name='keyPad' options={{ title: 'KeyPad' }} />
        </Stack>
    );
}
