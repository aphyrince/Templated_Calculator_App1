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
        <View className='w-full gap-2'>
            <Text className='text-white text-lg font-semibold'>Expression</Text>
            <ScrollView
                ref={(node) => {
                    if (node) scrollViewRef.current = node;
                }}
            >
                <View className='h-10 bg-black p-2 rounded-md'>
                    {tokens.map((token) => (
                        <Text key={token.id}>{token.value}</Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
