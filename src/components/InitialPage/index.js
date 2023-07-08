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
  selectedCategories,
  setSelectedCategories,
  selectedOwners,
  setSelectedOwners,
}) {
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
      const selectedOwnerUrls = selectedOwners
        .filter((owner) => owner.selected)
        .map((owner) => owner.url);
      newFilteredTasks = newFilteredTasks
        .filter((task) => task.owner !== null)
        .filter(
          (task) =>
            task.owner.photoUrl &&
            selectedOwnerUrls.includes(task.owner.photoUrl)
        );
    }
    setFilteredTasks(newFilteredTasks);
  }, [tasksData, selectedCategories, selectedOwners]);

  const categoryTotal = categoryCount.reduce(
    (accumulator, item) => accumulator + item.count,
    0
  );

  const inProgressTotal = categoryCount[0].count;
  const dueLateTotal = categoryCount[1].count;

  const segments = [];

  if (inProgressTotal !== 0) {
    const inProgressStart = 0;
    const inProgressEnd = (inProgressTotal * 100) / categoryTotal;
    segments.push({
      color: '#F49E85',
      start: inProgressStart,
      end: inProgressEnd - 2.5,
    });
  }

  if (dueLateTotal !== 0) {
    const dueLateStart =
      segments.length > 0 ? segments[segments.length - 1].end + 2.5 : 0;
    const dueLateEnd =
      dueLateStart + (dueLateTotal * 100) / categoryTotal - 2.5;
    segments.push({ color: '#DF4E85', start: dueLateStart, end: dueLateEnd });
  }

  const completedStart =
    segments.length > 0 ? segments[segments.length - 1].end + 2.5 : 0;
  segments.push({ color: '#7FC9FB', start: completedStart, end: 100 });

  const gradientParts = segments.flatMap((segment) => [
    `${segment.color} ${segment.start}%`,
    `${segment.color} ${segment.end}%`,
  ]);
  const style = {
    background: `linear-gradient(to right, ${gradientParts.join(', ')})`,
    opacity: categoryTotal === 0 ? 0 : 1,
  };

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
          <div className="topbarProgress" style={style} />
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
  setSelectedCategories: PropTypes.func.isRequired,
  selectedCategories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  selectedOwners: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setSelectedOwners: PropTypes.func.isRequired,
};

export default InitialPage;
