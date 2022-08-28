import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './App.css';
import Post from './Post';
import { collection,getDocs } from 'firebase/firestore';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import ImageUpload from './ImageUpload';



const auth = getAuth();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const [id , setId] = useState([]);
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    const unsubscribe =
      auth.onAuthStateChanged(user => {
        if (user) {
          setUser(user);
          setUsername(user.displayName);
  

        } else {
          setUser(null);
        }
        return () => {
          unsubscribe();
        }
      })
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        username = user.username
        updateProfile(auth.currentUser, {
          displayName: username,
         
          
        })
        // ...
      }).catch((error) => {
        console.log(error);
      })

    setOpen(false);
    
  }

  const signout = () => {
    auth.signOut();
    setUsername(null)
  }

  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        username = user.username
        updateProfile(auth.currentUser, {
          displayName: username
        })
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  }




  useEffect(() => {
    getDocs(collection(db, 'posts')).then(snap => {

      snap.forEach(doc => {
        setId(doc.id);
        setPosts(posts => [...posts, doc.data()]);
       
      });
    });
  }, []);


  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <img className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="" />
          </center>
          
          <form className='app_signup'>
            <Input type="text" placeholder='Username' value={username}
              onChange={(e) => setUsername(e.target.value)} />


            <Input type="text" placeholder='email' value={email}
              onChange={(e) => setEmail(e.target.value)} />


            <Input type="password" placeholder='password' value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" onClick={signUp}  >Signup</Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <img className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="" />
          </center>
          

          <form className='app_signup'>

            <Input type="text" placeholder='email' value={email}
              onChange={(e) => setEmail(e.target.value)} />


            <Input type="password" placeholder='password' value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <Button type="submit" onClick={signIn}  >Signin</Button>
          </form>
        </Box>
      </Modal>

      <div className="app_header">
        <img
          className='app_headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='instagram' />
          <div> {user ? (<ImageUpload username={username} />) :
        (<h3>Login First to upload </h3>)} </div>
        {user ? (<Button onClick={signout}  >Logout</Button>) :
          (<div className="app_logincontainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
            <Button onClick={() => setOpen(true)}  >Signup</Button>
          </div>
          )}
      </div>

      <div className="app_posts">
        <div className="app_postsLeft">
          {
            posts.map(post => (
              
              <Post postId ={id} user ={username} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))

          }
        
      </div>
          </div>





      
    </div>
  );
}

export default App;
