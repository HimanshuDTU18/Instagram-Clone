import React from 'react'
import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'
import Button from '@mui/material/Button';
import './post.css';
import { Avatar } from '@mui/material';
import { Input } from '@mui/material';


function Post({ postId,user, username, caption, imageUrl }) {
    // const [comments, setComments] = useState([]);
    // const [comment, setComment] = useState([]);
 

    // const postComment = (event) => {
    //     event.preventDefault();
    //     if(postId){
    //     addDoc(collection (db,"posts",postId ,"comments" ),{
    //         text: comment,
    //         username: user,
            
    //     })
    // }
    //     setComment("");
        
    // }
     

    // useEffect(() => {
    //         getDocs(collection(db, 'posts', postId, 'comments')).then(snap => {
    //             snap.forEach(doc => {
                    
    //                 setComments(comments => [...comments, doc.data()]);

    //             });
    //         });
        
       

    // }, [postId]);

    return (
        <div className='post'>
            <div className="post_header">
                <Avatar className="post_avatar" src="static/images/avatar/2.jpg" alt={username} />
                <h3>{username}</h3>
            </div>
            <img className='post_image' src={imageUrl} alt="" />


            <h4 className='post_text'><strong>{username}</strong> {caption} </h4>
            {/* <div>
                {comments.map((comment)=>(
                        <p><b>{comment.username}</b>     {comment.text}</p>
                    ))}
                
            </div>

                    {user&&(
            <form className="post_commentBox">
                <Input className='post_input'
                    type='text'
                    placeholder='write comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button className="post_button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                > post </Button>
            </form>
                    )} */}

        </div>
    )
}

export default Post
