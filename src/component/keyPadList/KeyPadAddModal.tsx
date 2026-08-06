import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const MODAL_HEIGHT = 500;

interface Props {
    show: boolean;
    onSubmit: (title: string) => void;
}

export default function KeyPadAddModal({ show, onSubmit }: Props) {
    const [title, setTitle] = useState('');

    const modalTranslate = useSharedValue(MODAL_HEIGHT);

    const modalAnimeStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: modalTranslate.value }],
    }));

    const handleChange = useCallback((text: string) => {
        setTitle(text);
    }, []);

    const handleSubmit = useCallback(() => {
        if (title.trim() === '') return;

        onSubmit(title.trim());
        setTitle('');
    }, [title, onSubmit]);

    useEffect(() => {
        if (show) {
            modalTranslate.value = withTiming(0);
        } else {
            modalTranslate.value = withTiming(MODAL_HEIGHT);
        }
    }, [show, modalTranslate]);

    return (
        <Animated.View style={[modalAnimeStyle, styles.modal]}>
            <Text style={styles.title}>Add new KeyPad</Text>
            <TextInput
                style={styles.input}
                value={title}
                placeholder='Input new KeyPad Title'
                onChangeText={handleChange}
            />
            <Pressable onPress={handleSubmit} style={styles.submitBtn}>
                <Ionicons name={'add'} size={40} />
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        gap: 16,
        flexDirection: 'column',
        width: '100%',
        height: MODAL_HEIGHT,
        padding: 16,
        backgroundColor: '#1E1E1E',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    title: {
        width: '100%',
        paddingHorizontal: 16,
        color: 'orange',
        fontSize: 24,
    },
    input: {
        width: '100%',
        padding: 16,
        color: 'white',
        fontSize: 20,
        borderColor: '#757575',
        borderWidth: 2,
        borderRadius: 12,
    },
    submitBtn: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 12,
    },
});
