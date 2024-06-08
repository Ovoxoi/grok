import firebase from 'react-native-firebase';

// Initialiser Firebase
firebase.initializeApp({
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DOMAIN',
  databaseURL: 'DATABASE_URL',
  projectId: 'PROJECT_ID',
  storageBucket: 'STORAGE_BUCKET',
  messagingSenderId: 'MESSAGING_SENDER_ID',
});

// Activer la synchronisation des données en mode hors ligne dans Firestore
const firestore = firebase.firestore();
firestore.enablePersistence();
