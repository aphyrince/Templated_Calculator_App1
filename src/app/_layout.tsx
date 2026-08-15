import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
    // const [storedKeyPadData, loading] = useAsyncStorage<KeyPad_Type[]>('@last_Calculator_KeyPads', [stdNum, stdNum2]);
    // const [isInitialized, setIsInitialized] = useState(false);
    // const setKeyPads = useKeyPadsStore((s) => s.setKeyPads);

    // useEffect(() => {
    //     if (!loading && !isInitialized) {
    //         setKeyPads(storedKeyPadData);

    //         const timer = setTimeout(() => {
    //             setIsInitialized(true);
    //         }, 50);
    //         return () => clearTimeout(timer);
    //     }
    // }, [loading, isInitialized, setKeyPads, storedKeyPadData]);

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
                }}
            />
            <Stack.Screen name='KeyPadEditor' />
            <Stack.Screen
                name='KeyEditor'
                options={{ headerTitle: 'Key Editor', headerBackButtonDisplayMode: 'minimal' }}
            />
        </Stack>
    );
}
