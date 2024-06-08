import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth } from 'firebase/app'; // Assurez-vous d'avoir installé le SDK Firebase et importé auth

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        // Naviguer vers l'écran d'accueil
      } catch (error) {
        console.error('Error logging in:', error);
        // Afficher un message d'erreur
      }
    };
  
    return (
      <View>
        <TextInput value={email} onChangeText={setEmail} placeholder="Adresse e-mail" />
        <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry />
        <Button title="Se connecter" onPress={handleLogin} />
      </View>
    );
  };
