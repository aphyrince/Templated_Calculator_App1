import useDisplayStore from '@/src/hook/useDisplayStore';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ExpressionItem from './ExpressionItem';

type LayoutRect = { x: number; y: number; width: number; height: number };

export default function Expression() {
    const exps = useDisplayStore((s) => s.exps);
    const cursorIdx = useDisplayStore((s) => s.cursorIdx);
    const setCursorIdx = useDisplayStore((s) => s.setCursorIdx);
    const scrollViewRef = useRef<ScrollView | null>(null);
    const cursorPos = useSharedValue<LayoutRect>({ x: 0, y: 0, width: 2, height: 40 });
    const [itemLayouts, setItemLayouts] = useState<Record<string, LayoutRect>>({});

    const cursorAnimeStyle = useAnimatedStyle(() => ({
        top: cursorPos.value.y,
        left: cursorPos.value.x,
        width: cursorPos.value.width,
        height: cursorPos.value.height,
    }));

    const registerLayout = useCallback((id: string, layout: LayoutRect) => {
        setItemLayouts((prev) => {
            const existing = prev[id];
            if (
                existing?.x === layout.x &&
                existing?.y === layout.y &&
                existing?.width === layout.width &&
                existing?.height === layout.height
            ) {
                return prev;
            }
            return { ...prev, [id]: layout };
        });
    }, []);

    useEffect(() => {
        setItemLayouts((prev) => {
            const validIds = new Set(exps.map((exp) => exp.id));
            return Object.fromEntries(Object.entries(prev).filter(([id]) => validIds.has(id))) as Record<
                string,
                LayoutRect
            >;
        });
    }, [exps]);

    const getCursorLayout = useCallback(
        (nextCursorIdx: number): LayoutRect => {
            if (exps.length === 0) {
                return { x: 0, y: 0, width: 2, height: 40 };
            }

            if (nextCursorIdx === 0) {
                const firstExp = exps[0];
                const firstLayout = firstExp ? itemLayouts[firstExp.id] : undefined;
                return firstLayout
                    ? { x: firstLayout.x, y: firstLayout.y, width: 2, height: firstLayout.height }
                    : cursorPos.value;
            }

            const previousExp = exps[nextCursorIdx - 1];
            const previousLayout = previousExp ? itemLayouts[previousExp.id] : undefined;
            if (previousLayout) {
                return {
                    x: previousLayout.x + previousLayout.width,
                    y: previousLayout.y,
                    width: 2,
                    height: previousLayout.height,
                };
            }

            const fallbackExp = exps[nextCursorIdx] || exps[0];
            const fallbackLayout = fallbackExp ? itemLayouts[fallbackExp.id] : undefined;
            return fallbackLayout
                ? { x: fallbackLayout.x, y: fallbackLayout.y, width: 2, height: fallbackLayout.height }
                : cursorPos.value;
        },
        [exps, itemLayouts, cursorPos],
    );

    const moveCursorToIndex = useCallback(
        (nextCursorIdx: number) => {
            const nextLayout = getCursorLayout(nextCursorIdx);
            cursorPos.value = withTiming(nextLayout, { duration: 150 });
        },
        [cursorPos, getCursorLayout],
    );

    useEffect(() => {
        moveCursorToIndex(cursorIdx);
    }, [cursorIdx, itemLayouts, exps.length, moveCursorToIndex]);

    useEffect(() => {
        if (!scrollViewRef.current) return;
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [exps.length]);

    const handleItemPress = useCallback(
        (idx: number, layout: LayoutRect) => {
            setCursorIdx(idx + 1);
            if (layout.width && layout.height) {
                cursorPos.value = withTiming(
                    { x: layout.x + layout.width, y: layout.y, width: 2, height: layout.height },
                    { duration: 150 },
                );
            }
        },
        [cursorPos, setCursorIdx],
    );

    return (
        <ScrollView
            className='w-full p-2 h-full'
            ref={(node) => {
                if (node) scrollViewRef.current = node;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    position: 'relative',
                }}
            >
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            backgroundColor: 'orange',
                        },
                        cursorAnimeStyle,
                    ]}
                />
                {exps.map((exp, idx) => (
                    <ExpressionItem
                        key={exp.id}
                        exp={exp}
                        idx={idx}
                        onPress={handleItemPress}
                        onLayout={registerLayout}
                    />
                ))}
            </View>
        </ScrollView>
    );
}
