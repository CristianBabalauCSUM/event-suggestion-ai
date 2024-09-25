import { StyleSheet, Text, View, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '../ThemedText';

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
  const [time, setTime] = useState('');

  const handleSave = () => {
    const newEvent = {
      title,
      description,
      location,
      start,
      end,
      time,
      duration: 60,
    };

    console.log('New event created:', newEvent);
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
          <ThemedText style={styles.modalTitle}>Create New Event</ThemedText>
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
            placeholder="Start (e.g. 2024-09-01T07:00:00)"
            value={start}
            onChangeText={setStart}
          />
          <TextInput
            style={styles.input}
            placeholder="End (e.g. 2024-09-01T08:00:00)"
            value={end}
            onChangeText={setEnd}
          />
          <TextInput
            style={styles.input}
            placeholder="Time (e.g. 7:00 AM - 8:00 AM)"
            value={time}
            onChangeText={setTime}
          />

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
});