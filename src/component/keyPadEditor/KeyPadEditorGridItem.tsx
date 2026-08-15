import useEditorStore from '@/src/hook/useEditorStore';
import { moveKey } from '@/src/hook/useKeyPadsStore';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import useGridStore from '../../hook/useGridStore';
import { calcIndexFromPos } from './calcIndexFromPos';
import { calcPosFromIdx } from './calcPosFromIdx';

interface Props {
    item: GridItem;
    meta: GridMeta;
}

export default function KeyPadEditorGridItem({ item, meta }: Props) {
    const setEditorKeyId = useEditorStore((s) => s.setEditorKeyId);

    const pressed = useSharedValue<boolean>(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

    const gapIdx = useGridStore((s) => s.gapIdx);
    const draggingIdx = useGridStore((s) => s.draggingIdx);
    const setDraggingIdx = useGridStore((s) => s.setDraggingIdx);
    const setGapIdx = useGridStore((s) => s.setGapIdx);
    const moveItem = useGridStore((s) => s.moveItem);

    const style = useAnimatedStyle(() => {
        return {
            backgroundColor: pressed.value ? withTiming('#FF8D28') : withTiming('#D9D9D9'),
            transform: [
                { translateX: offsetX.value },
                { translateY: offsetY.value },
                { scale: pressed.value ? withTiming(1.1) : withTiming(1) },
            ],
        };
    });

    useEffect(() => {
        if (pressed.value) return;
        if (draggingIdx === null || gapIdx === null) {
            offsetX.value = withTiming(0);
            offsetY.value = withTiming(0);
            return;
        }

        let toIdx = item.idx;
        if (draggingIdx < item.idx) toIdx = item.idx - 1;
        if (gapIdx <= toIdx) toIdx += 1;

        if (toIdx !== item.idx) {
            const { x, y } = calcPosFromIdx(toIdx, meta);

            const changedX = item.x > x ? -(item.x - x) : x - item.x;
            const changedY = item.y > y ? -(item.y - y) : y - item.y;
            offsetX.value = withTiming(changedX);
            offsetY.value = withTiming(changedY);
        } else {
            offsetX.value = withTiming(0);
            offsetY.value = withTiming(0);
        }
    }, [pressed, gapIdx, offsetX, offsetY, draggingIdx]);

    useEffect(() => {
        offsetX.value = 0;
        offsetY.value = 0;
    }, [item.x, item.y]);

    const tap = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            scheduleOnRN(setEditorKeyId, item.id);
            scheduleOnRN(router.push, '/KeyEditor');
        });

    const pan = Gesture.Pan()
        .activateAfterLongPress(300)
        .onStart(() => {
            pressed.value = true;
            scheduleOnRN(setDraggingIdx, item.idx);
        })
        .onChange((event) => {
            offsetX.value = event.translationX;
            offsetY.value = event.translationY;
            const currPosIdx = calcIndexFromPos(event.absoluteX, event.absoluteY, meta);
            scheduleOnRN(setGapIdx, currPosIdx === item.idx ? null : currPosIdx);
        })
        .onFinalize(() => {
            offsetX.value = withTiming(0);
            offsetY.value = withTiming(0);
            if (gapIdx !== null) {
                scheduleOnRN(moveItem, item.idx, gapIdx, meta);
                scheduleOnRN(moveKey, item.keyItem, gapIdx);
            }
            scheduleOnRN(setGapIdx, null);
            pressed.value = false;
        });

    const gesture = Gesture.Exclusive(pan, tap);

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: item.y,
                        left: item.x,
                        width: meta.ITEM_SIZE - meta.ITEM_BORDER * 2,
                        height: meta.ITEM_SIZE - meta.ITEM_BORDER * 2,
                        margin: meta.ITEM_BORDER,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    style,
                ]}
            >
                <Text className='text-2xl'>{item.keyItem.name}</Text>
            </Animated.View>
        </GestureDetector>
    );
}
