import useKeyPadsStore from '@/src/hook/useKeyPadsStore';
import React, { useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

export default function KeyPadSelector() {
    const keyPads = useKeyPadsStore((state) => state.keyPads);
    const selectedKeyPadId = useKeyPadsStore((state) => state.selectedKeyPadId);
    const setSelectedKeyPadId = useKeyPadsStore((state) => state.setSelectedKeyPadId);
    const [localSelectedId, setLocalSelectedId] = useState<string | undefined>(selectedKeyPadId || keyPads[0]?.id);

    useEffect(() => {
        if (!selectedKeyPadId && keyPads.length > 0) {
            setSelectedKeyPadId(keyPads[0].id);
            setLocalSelectedId(keyPads[0].id);
            return;
        }

        if (selectedKeyPadId && !keyPads.some((keyPad) => keyPad.id === selectedKeyPadId) && keyPads.length > 0) {
            setSelectedKeyPadId(keyPads[0].id);
            setLocalSelectedId(keyPads[0].id);
        }
    }, [keyPads, selectedKeyPadId, setSelectedKeyPadId]);

    useEffect(() => {
        setLocalSelectedId(selectedKeyPadId);
    }, [selectedKeyPadId]);

    const effectiveSelectedId = localSelectedId ?? selectedKeyPadId;

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <View className='flex-1 h-full flex-row gap-4'>
                {keyPads.map((keyPad) => {
                    const isSelected = effectiveSelectedId === keyPad.id;

                    const handleSelect = () => {
                        setLocalSelectedId(keyPad.id);
                        setSelectedKeyPadId(keyPad.id);
                    };

                    if (Platform.OS === 'web') {
                        return (
                            <button
                                key={keyPad.id}
                                type='button'
                                onClick={handleSelect}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: isSelected ? '#f7c948' : '#f3f3f3',
                                    padding: 4,
                                    width: 64,
                                    height: 64,
                                    borderRadius: 8,
                                    border: '1px solid #d1d5db',
                                }}
                            >
                                <Text style={{ color: '#000000' }}>{keyPad.title}</Text>
                            </button>
                        );
                    }

                    return (
                        <TouchableOpacity
                            key={keyPad.id}
                            activeOpacity={0.8}
                            accessibilityRole='button'
                            onPress={handleSelect}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: isSelected ? '#f7c948' : '#f3f3f3',
                                padding: 4,
                                width: 64,
                                height: 64,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: '#000000' }}>{keyPad.title}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
