import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <>
    <div className="container" style={{marginBottom:'20px'}}>
        <div className='row'>
            <div className='mx-auto'>
                <p style={{fontWeight:'bold'}}>{post.postItem}</p>
            </div>
            
        </div>
        <div className='row'>
        <div className='col'>
                <p style={{fontWeight:'bold'}}>Sender: {post.sender}</p>
            </div>
            <div className='col'>
                <p style={{fontWeight:'bold'}}>Recipient: {post.recipient}</p>
            </div>
            <div className='col'>
                <p style={{fontWeight:'bold'}}>Sender Email: {post.senderEmail}</p>
            </div>
        </div>
        <hr/>
    </div>
</>

  )
}

export default Post