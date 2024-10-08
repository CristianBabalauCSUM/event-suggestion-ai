import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '../ThemedText';
import { router } from 'expo-router';
import { EventData } from '@/lib/definitions';
import { storeEventAsyncStorage } from '@/lib/AsyncStorage';
import { formatTitleToId } from '@/lib/utils/textUtils';
import { captureMessage } from '@sentry/react-native';

type SingleEventProps = {
    event: EventData;
    date: string;
    closeModal: () => void; 
    timeTaken: () => void; 
};

export default function SuggestedEvent({ date, event, closeModal, timeTaken }: SingleEventProps) {
    const [response, setResponse] = useState<string | null>(null);

    const handleAccept = () => {
        const eventTitle = formatTitleToId(event.title);
        event.date = date;
        storeEventAsyncStorage(eventTitle, event);
        console.log(event);
        setResponse('accepted');
        captureMessage('Action: Suggested Event: Accepted event', { 
            level: 'info',
            extra: { event: JSON.stringify(event) },
         });
        timeTaken();
    };

    const handleReject = () => {
        setResponse('rejected');
        captureMessage('Action: Suggested Event: Rejected event', { 
            level: 'info',
            extra: { event: JSON.stringify(event) },
         });
        timeTaken();
    };

    const handleEventPress = () => {
        closeModal(); 
        router.push({
            pathname: `/(events)/eventpage`,
            params: { item: JSON.stringify(event), showButton: false.toString() },
        });
    };

    return (
        <View style={styles.eventBox}>
            <TouchableOpacity
                style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
                onPress={handleEventPress}  
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