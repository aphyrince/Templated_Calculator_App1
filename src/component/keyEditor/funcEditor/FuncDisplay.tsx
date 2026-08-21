import { isBlankType } from '@/src/utils/isBlankType';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    exps: FuncExp[];
    onDelete: () => void;
}

export default function FuncDisplay({ exps, onDelete }: Props) {
    const scrollViewRef = useRef<ScrollView | null>(null);

    useEffect(() => {
        if (!scrollViewRef.current) return;
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [exps]);

    return (
        <View className='w-full gap-2 relative'>
            <Text className='text-white text-lg font-semibold'>Expression</Text>
            {/* Expression */}
            <ScrollView
                ref={(node) => {
                    if (node) scrollViewRef.current = node;
                }}
                horizontal={true}
                className=' bg-black px-3 py-2 pr-14 h-12 rounded-md items-center'
            >
                {exps.map((exp, idx) =>
                    isBlankType(exp) ? (
                        <View key={exp.id} className='w-4 h-6 bg-transparent border-2 border-white rounded-sm mx-0.5'>
                            <Text className='text-gray-400 text-center'>{exp.name}</Text>
                        </View>
                    ) : (
                        <Text className='text-white text-lg' key={idx}>
                            {exp}
                        </Text>
                    ),
                )}
            </ScrollView>
            <TouchableOpacity className='absolute bottom-3 right-3' onPress={onDelete}>
                <FontAwesome6 name='delete-left' size={24} color='orange' />
            </TouchableOpacity>
        </View>
    );
}
