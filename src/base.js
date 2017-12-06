import Rebase from 're-base';
import firebase from 'firebase';

var app = firebase.initializeApp({
    apiKey: "AIzaSyAl5YLxEkGMcZA1P7rQLrQBGW5QuoKxvX4",
    authDomain: "logo-bank.firebaseapp.com",
    databaseURL: "https://logo-bank.firebaseio.com",
});

var base = Rebase.createClass(app.database());

export { app, base};