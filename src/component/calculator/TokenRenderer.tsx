import { useDisplayStore } from '@/src/hook/useDisplayStore';
import { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import TokenItem from './TokenItem';

export default function TokenRenderer() {
    const tokens = useDisplayStore((s) => s.tokens);
    const scrollViewRef = useRef<ScrollView | null>(null);
    // const [itemLayouts, setItemLayouts] = useState<Record<string, LayoutRect>>({});

    // const cursorAnimeStyle = useAnimatedStyle(() => ({
    //     top: cursor.pos.y,
    //     left: cursor.pos.x,
    //     width: cursor.pos.width,
    //     height: cursor.pos.height,
    // }));

    // const registerLayout = useCallback((id: string, layout: LayoutRect) => {
    //     setItemLayouts((prev) => {
    //         const existing = prev[id];
    //         if (
    //             existing?.x === layout.x &&
    //             existing?.y === layout.y &&
    //             existing?.width === layout.width &&
    //             existing?.height === layout.height
    //         ) {
    //             return prev;
    //         }
    //         return { ...prev, [id]: layout };
    //     });
    // }, []);

    // useEffect(() => {
    //     setItemLayouts((prev) => {
    //         const validIds = new Set(tokens.map((exp) => exp.id));
    //         return Object.fromEntries(Object.entries(prev).filter(([id]) => validIds.has(id))) as Record<
    //             string,
    //             LayoutRect
    //         >;
    //     });
    // }, [tokens]);

    // const getCursorLayout = useCallback(
    //     (nextCursorIdx: number): LayoutRect => {
    //         if (tokens.length === 0) {
    //             return { x: 0, y: 0, width: 2, height: 40 };
    //         }

    //         if (nextCursorIdx === 0) {
    //             const firstExp = tokens[0];
    //             const firstLayout = firstExp ? itemLayouts[firstExp.id] : undefined;
    //             return firstLayout
    //                 ? { x: firstLayout.x, y: firstLayout.y, width: 2, height: firstLayout.height }
    //                 : cursor.pos;
    //         }

    //         const previousExp = tokens[nextCursorIdx - 1];
    //         const previousLayout = previousExp ? itemLayouts[previousExp.id] : undefined;
    //         if (previousLayout) {
    //             return {
    //                 x: previousLayout.x + previousLayout.width,
    //                 y: previousLayout.y,
    //                 width: 2,
    //                 height: previousLayout.height,
    //             };
    //         }

    //         const fallbackExp = tokens[nextCursorIdx] || tokens[0];
    //         const fallbackLayout = fallbackExp ? itemLayouts[fallbackExp.id] : undefined;
    //         return fallbackLayout
    //             ? { x: fallbackLayout.x, y: fallbackLayout.y, width: 2, height: fallbackLayout.height }
    //             : cursor.pos;
    //     },
    //     [tokens, itemLayouts, cursor],
    // );

    // const moveCursorToIndex = useCallback(
    //     (nextCursorIdx: number) => {
    //         const nextLayout = getCursorLayout(nextCursorIdx);
    //         cursor.pos = withTiming(nextLayout, { duration: 150 });
    //     },
    //     [cursor, getCursorLayout],
    // );

    // useEffect(() => {
    //     moveCursorToIndex(cursorIdx);
    // }, [cursorIdx, itemLayouts, tokens.length, moveCursorToIndex]);

    // useEffect(() => {
    //     if (!scrollViewRef.current) return;
    //     scrollViewRef.current.scrollToEnd({ animated: true });
    // }, [tokens.length]);

    // const handleItemPress = useCallback(
    //     (idx: number, layout: LayoutRect) => {
    //         setCursorIdx(idx + 1);
    //         if (layout.width && layout.height) {
    //             cursorPos.value = withTiming(
    //                 { x: layout.x + layout.width, y: layout.y, width: 2, height: layout.height },
    //                 { duration: 150 },
    //             );
    //         }
    //     },
    //     [cursorPos, setCursorIdx],
    // );

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
                        // cursorAnimeStyle,
                    ]}
                />
                {tokens.map((token) => (
                    <TokenItem key={token.id} token={token} />
                ))}
            </View>
        </ScrollView>
    );
}
