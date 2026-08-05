import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyPad from '../component/calculator/KeyPad';
import KeyPadSelector from '../component/calculator/KeyPadSelector';

export default function Calculator() {
    const router = useRouter();

    return (
        <SafeAreaView className='w-full h-full bg-primary'>
            <View className='flex flex-row justify-start items-center w-full h-1/4 bg-white/30 p-4'>
                <Text className='text-white text-4xl'>Printer</Text>
                <Text className='text-amber-400 text-4xl'> v!</Text>
                {/* <View> 현재 입력 위치 따라다니는 커서</View> */}
            </View>

            <View className='flex flex-row justify-start items-center gap-1 w-full h-20 p-2 bg-third '>
                <KeyPadSelector />

                <Pressable
                    onPress={() => {
                        router.push('/KeyPadList');
                    }}
                    className='ml-auto flex justify-center items-center size-16 p-2 bg-accent rounded-xl font-extrabold text-xl color-black/90'
                >
                    <Ionicons name='reorder-three' size={32} />
                </Pressable>
            </View>
            <KeyPad />
        </SafeAreaView>
    );
}
