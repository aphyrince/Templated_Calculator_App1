import React from 'react';
import { FlatList, View } from 'react-native';
import Item from './Item';
import Setting from './Setting';

export default function Options() {
    return (
        <View className='flex flex-row justify-start items-center gap-1 w-full h-20 p-2 bg-third '>
            <FlatList data={[]} renderItem={Item}></FlatList>

            <Setting />
        </View>
    );
}
