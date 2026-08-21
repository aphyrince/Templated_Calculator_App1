import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    token: Token;
}

export default function FuncRenderer({ token }: Props) {
    return (
        <View>
            <Text>FuncRenderer</Text>
        </View>
    );
}
