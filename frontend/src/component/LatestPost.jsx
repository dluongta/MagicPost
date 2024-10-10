import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Post from './Post';
import { listPosts } from '../actions/postActions';

const LatestPosts = () => {
  const { keyword } = useParams();
  const postList = useSelector((state) => state.postList);
  const { posts } = postList;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listPosts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1 className='text-center' style={{ fontWeight: 'bolder' }}>All latest posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </>
  );
};

export default LatestPosts;
