import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import NewTaskInitial from '../NewTaskInitial';
import NewTaskEnd from '../NewTaskEnd';

function NewTask({ webStage, setWebStage, newTask, setTask, updateTasksData }) {
  const [taskTitle, setTaskTitle] = useState('');

  const updateTaskTitle = (event) => {
    setTaskTitle(event.target.value);
    setTask({ ...newTask, title: event.target.value });
  };

  const [selectedItens, setSelectedItens] = useState([]);

  const updateSelectedItens = (event) => {
    setSelectedItens(event);
    const originalArray = event;
    const transformedArray = originalArray.map((item) => item.label);
    console.log(transformedArray);
    setTask({ ...newTask, category: transformedArray });
  };

  const [taskDesc, setTaskDesc] = useState('');

  const updateTaskDesc = (event) => {
    setTaskDesc(event.target.value);
    setTask({ ...newTask, desc: event.target.value });
  };

  const [newTaskStage, setNewTaskStage] = useState(0);

  const increaseNewTaskStage = () => {
    setNewTaskStage(newTaskStage + 1);
  };

  const decreaseNewTaskStage = () => {
    setNewTaskStage(newTaskStage - 1);
  };

  const [taskDeadlineDate, setTaskDeadlineDate] = useState('');

  const updateTaskDeadlineDate = (event) => {
    setTaskDeadlineDate(event.target.value);
    setTask({
      ...newTask,
      dates: newTask.dates.map((item) =>
        item.type === 'deadlineDate'
          ? { ...item, date: event.target.value }
          : item
      ),
    });
  };

  const [taskDeadlineTime, setTaskDeadlineTime] = useState('');

  const updateTaskDeadlineTime = (event) => {
    setTaskDeadlineTime(event.target.value);
    setTask({
      ...newTask,
      dates: newTask.dates.map((item) =>
        item.type === 'deadlineDate'
          ? { ...item, time: event.target.value }
          : item
      ),
    });
  };

  const [taskOwnerName, setTaskOwnerName] = useState('');

  const updateTaskOwnerName = (event) => {
    setTaskOwnerName(event.target.value);
    setTask({
      ...newTask,
      owner: { ...newTask.owner, name: event.target.value },
    });
  };

  const [ownerPhotoName, setOwnerPhotoName] = useState('');

  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files.length > 0) {
      const file = event.target.files[0];
      setOwnerPhotoName(file.name);
    }
  };

  const [taskMusic, setTaskMusic] = useState('');

  const updateTaskMusic = (event) => {
    setTaskMusic(event.target.value);
    setTask({ ...newTask, music: event.target.value });
    console.log(event.target.value);
  };

  const conferencia = () => {
    console.log(newTask);
  };

  return (
    <div>
      {newTaskStage === 0 ? (
        <NewTaskInitial
          webStage={webStage}
          setWebStage={setWebStage}
          taskTitle={taskTitle}
          updateTaskTitle={updateTaskTitle}
          selectedItens={selectedItens}
          updateSelectedItens={updateSelectedItens}
          taskDesc={taskDesc}
          updateTaskDesc={updateTaskDesc}
          increaseNewTaskStage={increaseNewTaskStage}
        />
      ) : (
        <NewTaskEnd
          decreaseNewTaskStage={decreaseNewTaskStage}
          taskDeadlineDate={taskDeadlineDate}
          updateTaskDeadlineDate={updateTaskDeadlineDate}
          taskDeadlineTime={taskDeadlineTime}
          updateTaskDeadlineTime={updateTaskDeadlineTime}
          taskOwnerName={taskOwnerName}
          updateTaskOwnerName={updateTaskOwnerName}
          ownerPhotoName={ownerPhotoName}
          handleFileChange={handleFileChange}
          taskMusic={taskMusic}
          updateTaskMusic={updateTaskMusic}
          conferencia={conferencia}
          updateTasksData={updateTasksData}
        />
      )}
    </div>
  );
}

NewTask.propTypes = {
  setWebStage: PropTypes.func.isRequired,
  webStage: PropTypes.number.isRequired,
  newTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    taskType: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      photoUrl: PropTypes.string.isRequired,
    }),
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
    dates: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
      })
    ).isRequired,
    music: PropTypes.string.isRequired,
  }).isRequired,
  setTask: PropTypes.func.isRequired,
  updateTasksData: PropTypes.func.isRequired,
};

export default NewTask;
