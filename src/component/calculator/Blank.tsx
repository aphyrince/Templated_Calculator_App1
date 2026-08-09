import useDisplayStore from '@/src/hook/useDisplayStore';
import React, { useCallback, useState } from 'react';
import { TextInput, View } from 'react-native';

interface Props {
    blankIdx: number;
}

export default function Blank({ blankIdx }: Props) {
    const [value, setValue] = useState<string>('');
    const setBlankOfIdx = useDisplayStore((s) => s.setBlankOfIdx);

    const handleChangeText = useCallback(
        (txt: string) => {
            if (Number.isInteger(txt)) {
                setValue(txt);
                setBlankOfIdx(Number(txt), blankIdx);
            } else {
                setBlankOfIdx(null, blankIdx);
            }
        },
        [blankIdx, setBlankOfIdx],
    );

    return (
        <View>
            <TextInput keyboardType='number-pad' value={value} onChangeText={handleChangeText} />
        </View>
    );
}
