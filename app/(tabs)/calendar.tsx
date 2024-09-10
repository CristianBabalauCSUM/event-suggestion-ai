import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCHEDULE } from '@/constants/data/Schedules';

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    const daysInMonth = 30;

    const renderCalendarDays = () => {
        let days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const dayString = `2024-09-${i < 10 ? `0${i}` : i}`;
            days.push(
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.dayBox,
                        selectedDate === dayString ? styles.selectedDay : null,
                    ]}
                    onPress={() => setSelectedDate(dayString)}
                >
                    <Text style={styles.dayText}>{i}</Text>
                </TouchableOpacity>
            );
        }
        return days;
    };

    const renderSchedules = () => {
        if (SCHEDULE[selectedDate]) {
            return SCHEDULE[selectedDate].map((event, index) => (
                <View key={index} style={styles.eventBox}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text>{event.time}</Text>
                    <Text>{event.location}</Text>
                </View>
            ));
        } else {
            return <Text style={styles.noEventText}>No Events</Text>;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Calendar Section */}
                <Text style={styles.headerText}>September 2024</Text>
                <View style={styles.calendarGrid}>{renderCalendarDays()}</View>

                {/* Event Section */}
                <View style={styles.eventsSection}>
                    <Text style={styles.eventHeader}>Events for {selectedDate || 'Select a Date'}</Text>
                    <ScrollView>{renderSchedules()}</ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',  // Ensure background color extends into the safe area
    },
    container: {
        flex: 1,
        padding: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dayBox: {
        width: 50,
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    selectedDay: {
        backgroundColor: '#87CEEB',
    },
    dayText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventsSection: {
        flex: 1,
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    eventHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    eventBox: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#f0f8ff',
        borderRadius: 5,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noEventText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default CalendarPage;