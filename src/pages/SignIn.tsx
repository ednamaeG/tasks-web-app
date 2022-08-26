import { useMutation } from '@apollo/react-hooks';
import React, { Component, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../graphql/Mutations';

import { useAuth } from '../providers/AuthProvider';
export default function SignIn() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser] = useMutation(LOGIN);

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleLogin(e:any) {
        e.preventDefault();
        const { data } = await loginUser({ variables: { email: email, password: password } });

        if (data.login.id != '') {
            console.log('login', data);
            auth.login(data.login)
            navigate('/');
        } else {
            setErrors(data.login.message);
        }


    }

    function setErrors(errorMessage: string) {
        setHasError(true);
        setErrorMessage(errorMessage);
    }

    return (
        <Container className='align-self-center'>
            <div className="d-flex align-items-center justify-content-center  min-vh-100">
                <div className="col-md-4">
                    {auth.user}
                    <Card>
                        <Card.Header as="h5">Sign In</Card.Header>
                        <Card.Body>
                            <Alert variant="danger" onClose={() => setHasError(false)} dismissible show={hasError}>
                                {errorMessage}
                            </Alert>
                            <Form  onSubmit={(e) => {handleLogin(e) }}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => { setEmail(e.target.value) }} />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                                </Form.Group>


                                <div className="d-grid" >
                                    <Button variant="primary"  type='submit'>
                                        Sign In
                                    </Button></div>
                            </Form>
                            <div className='mt-4'>
                                <Row>
                                    <Col><p>Don't have an account?</p></Col>
                                    <Col md={4}><a href='/sign-up'>Sign Up</a></Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>


                </div>
            </div>
        </Container>
    )
}

