import React, { useState } from 'react';
import Firebase from '../../services/Firebase/firebase';

function More({ currentUser }) {
  const [photoURL, setPhotoURL] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState ('')

  const addPhoto = async e => {
    e.preventDefault()
    try {
      await Firebase.updateUserPhoto(currentUser.id, photoURL)
    } catch(error) {
      setError('Sorry, there was an error adding your photo')
      setTimeout(() => {setError('')}, 3000)
    }
    setResponse('Your photo has been added')
    setTimeout(() => {setResponse('')}, 3000)
  }

  return (
    <>
      <h1>Add a Photo</h1>
      <form onSubmit={e => addPhoto(e)}>
        <input type="url" placeholder="Enter Your Photo URL" value={photoURL} onChange={e => setPhotoURL(e.target.value)}  />
        <button type='submit'>Submit</button>
      </form>
      {response && <p style={{ color: '#65bb48' }}>{response}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </> 
  );
}

export default More;
