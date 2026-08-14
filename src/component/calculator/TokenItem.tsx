import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    token: Token;
}

export default function TokenItem({ token }: Props) {
    return (
        <View>
            <Text>TokenItem</Text>
        </View>
    );
}
