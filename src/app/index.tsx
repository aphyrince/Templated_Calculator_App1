import { SafeAreaView } from 'react-native-safe-area-context';
import Display from '../component/calculator/Display';
import KeyPad from '../component/calculator/KeyPad';
import KeyPadSelector from '../component/calculator/KeyPadSelector';

export default function Calculator() {
    return (
        <SafeAreaView className='w-full h-full bg-primary'>
            <Display />
            <KeyPadSelector />
            <KeyPad />
        </SafeAreaView>
    );
}
