import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyPadEditorGridItem from './KeyPadEditorGridItem';
import { calcPosFromIdx } from './calcPosFromIdx';
import useGridStore from './useGridStore';

interface Props {
    data: Key_Type[];
}

export default function KeyPadEditorGrid({ data }: Props) {
    const ref = useRef<View>(null);
    const [gridMeta, setGridMeta] = useState<GridMeta>({
        COLUMN: 4,
        ITEM_SIZE: 80,
        ITEM_BORDER: 4,
        ITEM_COUNT: data.length,
        TOP: 0,
        LEFT: 0,
        WIDTH: 0,
        HEIGHT: 0,
    });
    const items = useGridStore((s) => s.items);
    const setItems = useGridStore((s) => s.setItems);

    const getLayout = () => {
        ref.current?.measure((x, y, width, height, pageX, pageY) => {
            setGridMeta((prev) => ({
                ...prev,
                WIDTH: width,
                HEIGHT: height,
                TOP: pageY,
                LEFT: pageX,
            }));
        });
    };

    useEffect(() => {
        const initialItems = data.map((value, idx) => ({
            id: value.id,
            value,
            idx,
            ...calcPosFromIdx(idx, gridMeta),
        }));
        setItems(initialItems);
    }, [gridMeta, data, setItems]);

    return (
        <GestureHandlerRootView>
            <View
                ref={ref}
                onLayout={getLayout}
                style={{
                    position: 'relative',
                    width: gridMeta.COLUMN * gridMeta.ITEM_SIZE,
                    height: '100%',
                    backgroundColor: 'skyblue',
                }}
            >
                {items.map((item) => (
                    <KeyPadEditorGridItem key={item.id} item={item} meta={gridMeta} />
                ))}
            </View>
        </GestureHandlerRootView>
    );
}
