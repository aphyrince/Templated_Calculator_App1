import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
    initialType: KeyItem['type'];
    onChange: (type: KeyItem['type']) => void;
}

const activeColor = '#FF8D28';
const inactiveColor = '#757575';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DURATION = 200;

export default function TypeSelector({ initialType, onChange }: Props) {
    const [type, setType] = useState(initialType);

    const constBtnColor = useSharedValue(initialType === 'Constant' ? activeColor : inactiveColor);
    const funcBtnColor = useSharedValue(initialType === 'Function' ? activeColor : inactiveColor);

    const constBtnAnimatedStyle = useAnimatedStyle(() => {
        return {
            borderColor: constBtnColor.value,
            color: constBtnColor.value,
        };
    });
    const funcBtnAnimatedStyle = useAnimatedStyle(() => {
        return {
            borderColor: funcBtnColor.value,
            color: funcBtnColor.value,
        };
    });

    const handlePress = useCallback(
        (type: KeyItem['type']) => {
            setType(type);
            onChange(type);
        },
        [onChange],
    );

    useEffect(() => {
        if (type === 'Constant') {
            constBtnColor.value = withTiming(activeColor, { duration: DURATION });
            funcBtnColor.value = withTiming(inactiveColor, { duration: DURATION });
        } else {
            constBtnColor.value = withTiming(inactiveColor, { duration: DURATION });
            funcBtnColor.value = withTiming(activeColor, { duration: DURATION });
        }
    }, [type]);

    return (
        <View className='flex-row justify-start items-center gap-4 px-4 py-2 rounded-md w-[92%] bg-third'>
            <Text className='text-white text-2xl font-semibold w-24'>Type</Text>
            <View className='flex-1 flex-row justify-between gap-4'>
                <AnimatedPressable onPress={() => handlePress('Constant')} style={[styles.btn, constBtnAnimatedStyle]}>
                    <Animated.Text style={[styles.text, constBtnAnimatedStyle]}>Constant</Animated.Text>
                </AnimatedPressable>
                <AnimatedPressable onPress={() => handlePress('Function')} style={[styles.btn, funcBtnAnimatedStyle]}>
                    <Animated.Text style={[styles.text, funcBtnAnimatedStyle]}>Function</Animated.Text>
                </AnimatedPressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        borderWidth: 2,
    },
    text: {
        margin: 'auto',
        fontSize: 18,
        lineHeight: 28,
    },
});
