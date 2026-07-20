import { Stack } from 'expo-router';

export default function ListLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: '수식 리스트' }} />
            <Stack.Screen name='editor' options={{ title: '편집' }} />
        </Stack>
    );
}
