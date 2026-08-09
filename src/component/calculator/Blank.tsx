import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function Blank() {
    const [value, setValue] = useState<number | null>(null);

    return (
        <View>
            <Text>{value || ''}</Text>
        </View>
    );
}
