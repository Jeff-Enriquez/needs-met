import React, { useState } from 'react';
import Firebase from '../../services/Firebase/firebase';
import styles from './More.module.css';

function More({ currentUser }) {
  const [isPhotoInput, setIsPhotoInput] = useState(false)
  const [photoURL, setPhotoURL] = useState('')
  const [response, setResponse] = useState('')

  const addPhoto = async () => {
    await Firebase.updateUserPhoto(currentUser.id, photoURL)
    setResponse('Your photo has been added')
    setTimeout(() => {setResponse('')}, 3000)
  }

  return (
    <>
      <h1 onClick={() => setIsPhotoInput(!isPhotoInput)}>Add a Photo</h1>
      {isPhotoInput ?
        <>
        <input type="text" placeholder="Enter Your Photo URL" value={photoURL} onChange={e => setPhotoURL(e.target.value)}  />
        <button onClick={() => addPhoto()}>Submit</button>
        </>
        :
        <></>
      }
      {response && <p style={{ color: '#65bb48' }}>{response}</p>}
    </> 
  );
}

export default More;
