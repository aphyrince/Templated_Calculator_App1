import { DisplayState, useDisplayStore } from '@/src/hook/useDisplayStore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Expression from './Expression';

export default function Display() {
    const tokens = useDisplayStore((s) => s.tokens);
    const result = useDisplayStore((s) => s.result);

    const [prevResult, setPrevResult] = useState<DisplayState['result']>(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (result !== prevResult) {
            setPrevResult(prevResult);
            setShowResult(true);
        } else {
            setShowResult(false);
        }
    }, [tokens, result]);

    return (
        <View className='w-full h-[20%] bg-white/30  relative'>
            <Expression />

            {showResult && result !== null && (
                <View className='mt-3 items-end'>
                    <Text className='text-white/70 text-sm'>Result</Text>
                    <Text className='text-white text-2xl'>{String(result)}</Text>
                </View>
            )}
        </View>
    );
}
