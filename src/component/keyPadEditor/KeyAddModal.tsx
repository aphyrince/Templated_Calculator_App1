import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
    onSubmit: (name: string, value: number) => void;
}

export default function KeyAddModal({ onSubmit }: Props) {
    const [name, setName] = useState<string>('');
    const [value, setValue] = useState<number | null>(null);

    const handleChange = useCallback((data: string | number) => {
        if (typeof data === 'string') {
            setName(data);
        } else {
            setValue(data);
        }
    }, []);

    const handleSubmit = useCallback(() => {
        if (name === '' || value === null) return;
        onSubmit(name, value);
    }, [name, value, onSubmit]);

    return (
        <View style={styles.modal}>
            <Text>Add new Key</Text>
            <TextInput value={name} onChangeText={(txt) => handleChange(txt)} />
            <TextInput
                value={value?.toString() ?? ''}
                keyboardType='number-pad'
                onChangeText={(num) => {
                    Number.isInteger(Number(num));
                    setValue(Number(num));
                }}
            />
            <Button title='+' onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    modal: { display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: 16 },
    title: {},
    name: {},
    value: {},
    submitBtn: {},
});
