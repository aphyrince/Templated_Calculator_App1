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
            const sanitized = txt.trim();
            const numericValue = parseInt(sanitized, 10);
            const isValidNumber = sanitized !== '' && /^[0-9]+$/.test(sanitized);

            if (isValidNumber && Number.isInteger(numericValue)) {
                setValue(sanitized);
                setBlankOfIdx(numericValue, blankIdx);
            } else {
                setValue(sanitized);
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
