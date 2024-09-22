import React, { useEffect } from 'react'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './component/Message'
import Loader from './component/Loader'
import { Link } from 'react-router-dom'
import {
  listPosts,
  deletePost,
  createPost,
} from './actions/postActions'
import { POST_CREATE_RESET } from './constants/postConstants'


const PostManage = () => {

  const dispatch = useDispatch()

  const postList = useSelector((state) => state.postList)
  const { loading, error, posts } = postList

  const postDelete = useSelector((state) => state.postDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete

  const postCreate = useSelector((state) => state.postCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post: createdPost,
  } = postCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      window.location.href='/login'
    }

    if (successCreate) {
      window.location.href=`/admin/post/${createdPost._id}/edit`
    } else {
      dispatch(listPosts(''))
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdPost,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePost(id))
    }
  }

  const createPostHandler = () => {
    dispatch(createPost())
  }

  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1>Posts</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createPostHandler}>
            <i className='fas fa-plus'></i> Create Post
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>SENDER</th>
                <th>RECIPIENT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post._id}</td>
                  <td>{post.postItem}</td>
                  <td>{post.sender}</td>
                  <td>{post.recipient}</td>
                  <td>
                    <Link to={`/admin/post/${post._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      style={{backgroundColor:'red'}}
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(post._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  )
}

export default PostManage
