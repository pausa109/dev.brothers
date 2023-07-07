import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineLightBulb } from 'react-icons/hi';
import SideBar from '../SideBar';
import TaskList from '../TaskList';
import './styles.css';

function InitialPage({
  categoryList,
  categoryCount,
  ownerList,
  tasksData,
  webStage,
  setWebStage,
  deleteTask,
  handleTaskTypeChange,
  calcularSomaCount,
}) {
  return (
    <section className="container">
      <SideBar
        categoryList={categoryList}
        categoryCount={categoryCount}
        ownerList={ownerList}
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
            tasksData={tasksData}
            deleteTask={deleteTask}
            handleTaskTypeChange={handleTaskTypeChange}
          />
        </div>
      </section>
    </section>
  );
}

InitialPage.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  categoryCount: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  ownerList: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
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
