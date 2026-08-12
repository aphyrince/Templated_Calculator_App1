import React, { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';

type LayoutRect = { x: number; y: number; width: number; height: number };

interface Props {
    exp: Expression;
    idx: number;
    onPress: (idx: number, layout: LayoutRect) => void;
    onLayout: (id: string, layout: LayoutRect) => void;
}

export default function ExpressionItem({ exp, idx, onPress, onLayout }: Props) {
    const ref = useRef<View>(null);
    const [layout, setLayout] = useState<LayoutRect>({ x: 0, y: 0, width: 0, height: 0 });
    const pressedByMeasureRef = useRef(false);

    const handleLayout = useCallback(
        (event: LayoutChangeEvent) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            const nextLayout = { x, y, width, height };
            setLayout(nextLayout);
            onLayout(exp.id, nextLayout);
        },
        [exp.id, onLayout],
    );

    const handlePressIn = useCallback(() => {
        if (layout.width && layout.height) {
            return;
        }

        if (ref.current?.measure) {
            pressedByMeasureRef.current = true;
            ref.current.measure((x: number, y: number, width: number, height: number) => {
                const nextLayout = { x, y, width, height };
                setLayout(nextLayout);
                onLayout(exp.id, nextLayout);
                onPress(idx, nextLayout);
            });
        }
    }, [idx, layout, onLayout, onPress, exp.id]);

    const handlePress = useCallback(() => {
        if (pressedByMeasureRef.current) {
            pressedByMeasureRef.current = false;
            return;
        }

        onPress(idx, layout);
    }, [idx, layout, onPress]);

    return (
        <Pressable
            ref={ref}
            onLayout={handleLayout}
            onPressIn={handlePressIn}
            onPress={handlePress}
            className='mr-1 mb-1'
        >
            <Text className='text-white text-2xl'>{String(exp.value)}</Text>
        </Pressable>
    );
}
