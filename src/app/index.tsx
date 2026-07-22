import { SafeAreaView } from 'react-native-safe-area-context';
import Keyboard from '../component/calculator/pad';
import Options from '../component/calculator/padList';
import Printer from '../component/calculator/printer';

export default function Calculator() {
    return (
        <SafeAreaView className='w-dvw h-dvh bg-primary'>
            <Printer />
            <Options />
            <Keyboard />
        </SafeAreaView>
    );
}
