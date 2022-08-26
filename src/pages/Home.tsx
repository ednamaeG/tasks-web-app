import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_TASKS } from '../graphql/Queries';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ITask } from '../interfaces/ITask';
import { CREATE_TASK, DELETE_TASK } from '../graphql/Mutations';
import { useAuth } from '../providers/AuthProvider';
import Header from '../components/Header';
import CreatedDate from '../components/CreatedDate';
import Layout from '../components/Layout';

export default function Home() {
    const auth = useAuth();
    const { loading, data } = useQuery(GET_USER_TASKS, {
        variables: {
            user_id: auth.user.id
        }
    });
    const [createUserTask] = useMutation(CREATE_TASK);
    const [deleteUserTask] = useMutation(DELETE_TASK);


    const [userTasks, setUserTasks] = useState<ITask[]>([]);
    const [newTaskText, setNewTaskText] = useState('');

    useEffect(() => {
        if (data) {
          
            setUserTasks(data.userTasks);
        }
    }, [data]);




    async function addTask() {
        const task: ITask = {
            note: newTaskText, user_id: auth.user.id
        };

        const { data } = await createUserTask({ variables: { note: task.note, user_id: task.user_id } });

        console.log("result", data.createTask)

        if (data.createTask) {
            let tasks = userTasks;
            userTasks.unshift(data.createTask)
            setUserTasks(tasks);
            updateText('')
        }


    }

    function updateText(text: string) {
        setNewTaskText(text);
    }

    async function deleteTask(id: any, index: number) {
        console.log(index)
        const { data } = await deleteUserTask({ variables: { id: id } });
        if (data.deleteTask === 'Success') {
            let tasks = userTasks.filter((item) => item.id !== id);
            setUserTasks(tasks);
        }

    }


    function GetTasks() {
        if (userTasks.length > 0) {
            return <ListGroup>
                {
                    userTasks.map((item, index) => (

                        <ListGroup.Item className="d-flex justify-content-between align-items-start" key={item.id}>
                            <Link to={{
                                pathname: '/task/' + item.id,
                            }} style={{ textDecoration: 'none', color: '#000' }}>
                                <div>
                                    <h4>{item.note}</h4>
                                    <CreatedDate date={item.date_created} />
                                </div>

                            </Link>

                            <div className='mt-2'><Button className='btn-danger' onClick={() => {
                                deleteTask(item.id, index);
                            }}>Delete</Button></div>

                        </ListGroup.Item>

                    ))
                }
            </ListGroup>
        } else {
            return <div>Nothing to Display</div>
        }
    }

    return (
        <div>
            <Layout>
                <Container className='mt-5'>
                    <h4>Welcome {auth.user.first_name}!</h4>
                    <Row className='p-4 mt-4 d-flex justify-content-center'>
                        <Col lg={10}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formNewTask">
                                    <Form.Control type="text" placeholder="Add a task..." value={newTaskText} onChange={(e) => updateText(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </Col>

                        <Col>
                            <Button className='btn-info' onClick={addTask}>Add</Button>
                        </Col>
                    </Row>

                    <h3>All Tasks</h3>
                    <GetTasks />


                </Container>
            </Layout>
        </div>

    )
}
