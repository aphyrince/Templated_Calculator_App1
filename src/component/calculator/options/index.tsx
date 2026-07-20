import React from 'react';
import { View } from 'react-native';
import Item from './Item';
import Setting from './Setting';

export default function Options() {
    return (
        <View className='flex flex-row justify-start items-center gap-1 w-full h-22 p-1 border-b-2 border-amber-700/30'>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Setting />
        </View>
    );
}
