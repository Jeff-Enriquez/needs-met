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

  getNeeds = async () => {
    const needs = []
    try {
      const querySnapshot = await this.database.collection('Needs').where('met', '==', false)
      .orderBy("created", 'desc').get()
      const { docs } = querySnapshot
      for(let i = 0; i < docs.length; i++){
        const { summary, created, userId } = docs[i].data()
        const photo = await this.getUserPhoto(userId)
        needs.push({
          id: docs[i].id,
          summary: summary, 
          created: created.toDate().toString().slice(0,21),
          photoURL: photo,
        })
      }
      return needs
    } catch(error) {

    }
  }

  getUserPhoto = async id => {
    const user = await this.database.collection('Users').doc(id).get()
    return user.data().photoURL
  }

  addANeed = async (id, summary, details) => {
    try{
      const doc = await this.database.collection('Needs').add({
        userId: id,
        summary: summary,
        details: details,
        met: false,
        created: app.firestore.Timestamp.now(),
      })
      await this.database.collection('Users').doc(id).update({
        myNeeds: app.firestore.FieldValue.arrayUnion(doc.id),
      })
      return doc.id
    } catch (error) {

    }
  }

  getANeed = (id) => this.database.collection('Needs').doc(id).get()
    .then((doc) => doc.data())

  getUserByNeed = (id) =>  this.database.collection('Users')
    .where('myNeeds', 'array-contains', id).limit(1).get()
    .then((doc) => doc.docs['0'] && doc.docs['0'].data())
    
  updateUserPhoto = async (id, url) => {
    await this.database.collection('Users').doc(id).update({
      photoURL: url,
    })
  }
}

const firebase = new Firebase();

export default firebase;
