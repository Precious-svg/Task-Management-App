import React from 'react';
import FullTaskCard from '../components/FullTaskCard';
import { useParams } from 'react-router-dom';

const TaskDetailsPage = () => {

    const { id } = useParams ();
  return (
    <>
      <FullTaskCard taskId={id}/>
    </>
  )
}

export default TaskDetailsPage