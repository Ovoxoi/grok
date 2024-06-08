import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth;

const App: React.FC = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<firebase.default.User | null>(null);
  
    const onAuthStateChanged = (user: firebase.default.User | null) => {
      setUser(user);
      if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
      const
  


const RegisterScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = async () => {
      try {
        await auth().createUserWithEmailAndPassword(email, password);
        // Naviguer vers l'écran de connexion
      } catch (error) {
        console.error('Error registering:', error);
        // Afficher un message d'erreur
      }
    };
  
    return (
      <View>
        <TextInput value={email} onChangeText={setEmail} placeholder="Adresse e-mail" />
        <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry />
        <Button title="S'inscrire" onPress={handleRegister} />
      </View>
    );
  };
  