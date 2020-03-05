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

  // getNeeds = async () => {
  //   const needs = []
  //   try {
  //     const querySnapshot = await this.database.collection('Needs').where('met', '==', false)
  //     .orderBy("created", 'desc').get()
  //     const { docs } = querySnapshot
  //     for(let i = 0; i < docs.length; i++){
  //       const { summary, created, userId } = docs[i].data()
  //       const user = await this.getUserById(userId)
  //       needs.push({
  //         id: docs[i].id,
  //         summary: summary, 
  //         created: created.toDate().toString().slice(0,21),
  //         user: user,
  //       })
  //     }
  //     return needs
  //   } catch(error) {

  //   }
  // }
  getFirstNeed = async () => {
    const querySnapshot = await this.database.collection('Needs').where('met', '==', false)
    .orderBy("created", 'desc').limit(1).get()
    return querySnapshot.docs[0]
  }

  getNeedsAfter = async (start, limit) => {
    const needs = []
    try {
      const querySnapshot = await this.database.collection('Needs').where('met', '==', false)
      .orderBy("created", 'desc').startAfter(start).limit(limit).get()
      const { docs } = querySnapshot
      for(let i = 0; i < docs.length; i++){
        const { summary, created, userId } = docs[i].data()
        const user = await this.getUserById(userId)
        needs.push({
          id: docs[i].id,
          summary: summary, 
          created: created.toDate().toString().slice(0,21),
          user: user,
        })
      }
      return [ needs, docs[limit-1] ]
    } catch(error) {

    }
  }

  getNeedsAt = async (start, limit) => {
    const needs = []
    try {
      const querySnapshot = await this.database.collection('Needs').where('met', '==', false)
      .orderBy("created", 'desc').startAt(start).limit(limit).get()
      const { docs } = querySnapshot
      for(let i = 0; i < docs.length; i++){
        const { summary, created, userId } = docs[i].data()
        const user = await this.getUserById(userId)
        needs.push({
          id: docs[i].id,
          summary: summary, 
          created: created.toDate().toString().slice(0,21),
          user: user,
        })
      }
      return [ needs, docs[limit-1] ]
    } catch(error) {

    }
  }

  getMyNeeds = async id => {
    const needs = []
    try {
      const querySnapshot = await this.database.collection('Needs').where('userId', '==', id).get()
      const { docs } = querySnapshot
      for(let i = 0; i < docs.length; i++){
        const { summary, created } = docs[i].data()
        needs.push({
          id: docs[i].id,
          summary: summary, 
          created: created.toDate().toString().slice(0,21),
        })
      }
      return needs
    } catch(error) {

    }
  }

  addMessage = async (UID, chatID, message) => {
    await this.database.collection('Chats').doc(chatID).update({
      [UID]: app.firestore.FieldValue.arrayUnion({
        message: message,
        created: app.firestore.Timestamp.now(),
      }),
    })
  }

  getChatById = async id => {
    const chat = await this.database.collection('Chats').doc(id).get()
    return chat.data()
  }


  createChat = async (id1, id2) => {
    const chatRef = await this.database.collection('Chats').add({
      [id1]: [],
      [id2]: [],
    })
    const chatId = chatRef.id
    this.database.collection('Users').doc(id1).update({
      chats: app.firestore.FieldValue.arrayUnion(chatId),
    })
    this.database.collection('Users').doc(id2).update({
      chats: app.firestore.FieldValue.arrayUnion(chatId),
    })
    return chatId
  }

  getUserById = async id => {
    const user = await this.database.collection('Users').doc(id).get()
    return user.data()
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
        needs: app.firestore.FieldValue.arrayUnion(doc.id),
      })
      return doc.id
    } catch (error) {

    }
  }

  updateNeed = async (id, summary, details) => {
    await this.database.collection('Needs').doc(id).update({
      summary: summary,
      details: details,
    })
  }

  deleteNeed = id => {
    this.database.collection('Needs').doc(id).delete()
  }

  getANeed = (id) => this.database.collection('Needs').doc(id).get()
    .then((doc) => doc.data())

  getUserByNeed = (id) =>  this.database.collection('Users')
    .where('needs', 'array-contains', id).limit(1).get()
    .then((doc) => doc.docs['0'] && doc.docs['0'].data())
    
  updateUserPhoto = async (id, url) => {
    await this.database.collection('Users').doc(id).update({
      photoURL: url,
    })
  }
}

const firebase = new Firebase();

export default firebase;
