import { useMutation } from '@apollo/react-hooks';
import   {  useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { REGISTER } from '../graphql/Mutations';
import { useAuth } from '../providers/AuthProvider';



export default function SignUp() {

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const [formValues, setFormValues] = useState<any>({});
    const [registerUser] = useMutation(REGISTER);

    const auth = useAuth();
    const navigate = useNavigate();

    const onFormChange = (e: any,) => {
        const name = e.target.name;
        const value = e.target.value;

        let values = formValues;
        values[name] = value;

        setFormValues(values);

    }

    const handleSignUp = async (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            return;
        }

        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());

        if (body.password !== body.confirm_password) {
            console.log("data", body)

            setErrorMessage("Password doesn't match");
            showErrorAlert(true)
            return;
        }

        const { data } = await registerUser({ variables: body });

        if (data.register.id != '') {
            auth.login(data.register);
            navigate("/")
        } else {
            setErrorMessage(data.register.message);
            showErrorAlert(true);
        }



    }

    const showErrorAlert = (showAlert: boolean) => {
        setHasError(showAlert);
    }
    return (
        <div>

            <Layout>
                <Container className='align-self-center '>

                    <div className="d-flex align-items-center justify-content-center  min-vh-100">
                        <div className="col-md-4">
                            <Card>
                                <Card.Header as="h5">Sign Up</Card.Header>
                                <Card.Body>
                                    <Alert variant="danger" onClose={() => showErrorAlert(false)} dismissible show={hasError}>
                                        {errorMessage}
                                    </Alert>
                                    <Form onSubmit={(e) => { handleSignUp(e) }}>
                                        <Form.Group className="mb-3" controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" name="first_name" placeholder="Enter your First Name" onChange={(e) => { onFormChange(e) }} required />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control name='last_name' onChange={(e) => { onFormChange(e) }} type="text" placeholder="Enter your Last Name" required />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control name='email' onChange={(e) => { onFormChange(e) }} type="email" placeholder="Enter Email" required />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name='password' onChange={(e) => { onFormChange(e) }} type="password" placeholder="Password" minLength={6} required />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control name='confirm_password' onChange={(e) => { onFormChange(e) }} type="password" placeholder="Confirm Password" required />
                                        </Form.Group>

                                        <div className="d-grid mt-4">
                                            <Button variant="primary" type="submit">
                                                Sign Up
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className='mt-4'>
                                        <Row>
                                            <Col><p> Already have an account?</p></Col>
                                            <Col md={4}><a href='/sign-in'>Sign In</a></Col>
                                        </Row>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Container>

            </Layout>

        </div>
    )
}
