import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '../ThemedText';
import { router } from 'expo-router';
import { EventData } from '@/lib/definitions';
import { storeDataAsyncStorage } from '@/lib/utils/AsyncStorage';

type SingleEventProps = {
    event: EventData;
};

export default function SuggestedEvent({ event }: SingleEventProps) {
    const [response, setResponse] = useState<string | null>(null);

    const handleAccept = () => {
        storeDataAsyncStorage(event.title, event);
        setResponse('accepted');
    };

    const handleReject = () => {
        setResponse('rejected');
    };

    return (
        <View style={styles.eventBox}>
            <TouchableOpacity
                style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
                onPress={() => {
                    router.push({
                        pathname: `/(events)/eventpage`,
                        params: { item: JSON.stringify(event) },
                    });
                }}
            >
                <View>
                    <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                    <ThemedText>{event.time}</ThemedText>
                    <ThemedText>{event.location}</ThemedText>
                </View>
                <View>
                    <Image source={event.image} style={styles.image} />
                </View>
            </TouchableOpacity>

            {response === null ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                        <ThemedText style={styles.buttonText}>Accept</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                        <ThemedText style={styles.buttonText}>Reject</ThemedText>
                    </TouchableOpacity>
                </View>
            ) : (
                <ThemedText style={styles.responseText}>
                    {response === 'accepted' ? 'You have accepted this event.' : 'You have rejected this event.'}
                </ThemedText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    eventBox: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: "#f0f8ff",
        borderRadius: 5,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: "lightblue",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    rejectButton: {
        backgroundColor: '#F44336',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    responseText: {
        marginTop: 10,
        fontStyle: 'italic',
        color: '#555',
    },
});