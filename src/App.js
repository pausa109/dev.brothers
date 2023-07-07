import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InitialPage from './components/InitialPage';
import NewTask from './components/NewTask';
import './App.css';

function App() {
  const categoryListStatic = [
    { name: 'All', selected: true },
    { name: 'ICC2', selected: true },
    { name: 'Calc 2', selected: false },
    { name: 'Tutoria', selected: false },
    { name: 'Codelabs', selected: false },
    { name: 'Estágio', selected: false },
  ];

  const categoryCountStatic = [
    { category: 'In-Progress', count: 0, color: '#F49E85' },
    { category: 'Due late', count: 0, color: '#DF4E85' },
    { category: 'Completed', count: 0, color: '#7FC9FB' },
  ];

  const ownerListStatic = [
    { name: 'Rudinei Goularte', url: 'https://i.ibb.co/C8jswQC/rudinei.jpg' },
  ];

  const [categoryList] = useState(categoryListStatic);
  const [categoryCount, setCategoryCount] = useState(() => {
    const savedCategoryCount = JSON.parse(localStorage.getItem('categoryCount'));
    return savedCategoryCount || categoryCountStatic;
  });
  
  const [ownerList] = useState(ownerListStatic);
  const [tasksData, setTasksData] = useState(JSON.parse(localStorage.getItem('tasksData')) || []);
  const [webStage, setWebStage] = useState(0);

  const increaseCategoryCount = (taskType) => {
    setCategoryCount((prevCounts) =>
      prevCounts.map((item) =>
        item.category === taskType ? { ...item, count: item.count + 1 } : item
      )
    );
  };
  
  const decreaseCategoryCount = (taskType) => {
    setCategoryCount((prevCounts) =>
      prevCounts.map((item) =>
        item.category === taskType ? { ...item, count: item.count - 1 } : item
      )
    );
  };

  const calcularSomaCount = () => {
    let soma = 0;
    categoryCount.forEach((elemento) => {
      soma += elemento.category !== 'Completed' ? elemento.count : 0;
    });
    return soma;
  };

  const [newTask, setTask] = useState({
    id: uuidv4(),
    title: '',
    desc: '',
    category: [],
    taskType: '',
    owner: { name: '', photoUrl: '' },
    dates: [
      { type: 'createdDate', date: null, time: null },
      { type: 'deadlineDate', date: null, time: null },
      { type: 'finishDate', date: null, time: null },
    ],
    music: '',
  });

  const saveTasksToStorage = (tasks) => {
    localStorage.setItem('tasksData', JSON.stringify(tasks));
  };

  const updateTasksData = () => {
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10);
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const currentTime = `${hours}:${minutes}`;
    const createdDate = new Date(`${currentDate}T${currentTime}:00`);
    const deadlineDate = new Date(
      `${newTask.dates[1].date}T${newTask.dates[1].time}:00`
    );
    const updatedTask = {
      ...newTask,
      dates: newTask.dates.map((item) =>
        item.type === 'createdDate'
          ? {
              ...item,
              time: currentTime,
              date: currentDate,
            }
          : item
      ),
      taskType: createdDate > deadlineDate ? 'Due late' : 'In-Progress',
    };
  
    const updatedTasksData = [...tasksData, updatedTask];
    setTasksData(updatedTasksData);
  
    saveTasksToStorage(updatedTasksData);
  
    if (createdDate > deadlineDate) {
      increaseCategoryCount('Due late');
    } else {
      increaseCategoryCount('In-Progress');
    }
  
    setWebStage(0);
  };
  

  const deleteTask = (taskId, taskType) => {
    const newTasksData = tasksData.filter((task) => task.id !== taskId);
    decreaseCategoryCount(taskType);
    setTasksData(newTasksData);
    saveTasksToStorage(newTasksData);
  };

  const handleTaskTypeChange = (taskId) => {
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10);
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const currentTime = `${hours}:${minutes}`;

    setTasksData((prevState) =>
      prevState.map((task) => {
        if (task.id === taskId) {
          const previousTaskType = task.taskType;

          if (previousTaskType === 'Completed') {
            decreaseCategoryCount('Completed');
            increaseCategoryCount('In-Progress');
            return {
              ...task,
              taskType: 'In-Progress',
              dates: task.dates.map((item) =>
                item.type === 'finishDate'
                  ? {
                      ...item,
                      time: null,
                      date: null,
                    }
                  : item
              ),
            };
          }

          decreaseCategoryCount(previousTaskType);
          increaseCategoryCount('Completed');
          return {
            ...task,
            taskType: 'Completed',
            dates: task.dates.map((item) =>
              item.type === 'finishDate'
                ? {
                    ...item,
                    time: currentTime,
                    date: currentDate,
                  }
                : item
            ),
          };
        }
        return task;
      })
    );
  };

  useEffect(() => {
    const savedTasksData = localStorage.getItem('tasksData');
    if (savedTasksData) {
      setTasksData(JSON.parse(savedTasksData));
    }
  }, []);

  useEffect(() => {
    const savedCategoryCount = localStorage.getItem('categoryCount');
    if (savedCategoryCount) {
      setCategoryCount(JSON.parse(savedCategoryCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasksData', JSON.stringify(tasksData));
    localStorage.setItem('categoryCount', JSON.stringify(categoryCount));
  }, [tasksData, categoryCount]);
  

  useEffect(() => {
    const checkTaskStatus = () => {
      const now = new Date();
      setTasksData((prevState) =>
        prevState.map((task) => {
          const deadlineDateItem = task.dates.find((d) => d.type === 'deadlineDate');
          const deadlineDate = deadlineDateItem ? new Date(`${deadlineDateItem.date}T${deadlineDateItem.time}:00`) : null;
          if (deadlineDate && now > deadlineDate && task.taskType !== 'Completed') {
            return {
              ...task,
              taskType: 'Due late',
            };
          }
          return task;
        })
      );
    };
    checkTaskStatus();
  }, []);

  return (
    <div>
      {webStage === 0 ? (
        <InitialPage
          categoryList={categoryList}
          categoryCount={categoryCount}
          ownerList={ownerList}
          tasksData={tasksData}
          webStage={webStage}
          setWebStage={setWebStage}
          deleteTask={deleteTask}
          handleTaskTypeChange={handleTaskTypeChange}
          calcularSomaCount={calcularSomaCount}
        />
      ) : (
        <NewTask
          webStage={webStage}
          setWebStage={setWebStage}
          newTask={newTask}
          setTask={setTask}
          updateTasksData={updateTasksData}
        />
      )}
    </div>
  );
}

export default App;
