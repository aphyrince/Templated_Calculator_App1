import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

interface Props {
    tokens: FuncToken[];
}

export default function FuncDisplay({ tokens }: Props) {
    const scrollViewRef = useRef<ScrollView | null>(null);

    useEffect(() => {
        if (!scrollViewRef.current) return;
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [tokens]);

    return (
        <View className='w-full gap-2'>
            <Text className='text-white text-lg font-semibold'>Expression</Text>
            {/* Expression */}
            <ScrollView
                ref={(node) => {
                    if (node) scrollViewRef.current = node;
                }}
                horizontal={true}
                className='w-full bg-black px-3 py-2 h-12 rounded-md items-center'
            >
                {tokens.map((token) =>
                    token.value === 'Blank' ? (
                        <View
                            key={token.id}
                            className='w-4 h-6 bg-transparent border-2 border-white rounded-sm mx-0.5'
                        />
                    ) : (
                        <Text className='text-white text-lg' key={token.id}>
                            {token.value}
                        </Text>
                    ),
                )}
            </ScrollView>
        </View>
    );
}
