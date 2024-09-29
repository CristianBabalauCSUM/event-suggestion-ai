import { StyleSheet, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '../ThemedText';
import { EventData } from '@/lib/definitions';
import { formatTitleToId, getDurationInMinutes, isStartTimeBeforeEndTime } from '@/lib/utils/textUtils';
import { storeEventAsyncStorage } from '@/lib/utils/AsyncStorage';
import { captureMessage } from '@sentry/react-native';

type CreateEventModalProps = {
  date: string;
  isOpen: boolean;
  closeModal: () => void;
};

export default function CreateEventModal({ isOpen, closeModal, date }: CreateEventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');  
  const [errorCount, setErrorCount] = useState(0); 
  const now = new Date();

  const handleSave = async () => {
    setError('');

    if (!title || !start || !end || !location || !description) {
      captureMessage('Error: Event creation: Missing required fields', {
        level: 'error',
        extra: { title, start, end, location },
      });
      setError('Please fill in all required fields.');
      setErrorCount(prevCount => prevCount + 1);  
      return;
    }

    if (!start.match(/^\d{1,2}:\d{2}$/) || !end.match(/^\d{1,2}:\d{2}$/)) {
      captureMessage('Error: Event creation: Invalid time format', {
        level: 'error',
        extra: { start, end },
      });
      setError('Invalid time format. Please use HH:mm.');
      setErrorCount(prevCount => prevCount + 1);
      return;
    }

    if (!isStartTimeBeforeEndTime(start, end)) {
      captureMessage('Error: Event creation: Start time is after end time', {
        level: 'error',
        extra: { start, end },
      });
      setError('Start time must be before the end time.');
      setErrorCount(prevCount => prevCount + 1);
      return;
    }

    const duration = getDurationInMinutes(start, end);
    const startDate = date + 'T' + start;
    const endDate = date + 'T' + end;

    const newEvent: EventData = {
      title,
      description,
      location,
      start: startDate,
      end: endDate,
      duration: duration,
      time: start + ' - ' + end,
      date,
      type: ['personal'],
      image: require('@/assets/images/icon.png'),
    };

    const key = formatTitleToId(title);
    await storeEventAsyncStorage(key, newEvent);

    captureMessage('Action: Event creation: Saved event', {
      level: 'info',
      extra: { newEvent }
    });

    const timeTaken = new Date().getTime() - now.getTime();
    const timeTakenInSeconds = timeTaken / 1000;
    captureMessage('Action: Event creation: Time taken', {
      level: 'info',
      extra: { timeTakenInSeconds , errorCount},
    });

    setErrorCount(0);
    closeModal();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Create New Event | {date}</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Time (e.g. 7:00)"
            value={start}
            onChangeText={setStart}
          />
          <TextInput
            style={styles.input}
            placeholder="End Time (e.g. 8:00)"
            value={end}
            onChangeText={setEnd}
          />
           {error ? (
            <ThemedText style={styles.errorText}>{error}</ThemedText>  
          ) : null}
          <View>
            <TouchableOpacity onPress={handleSave} style={{ alignItems: 'center' }}>
              <ThemedText style={{ color: "blue" }}>Save Event</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal} style={{ alignItems: 'center' }}>
              <ThemedText style={{ color: "red" }}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>

         
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});