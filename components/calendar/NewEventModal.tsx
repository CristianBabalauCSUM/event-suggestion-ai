import { StyleSheet, Text, View, Modal, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

type NewEventModalProps = {
    isOpen: boolean;
    closeModal: () => void;
};

export default function NewEventModal({ isOpen, closeModal }: NewEventModalProps) {
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
      duration: 60, // Fixed value as per your example
    };

    console.log('New event created:', newEvent);
    // Handle saving the event here (e.g., sending to server or updating state)
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
          <Text style={styles.modalTitle}>Create New Event</Text>

          {/* Event Title */}
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          {/* Event Description */}
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          {/* Event Location */}
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />

          {/* Event Start */}
          <TextInput
            style={styles.input}
            placeholder="Start (e.g. 2024-09-01T07:00:00)"
            value={start}
            onChangeText={setStart}
          />

          {/* Event End */}
          <TextInput
            style={styles.input}
            placeholder="End (e.g. 2024-09-01T08:00:00)"
            value={end}
            onChangeText={setEnd}
          />

          {/* Event Time */}
          <TextInput
            style={styles.input}
            placeholder="Time (e.g. 7:00 AM - 8:00 AM)"
            value={time}
            onChangeText={setTime}
          />

          {/* Save Button */}
          <Button title="Save Event" onPress={handleSave} />

          {/* Cancel Button */}
          <Button title="Cancel" onPress={closeModal} color="red" />
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