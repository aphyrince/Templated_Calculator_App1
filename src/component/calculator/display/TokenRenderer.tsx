import { useDisplayStore } from '@/src/hook/useDisplayStore';
import { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FuncRenderer from './FuncRenderer';

const TOKEN_WIDTH = 16;

export default function TokenRenderer() {
    const tokens = useDisplayStore((s) => s.tokens);
    const scrollViewRef = useRef<ScrollView | null>(null);

    useEffect(() => {
        if (!scrollViewRef.current) return;
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [tokens.length]);

    return (
        <ScrollView
            className='w-full p-2 h-full'
            ref={(node) => {
                if (node) scrollViewRef.current = node;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
        >
            {/* <View style={styles.content}>
                {tokens.map((token, idx) => (
                    <Text style={styles.token} key={token.id}>
                        {token.value}
                    </Text>
                ))}
            </View> */}
            <View style={styles.content}>
                {tokens.map((token) =>
                    token.value === 'Function' ? (
                        <FuncRenderer key={token.id} token={token} />
                    ) : (
                        <Text style={styles.token} key={token.id}>
                            {token.value}
                        </Text>
                    ),
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 0,
    },
    token: {
        width: TOKEN_WIDTH,
        height: 40,
        boxSizing: 'border',
        margin: 0,
        textAlign: 'center',
        lineHeight: 40,
        fontSize: 28,
        color: 'white',
        fontFamily: 'GowunDodam',
    },
});
