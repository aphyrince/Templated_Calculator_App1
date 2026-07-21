import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function List() {
    const router = useRouter();

    return (
        <View>
            <Text>List</Text>
            <Button
                title='editor'
                onPress={() => {
                    router.push('/list/editor');
                }}
            />
        </View>
    );
}
