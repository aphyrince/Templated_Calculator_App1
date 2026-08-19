import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

interface Props {
    tokens: FuncToken[];
}

export default function FunctionExpDisplay({ tokens }: Props) {
    const scrollViewRef = useRef<ScrollView | null>(null);

    useEffect(() => {
        if (!scrollViewRef.current) return;
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [tokens]);

    return (
        <ScrollView
            ref={(node) => {
                if (node) scrollViewRef.current = node;
            }}
        >
            <View>
                {tokens.map((token) => (
                    <Text key={token.id}>{token.value}</Text>
                ))}
            </View>
        </ScrollView>
    );
}
