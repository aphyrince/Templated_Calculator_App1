import useDisplayStore from '@/src/hook/useDisplayStore';
import React, { useEffect, useRef } from 'react';
import { ScrollView, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export default function ExpressionRenderer() {
    const exps = useDisplayStore((s) => s.exps);
    const cursorIdx = useDisplayStore((s) => s.cursorIdx);
    const cursorPos = useSharedValue({ x: 0, y: 0 });
    const scrollViewRef = useRef<ScrollView | null>(null);

    useEffect(() => {
        if (!scrollViewRef.current) return;
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [exps, cursorIdx]);

    return (
        <ScrollView
            className='w-full p-2 h-full'
            ref={(node) => {
                if (node) scrollViewRef.current = node;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
            {exps.map((exp) => (
                <Text key={exp.id} className='text-white text-2xl'>
                    {exp.value}
                </Text>
            ))}
        </ScrollView>
    );
}
