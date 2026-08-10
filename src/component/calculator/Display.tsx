import useDisplayStore from '@/src/hook/useDisplayStore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Blank from './Blank';

export default function Display() {
    const exps = useDisplayStore((s) => s.exps);
    const cursorIdx = useDisplayStore((s) => s.cursorIdx);
    const setCursorIdx = useDisplayStore((s) => s.setCursorIdx);
    const deleteLastExp = useDisplayStore((s) => s.deleteLastExp);
    const clearExps = useDisplayStore((s) => s.clearExps);
    const scrollViewRef = useRef<ScrollView | null>(null);
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        if (!scrollViewRef.current) return;
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [exps, cursorIdx]);

    const [showTopEllipsis, setShowTopEllipsis] = useState(false);

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

    const renderCursorGap = (pos: number) => (
        <Pressable
            key={`gap-${pos}`}
            onPress={() => setCursorIdx(pos)}
            className='items-center justify-center'
            style={{ minHeight: 40, minWidth: 16, paddingHorizontal: 4 }}
        >
            {cursorIdx === pos ? (
                <Text className='text-white text-4xl'>|</Text>
            ) : (
                <View style={{ width: 16, height: 36 }} />
            )}
        </Pressable>
    );

    const renderExpression = () => {
        if (exps.length === 0) {
            return (
                <View className='flex-row items-center gap-1 flex-wrap'>
                    {renderCursorGap(0)}
                    <Text className='text-white/70 text-2xl'>0</Text>
                </View>
            );
        }

        const tokens: React.ReactNode[] = [];
        exps.forEach((exp, index) => {
            tokens.push(renderCursorGap(index));
            if (exp.value === 'Blank') {
                tokens.push(
                    <View key={exp.id} className='px-1 py-1'>
                        <Blank blankIdx={index} />
                    </View>,
                );
            } else {
                tokens.push(
                    <Pressable key={exp.id} onPress={() => setCursorIdx(index + 1)} className='px-1 py-1'>
                        <Text className='text-white text-4xl tracking-widest'>{String(exp.value)}</Text>
                    </Pressable>,
                );
            }
        });
        tokens.push(renderCursorGap(exps.length));
        return <View className='flex-row flex-wrap items-center gap-1'>{tokens}</View>;
    };

    return (
        <View className='w-full bg-white/30 p-4 relative'>
            {showTopEllipsis && (
                <View className='absolute top-2 left-0 right-0 items-center z-10'>
                    <Text className='text-white text-xl'>...</Text>
                </View>
            )}

            <ScrollView
                ref={(node) => {
                    if (node) scrollViewRef.current = node;
                }}
                className='max-h-40'
                contentContainerStyle={{ paddingBottom: 8 }}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={(_, contentHeight) => setScrollHeight(contentHeight)}
                onScroll={({ nativeEvent }) => setShowTopEllipsis(nativeEvent.contentOffset.y > 2)}
                scrollEventThrottle={16}
            >
                {renderExpression()}
            </ScrollView>

            {result !== null && (
                <View className='mt-3 items-end'>
                    <Text className='text-white/70 text-sm'>Result</Text>
                    <Text className='text-white text-2xl'>{String(result)}</Text>
                </View>
            )}

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
