import { isBlankType } from '@/src/utils/isBlankType';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    token: Token;
}

export default function FuncRenderer({ token }: Props) {
    console.log('func Renderer! ', token);

    return (
        <View className='h-10'>
            <Text className='text-white text-3xl text-center leading-10'>
                {token.name + '('}
                {token.funcExps?.map((exp) => (isBlankType(exp) ? (exp.value === null ? 'ㅁ' : exp.value) : exp))}
                {')'}
            </Text>
        </View>
    );
}
