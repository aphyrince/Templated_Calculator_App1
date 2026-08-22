import { SafeAreaView } from 'react-native-safe-area-context';
import KeyPad from '../component/calculator/KeyPad';
import KeyPadSelector from '../component/calculator/KeyPadSelector';
import MenuBar from '../component/calculator/MenuBar';
import Display from '../component/calculator/display/Display';

export default function Calculator() {
    return (
        <SafeAreaView className='w-full h-full p-0 m-0 border-0 box-border bg-primary'>
            <Display />
            <KeyPadSelector />
            <MenuBar />
            <KeyPad />
        </SafeAreaView>
    );
}
