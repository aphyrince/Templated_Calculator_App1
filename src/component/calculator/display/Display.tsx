import { setResultNull, useDisplayStore } from '@/src/hook/useDisplayStore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import TokenRenderer from '../display/TokenRenderer';

export default function Display() {
    const tokens = useDisplayStore((s) => s.tokens);
    const result = useDisplayStore((s) => s.result);

    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        setShowResult(result !== null);
    }, [result]);

    useEffect(() => {
        setResultNull();
    }, [tokens]);

    return (
        <View className='w-full h-[20%] bg-white/30  relative'>
            <TokenRenderer />

            {showResult && result !== null && (
                <View className='mt-3 items-end'>
                    <Text className='text-white/70 text-sm'>Result</Text>
                    <Text className='text-white text-2xl'>{String(result)}</Text>
                </View>
            )}
        </View>
    );
}
