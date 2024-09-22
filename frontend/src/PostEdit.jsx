import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from './component/Message'
import Loader from './component/Loader'
import { listPostDetails, updatePost } from './actions/postActions'
import { POST_UPDATE_RESET } from './constants/postConstants'
import { Form,Table, Button, Row, Col, Container } from 'react-bootstrap'


const PostEdit = () => {
    const { id} = useParams()
    const postId = id

    const [name, setName] = useState('')
    const [senderEmail,setSenderEmail]= useState('')
    const [postItem, setPostItem] = useState('')
    const [sender, setSender] = useState('')
    const [recipient, setRecipient] = useState('')


    const dispatch = useDispatch()

    const postDetails = useSelector((state) => state.postDetails)
    const { loading, error, post } = postDetails

    const postUpdate = useSelector((state) => state.postUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = postUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: POST_UPDATE_RESET })
            window.location.href = '/admin/postlist'
        } else {
            if (!post.postItem || post._id !== postId) {
                dispatch(listPostDetails(postId))
            } else {
                setPostItem(post.postItem)
                setSender(post.sender)
                setRecipient(post.recipient)
            }
        }
    }, [dispatch, postId, post, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updatePost({
                _id: postId,
                postItem,
                sender,
                recipient,
                senderEmail
            })
        )
    }

    return (
        <>
            <Link to='/admin/postlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <h1>Edit Post</h1>
                        {loadingUpdate && <Loader />}
                        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant='danger'>{error}</Message>
                        ) : (
                            <Form onSubmit={submitHandler}>

                                <Form.Group controlId='postItem'>
                                    <Form.Label>Post Item</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter postItem'
                                        value={postItem}
                                        onChange={(e) => setPostItem(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='sender'>
                                    <Form.Label>Sender</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Sender'
                                        value={sender}
                                        onChange={(e) => setSender(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='recipient'>
                                    <Form.Label>Recipient</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter recipient'
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='senderEmail'>
                                    <Form.Label>Sender</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Sender Email'
                                        value={senderEmail}
                                        onChange={(e) => setSenderEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <Button type='submit' variant='primary'>
                                    Update
                                </Button>
                            </Form>
                        )}
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default PostEdit
