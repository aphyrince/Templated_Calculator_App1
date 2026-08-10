import useDisplayStore from '@/src/hook/useDisplayStore';
import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Blank from './Blank';

export default function Display() {
    const exps = useDisplayStore((s) => s.exps);
    const deleteLastExp = useDisplayStore((s) => s.deleteLastExp);
    const clearExps = useDisplayStore((s) => s.clearExps);

    const expressionString = useMemo(() => {
        return exps.map((exp) => (exp.value === 'Blank' ? '' : String(exp.value))).join('');
    }, [exps]);

    const result = useMemo(() => {
        if (exps.some((exp) => exp.value === 'Blank')) return null;
        if (!expressionString) return null;
        if (!/^[0-9+\-*/.() ]+$/.test(expressionString)) return null;

        try {
            const value = Function(`"use strict"; return (${expressionString})`)();
            if (typeof value !== 'number' || !Number.isFinite(value)) return null;
            return value;
        } catch {
            return null;
        }
    }, [expressionString, exps]);

    return (
        <View className='w-full bg-white/30 p-4'>
            <View className='flex-row justify-between items-start gap-4'>
                <View className='flex-1 flex-row flex-wrap items-center'>
                    {exps.length === 0 ? (
                        <Text className='text-white/70 text-2xl'>0</Text>
                    ) : (
                        exps.map((exp, index) =>
                            exp.value === 'Blank' ? (
                                <Blank key={exp.id} blankIdx={index} />
                            ) : (
                                <Text key={exp.id} className='text-white text-4xl tracking-widest'>
                                    {String(exp.value)}
                                </Text>
                            ),
                        )
                    )}
                </View>

                {result !== null && (
                    <View className='items-end'>
                        <Text className='text-white/70 text-sm'>Result</Text>
                        <Text className='text-white text-3xl'>{String(result)}</Text>
                    </View>
                )}
            </View>

            <View className='mt-4 flex-row justify-end gap-2'>
                <Pressable className='px-3 py-2 rounded-md bg-btn' onPress={deleteLastExp}>
                    <Text className='text-white text-base'>DEL</Text>
                </Pressable>
                <Pressable className='px-3 py-2 rounded-md bg-red-500' onPress={clearExps}>
                    <Text className='text-white text-base'>AC</Text>
                </Pressable>
            </View>
        </View>
    );
}
