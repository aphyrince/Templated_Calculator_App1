import React from 'react';
import { View } from 'react-native';
import Item from './Item';

export default function Keyboard() {
    return (
        <View className='flex-1 w-full grid gap-2 p-2'>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
        </View>
    );
}
