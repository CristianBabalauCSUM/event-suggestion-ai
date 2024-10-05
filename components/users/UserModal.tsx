import { useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import * as Sentry from "@sentry/react-native";
import { ThemedText } from "../ThemedText";

type UserModalProps = {
    visible: boolean;
    onClose: () => void;
}

export function UserModal({ visible, onClose }: UserModalProps) {

    const [username, setUsername] = useState('');
    const [response, setResponse] = useState('');
    
    const save = () => {
        if (!username) {
            setResponse('Username cannot be empty');
            return;
        }
        Sentry.setUser({ username: username });
        setResponse('Username saved');
    }

    const close = () => {
        if (!username) {
            setResponse('Username cannot be empty');
            return;
        }
        onClose();
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <ThemedText style={styles.modalTitle}>Enter Username</ThemedText>
                    
                    <TextInput 
                        placeholder="Username" 
                        style={styles.input} 
                        placeholderTextColor="#888"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <ThemedText style={styles.responseText}>{response}</ThemedText>

                    <TouchableOpacity onPress={save} style={styles.saveButton}>
                        <ThemedText style={styles.saveButtonText}>Save</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={close} style={styles.closeButton}>
                        <ThemedText style={styles.closeButtonText}>Close</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
       </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    },
    modalContainer: {
        width: '85%',
        padding: 25,
        backgroundColor: '#fff',
        borderRadius: 20,  
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 24, 
        fontWeight: '600',  
        color: '#333',  
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50, 
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,  
        color: '#333',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',  
    },
    responseText: {
        textAlign: 'center',
        color: '#28A745',  
        marginBottom: 15,
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#28A745', 
        borderRadius: 10,
        paddingVertical: 12,
        marginBottom: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    closeButton: {
        backgroundColor: '#FF4D4D',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});