import useDisplayStore from '@/src/hook/useDisplayStore';
import React from 'react';
import { Text, View } from 'react-native';
import Blank from './Blank';

export default function Display() {
    const exps = useDisplayStore((s) => s.exps);

    return (
        <View className='flex flex-row justify-start items-center w-full h-1/4 bg-white/30 p-4'>
            {exps.map((exp) => (
                <Text key={exp.id}>{exp.value === 'Blank' ? <Blank /> : exp.value}</Text>
            ))}

            {/* <View> 현재 입력 위치 따라다니는 커서 기능 추가하는 상상함.</View> */}
        </View>
    );
}
