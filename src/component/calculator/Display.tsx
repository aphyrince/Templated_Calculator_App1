import useDisplayStore from '@/src/hook/useDisplayStore';
import React from 'react';
import { Text, View } from 'react-native';
import Blank from './Blank';

export default function Display() {
    const exps = useDisplayStore((s) => s.exps);

    const renderExpValue = (exp: Expression, index: number) => {
        if (exp.value === 'Blank') {
            return <Blank blankIdx={index} />;
        }

        return String(exp.value);
    };

    return (
        <View className='flex flex-row flex-wrap justify-start items-center w-full h-1/4 bg-white/30 p-4'>
            {exps.length === 0 ? (
                <Text className='text-white/70 text-2xl'>0</Text>
            ) : (
                exps.map((exp, index) => (
                    <Text key={exp.id} className='text-white text-4xl tracking-widest'>
                        {renderExpValue(exp, index)}
                    </Text>
                ))
            )}
        </View>
    );
}
