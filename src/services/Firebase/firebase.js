import app from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.database = app.firestore()
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSignOut = () => this.auth.signOut();

  getAllUnmetNeeds = () =>
    this.database.collection('Needs').where('met', '==', false)
    .orderBy("created", 'desc')
    .get()
    .then((querySnapshot) => {
      const unmetNeeds = []
      querySnapshot.forEach(function(doc) {
        const { summary, created } = doc.data()
        unmetNeeds.push({
          id: doc.id,
          summary: summary, 
          created: created.toDate().toString().slice(0,21)
        })
      });
      return unmetNeeds
    })
    .catch(function(error) {
      console.log(error)
    });

  addANeed = (id, summary, details) => 
    this.database.collection('Needs').add({
      userId: id,
      summary: summary,
      details: details,
      met: false,
      created: app.firestore.Timestamp.now(),
    })
    .then((doc) => {
      this.database.collection('Users').doc(id).update({
        myNeeds: app.firestore.FieldValue.arrayUnion(doc.id),
      })
    })
    .catch(function(error) {
      
    });
    
}

const firebase = new Firebase();

export default firebase;
