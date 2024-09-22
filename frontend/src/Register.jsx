import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from './component/Message'
import { register } from './actions/userActions'


const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            window.location.href = redirect
        }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }
    return (
        <>
            <div class="form-container">

                <form action="" method="post" onSubmit={submitHandler}>
                    <h3>Sign Up</h3>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <input type="text" name="name" required placeholder="enter name" class="box" onChange={(e) => setName(e.target.value)} />
                    <input type="email" name="email" required placeholder="enter email" class="box" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" required placeholder="enter password" class="box"  onChange={(e) => setPassword(e.target.value)}/>
                    <input type="password" name="confirmPassword" required placeholder="confirm password" class="box"  onChange={(e) => setConfirmPassword(e.target.value)}/>

                    <input type="submit" name="submit" class="btn" value="register now" />
                    <p>Have an account? <a href="/login">Login</a></p>
                </form>

            </div>
        </>
    )
}

export default Register