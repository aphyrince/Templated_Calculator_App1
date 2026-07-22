import { SafeAreaView } from 'react-native-safe-area-context';
import Keyboard from '../component/calculator/keyboard/';
import Options from '../component/calculator/options';
import Printer from '../component/calculator/printer';

export default function Calculator() {
    return (
        <SafeAreaView className='w-dvw h-dvh bg-black'>
            <Printer />
            <Options />
            <Keyboard />
        </SafeAreaView>
    );
}
