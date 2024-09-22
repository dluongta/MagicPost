import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from './actions/userActions'
import { listMyPosts, deletePost } from './actions/postActions'
import { USER_UPDATE_PROFILE_RESET } from './constants/userConstants'
import { useNavigate } from 'react-router-dom';
import Message from './component/Message'
import Loader from './component/Loader'
import { Link } from 'react-router-dom'
import Header from './component/Header'


const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const navigate = useNavigate();


  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const postListMy = useSelector((state) => state.postListMy)
  const { loading: loadingPosts, error: errorPosts, posts } = postListMy
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails(userInfo._id))
        dispatch(listMyPosts())
      } else {
        setName(user.name)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ _id: user._id, name, password }))
    }
  }


  return (
    <>
      <Header />
      <div className="content">
        <div className='container'>
          <Row>
            <Col md={3}>
              <h2 style={{fontWeight:'bold'}}>User Profile</h2>
              {message && <Message variant='danger'>{message}</Message>}
              { }
              {success && <Message variant='success'>Profile Updated</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Confirm password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type='submit' variant='primary'>
                    Update
                  </Button>
                </Form>
              )}
            </Col>
            <Col md={9}>
              <h2>My Posts</h2>
              {loadingPosts ? (
                <Loader />
              ) : errorPosts ? (
                <Message variant='danger'>{errorPosts}</Message>
              ) : (
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
                    {posts?.map((post) => (
                      <tr key={post._id}>
                        <td>{post._id}</td>
                        <td>{post.postItem}</td>
                        <td>{post.sender}</td>
                        <td>{post.recipient}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default ProfileScreen
