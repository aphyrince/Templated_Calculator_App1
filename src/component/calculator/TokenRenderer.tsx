import { useDisplayStore } from '@/src/hook/useDisplayStore';
import { randomUUID } from 'expo-crypto';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type TokenRendererMeta = {
    width: number;
    itemWidth: number;
    column: number;
};

const ITEM_WIDTH = 16;

export default function TokenRenderer() {
    const tokens = useDisplayStore((s) => s.tokens);
    const scrollViewRef = useRef<ScrollView | null>(null);
    const layoutRef = useRef<View>(null);
    const [layout, setLayout] = useState<TokenRendererMeta>({
        width: 0,
        itemWidth: ITEM_WIDTH,
        column: 0,
    });
    const slots = Array.from({ length: 30 }, () => ({ id: randomUUID(), value: '' }));

    const getLayout = () => {
        layoutRef.current?.measure((x, y, width, height, pageX, pageY) => {
            console.log(`width : ${width} , itemWidth : ${ITEM_WIDTH}, column : ${Math.floor(width / ITEM_WIDTH)}`);

            setLayout({
                width,
                itemWidth: ITEM_WIDTH,
                column: Math.floor(width / ITEM_WIDTH),
            });
        });
    };

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
            <View ref={layoutRef} onLayout={getLayout} style={styles.content}>
                {slots.map((slot, idx) => (
                    <Text style={styles.slot} key={slot.id}>
                        {tokens.length > idx ? (tokens[idx].value ?? '') : ''}
                    </Text>
                ))}
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
    slot: {
        width: ITEM_WIDTH,
        height: 40,
        boxSizing: 'border',
        margin: 0,
        textAlign: 'center',
        lineHeight: 40,
        fontSize: 24,
        color: 'white',
    },
});
