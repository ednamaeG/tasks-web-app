import {  useQuery,   } from '@apollo/react-hooks';
import  {   useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CreatedDate from '../components/CreatedDate';
 import Layout from '../components/Layout';
import { GET_TASK } from '../graphql/Queries';
import { ITask } from '../interfaces/ITask';


export default function Task() {
  const { id } = useParams();
  const{data}= useQuery(GET_TASK , {variables: {id:id}});

  const [task, setTask] = useState<ITask>();
  useEffect(() => {
     if(data){
      setTask(data.getTask);
     }
  }, [data])

  return (
    <div>
      <Layout>
        <Container className='mt-4'>
          <h4> {task?.note}</h4>
          <CreatedDate date={task?.date_created} />
        </Container>
      </Layout>
    </div>
  )
}
