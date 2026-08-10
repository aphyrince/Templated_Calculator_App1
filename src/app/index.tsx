import { SafeAreaView } from 'react-native-safe-area-context';
import Display from '../component/calculator/Display';
import KeyPad from '../component/calculator/KeyPad';
import KeyPadSelector from '../component/calculator/KeyPadSelector';
import MenuBar from '../component/calculator/MenuBar';

export default function Calculator() {
    return (
        <SafeAreaView className='w-full h-full bg-primary'>
            <Display />
            <KeyPadSelector />
            <MenuBar />
            <KeyPad />
        </SafeAreaView>
    );
}
