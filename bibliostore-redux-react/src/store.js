import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';

//custom Reducer
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';


const fbConfig = {
  apiKey: "AIzaSyAlC87TD1gqH77xjkAUowX7ALIzpNlUf30",
  authDomain: "bibliostore-fed65.firebaseapp.com",
  databaseURL: "https://bibliostore-fed65.firebaseio.com",
  projectId: "bibliostore-fed65",
  storageBucket: "bibliostore-fed65.appspot.com",
  messagingSenderId: "1083161057085",
  appId: "1:1083161057085:web:4f7f0b31a367a733549754",
  measurementId: "G-GFE7SXKK9D"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  usuario: buscarUsuarioReducer
})
// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}
//console.log(rrfProps);

export default store;