import useDisplayStore from '@/src/hook/useDisplayStore';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Expression from './Expression';

export default function Display() {
    const exps = useDisplayStore((s) => s.exps);
    const cursorIdx = useDisplayStore((s) => s.cursorIdx);
    const setCursorIdx = useDisplayStore((s) => s.setCursorIdx);
    const excuteCache = useDisplayStore((s) => s.excuteCache);

    const [prevExcuteCache, setPrevExcuteCache] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    // const renderCursorGap = (pos: number) => (
    //     <Pressable
    //         key={`gap-${pos}`}
    //         onPress={() => setCursorIdx(pos)}
    //         className='items-center justify-center'
    //         style={{ minHeight: 40, minWidth: 16, paddingHorizontal: 2 }}
    //     >
    //         {cursorIdx === pos ? (
    //             <Text className='text-white text-4xl'>|</Text>
    //         ) : (
    //             <View style={{ width: 16, height: 36 }} />
    //         )}
    //     </Pressable>
    // );

    // const renderExpression = () => {
    //     if (exps.length === 0) {
    //         return (
    //             <View className='flex-row items-center gap-1 flex-wrap'>
    //                 {renderCursorGap(0)}
    //                 <Text className='text-white/70 text-2xl'>0</Text>
    //             </View>
    //         );
    //     }

    //     const tokens: React.ReactNode[] = [];
    //     exps.forEach((exp, index) => {
    //         tokens.push(renderCursorGap(index));
    //         if (exp.value === 'Blank') {
    //             tokens.push(
    //                 <View key={exp.id}>
    //                     <Blank blankIdx={index} />
    //                 </View>,
    //             );
    //         } else {
    //             tokens.push(
    //                 <Pressable key={exp.id} onPress={() => setCursorIdx(index + 1)}>
    //                     <Text className='text-white text-4xl tracking-widest'>{String(exp.value)}</Text>
    //                 </Pressable>,
    //             );
    //         }
    //     });
    //     tokens.push(renderCursorGap(exps.length));
    //     return <View className='flex-row flex-wrap  gap-1'>{tokens}</View>;
    // };

    useEffect(() => {
        if (excuteCache !== prevExcuteCache) {
            setPrevExcuteCache(excuteCache);
            setShowResult(true);
        } else {
            setShowResult(false);
        }
    }, [exps, excuteCache]);

    return (
        <View className='w-full h-[20%] bg-white/30  relative'>
            <Expression />

            {showResult && excuteCache !== null && (
                <View className='mt-3 items-end'>
                    <Text className='text-white/70 text-sm'>Result</Text>
                    <Text className='text-white text-2xl'>{String(excuteCache)}</Text>
                </View>
            )}
        </View>
    );
}
