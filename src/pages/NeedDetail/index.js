import React, { useEffect, useState } from 'react';
import Firebase from '../../services/Firebase/firebase'

const NeedDetail = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [summary, setSummary] = useState('')
  const [details, setDetails] = useState('')
  const [created, setCreated] = useState('')

  const needId = props.computedMatch.params.id

  useEffect(() => {
    const asyncFunction = async () => {
      const { firstName, lastName, photoURL } = await Firebase.getUserByNeed(needId)
      setFirstName(firstName)
      setLastName(lastName)
      setPhotoURL(photoURL)
      const { summary, details, created } = await Firebase.getANeed(needId)
      setSummary(summary)
      setDetails(details)
      setCreated(created.toDate().toString().slice(0,21))
    }
    asyncFunction()
  }, [])

  return (
    firstName ? 
    <>
      <h1>{firstName} {lastName}</h1>
      <h3>{created}</h3>
      <p>summary: {summary}</p>
      <p>details: {details}</p>
    </>
    :
    <h1>You made it</h1>
  )
}

export default NeedDetail;