import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className="container" style={{ marginBottom: '20px' }}>
      <div className='row'>
        <div className='mx-auto'>
          <p style={{ fontWeight: 'bold' }}>{post.postItem}</p>
          <p style={{ fontWeight: 'bold' }}>Price: {post.price} VNĐ</p>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p style={{ fontWeight: 'bold' }}>Sender: {post.sender}</p>
        </div>
        <div className='col'>
          <p style={{ fontWeight: 'bold' }}>Recipient: {post.recipient}</p>
        </div>
        <div className='col'>
          <p style={{ fontWeight: 'bold' }}>Sender Email: {post.senderEmail}</p>
        </div>
      </div>
      <Link to={`/print/${post._id}`}>
        <button className="btn btn-primary" style={{ marginBottom: '20px' }}>In Hóa Đơn</button>
      </Link>
      <hr />
    </div>
  );
};

export default Post;
