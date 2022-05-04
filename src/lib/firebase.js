// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Setup firebase
export const firebaseConfig = {
	apiKey: 'AIzaSyDF8NAKkGT9aJeJ6dvZOOpddUSzjdXRyiY',
	authDomain: 'mnwcw2.firebaseapp.com',
	projectId: 'mnwcw2',
	storageBucket: 'mnwcw2.appspot.com',
	messagingSenderId: '243637791844',
	appId: '1:243637791844:web:d16e96ed3b87413c05c371',
	measurementId: 'G-KZRKH3PC8G'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);