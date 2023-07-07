import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineLightBulb } from 'react-icons/hi';
import SideBar from '../SideBar';
import TaskList from '../TaskList';
import './styles.css';

function InitialPage({
  categoryCount,
  tasksData,
  webStage,
  setWebStage,
  deleteTask,
  handleTaskTypeChange,
  calcularSomaCount,
}) {
  const [selectedCategories, setSelectedCategories] = useState([
    { name: 'All', selected: true },
  ]);

  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const allCategories = tasksData.reduce((categories, task) => {
      task.category.forEach((category) => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
      return categories;
    }, []);
    setSelectedCategories([
      { name: 'All', selected: true },
      ...allCategories.map((category) => ({ name: category, selected: false })),
    ]);
  }, [tasksData]);

  const [selectedOwners, setSelectedOwners] = useState([]);

  useEffect(() => {
    const allOwners = tasksData.reduce((owners, task) => {
      if (
        task.owner &&
        !owners.find((owner) => owner.url === task.owner.photoUrl)
      ) {
        owners.push({
          url: task.owner.photoUrl,
          selected: false,
        });
      }
      return owners;
    }, []);
    setSelectedOwners(allOwners);
  }, [tasksData]);

  useEffect(() => {
    let newFilteredTasks = tasksData;

    const isAllSelected = selectedCategories.find(
      (category) => category.name === 'All' && category.selected
    );
    if (!isAllSelected) {
      const selectedCategoryNames = selectedCategories
        .filter((category) => category.selected)
        .map((category) => category.name);
      newFilteredTasks = newFilteredTasks.filter((task) =>
        task.category.some((category) =>
          selectedCategoryNames.includes(category)
        )
      );
    }
    if (selectedOwners.some((owner) => owner.selected)) {
      const selectedOwnerNames = selectedOwners
        .filter((owner) => owner.selected)
        .map((owner) => owner.name);
      newFilteredTasks = newFilteredTasks.filter(
        (task) => task.owner && selectedOwnerNames.includes(task.owner.name)
      );
    }
    setFilteredTasks(newFilteredTasks);
  }, [tasksData, selectedCategories, selectedOwners]);

  return (
    <section className="container">
      <SideBar
        selectedCategories={selectedCategories}
        categoryCount={categoryCount}
        setSelectedCategories={setSelectedCategories}
        selectedOwners={selectedOwners}
        setSelectedOwners={setSelectedOwners}
      />
      <section className="main">
        <div>
          <div className="topbarContent">
            <section>
              <HiOutlineLightBulb style={{ color: '#FEFEFE' }} size={25} />
              <h1>{calcularSomaCount()} Tasks to be done</h1>
            </section>
            <div
              className="addTaskButton"
              role="button"
              onClick={() => setWebStage(webStage + 1)}
              onKeyPress={() => setWebStage(webStage + 1)}
              tabIndex={0}
            >
              + Add Task
            </div>
          </div>
          <div className="topbarProgress" />
        </div>
        <div className="taskList">
          <TaskList
            categoryCount={categoryCount}
            tasksData={filteredTasks}
            deleteTask={deleteTask}
            handleTaskTypeChange={handleTaskTypeChange}
          />
        </div>
      </section>
    </section>
  );
}

InitialPage.propTypes = {
  categoryCount: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  tasksData: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  webStage: PropTypes.number.isRequired,
  setWebStage: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleTaskTypeChange: PropTypes.func.isRequired,
  calcularSomaCount: PropTypes.func.isRequired,
};

export default InitialPage;
