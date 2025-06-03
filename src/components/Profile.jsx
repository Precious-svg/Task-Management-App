import React from 'react';
import { useNavigate, useState } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc} from "firebase/firestore"
import { db } from '../services/firebase';
import Loader from './Loader';

const Profile = () => { 
  const auth = getAuth();
  const user = auth.currentUser
  const navigate = useNavigate()
  const [profile, setProfile] = useState({name: "", bio: "", location: ""})
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        setProfile(docSnap.data());
        setLoading(false)
      }
    }

    if(user){
      fetchData()
    }
  }, [user])
  const handleChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDoc(doc(db, "users", user.uid), profile, {merge: true})
  }

  if (loading) return <Loader/>
  return (
    <div>
      <header>
        <h2>Profile</h2>
      </header>
      <main>
        <div>{profile.name}</div>
        <div>{profile.location}</div>
        <div>{profile.bio}</div>
        <form>
          <label for="fname">First Name:</label>
          <input type="text" id="fname" name="firstname" placeholder='Enter your first name...' value={firstName} onChange={handleChange}/>

          <label for="lname">Last Name:</label>
          <input type="text" id="lname" name="lastname" placeholder="Enter your last name" value={lastName} onChange={handleChange}/>

          <label for="email">Email:</label>
          <input type="email" id ="email" name="emailAddress" placeholder='youremail@example.com' value={email} onChange={handleChange}/>

          <input type="text" id="work" name="workdescription" placeholder="your job description" value={jobDescription} onChange={handleChange}/>
        </form> 
      </main>
    </div>
  )
}

export default Profile