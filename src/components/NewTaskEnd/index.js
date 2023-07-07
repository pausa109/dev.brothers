import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { PiShootingStarLight } from 'react-icons/pi';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { TiCalendar } from 'react-icons/ti';
import { LuAlarmClock } from 'react-icons/lu';
import { IoIosImages } from 'react-icons/io';

function NewTaskEnd({
  decreaseNewTaskStage,
  taskDeadlineDate,
  updateTaskDeadlineDate,
  taskDeadlineTime,
  updateTaskDeadlineTime,
  taskOwnerName,
  updateTaskOwnerName,
  ownerPhotoName,
  handleFileChange,
  taskMusic,
  updateTaskMusic,
  updateTasksData,
}) {
  return (
    <section className="containerInitialPageEnd">
      <div
        className="toBackstarCircle"
        role="button"
        onClick={decreaseNewTaskStage}
        onKeyDown={decreaseNewTaskStage}
        tabIndex={0}
      >
        <LiaAngleLeftSolid size={10} />
        <h3>Be Back</h3>
      </div>
      <section className="mainInitialPageEnd">
        <div className="starCirclestarCircle">
          <PiShootingStarLight color="white" size={30} />
        </div>
        <h1>Create New Task</h1>
        <div className="timeField">
          <h2>Task Deadline</h2>
          <h3>Select the date you have to finish the task</h3>
          <div className="timeEditorField">
            <div className="dateContainer">
              <input
                type="date"
                onChange={updateTaskDeadlineDate}
                value={taskDeadlineDate}
              />
              <div className="dateIcon">
                <TiCalendar color="white" />
              </div>
              <div className="dateBackground" />
            </div>
            <div className="timeContainer">
              <input
                type="time"
                value={taskDeadlineTime}
                onChange={updateTaskDeadlineTime}
              />
              <div className="timeIcon">
                <LuAlarmClock color="white" size={13} />
              </div>
              <div className="timeBackground" />
            </div>
          </div>
        </div>
        <div className="ownerNameField">
          <h2>Task Owner Name (optional)</h2>
          <h3>Select the date you have to finish the task</h3>
          <div className="ownerNameContainer">
            <input
              type="text"
              value={taskOwnerName}
              onChange={updateTaskOwnerName}
            />
            <h3>@</h3>
          </div>
        </div>
        <div className="ownerPhotoField">
          <h2>Task Owner Photo (optional)</h2>
          <h3>Select the date you have to finish the task</h3>
          <div className="sendFileContainer">
            <div className="sendTitle">
              <IoIosImages size={40} color="#373E68" />
              <h3>
                {ownerPhotoName === '' ? 'Drag and drop' : ownerPhotoName}
              </h3>
            </div>
            <input
              type="hidden"
              name="MAX_FILE_SIZE"
              value="4194304"
              className="sendFileButton"
            />
            <input
              type="file"
              className="sendFileButton"
              accept="image/*"
              multiple={false}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="spotifyField">
          <div className="spotifyHeader">
            <div className="spotifyIcon" />
            <h2>Spotify Music (optional)</h2>
          </div>
          <h3>Add a link to a song that matches your assignment</h3>
          <input type="text" value={taskMusic} onChange={updateTaskMusic} />
        </div>
        <div
          className="buttonField"
          style={{
            display:
              taskDeadlineDate !== '' && taskDeadlineTime !== ''
                ? 'initial'
                : 'none',
          }}
          role="button"
          onClick={updateTasksData}
          onKeyDown={updateTasksData}
          tabIndex={0}
        >
          <h3>Create Task</h3>
        </div>
      </section>
    </section>
  );
}

NewTaskEnd.propTypes = {
  decreaseNewTaskStage: PropTypes.func.isRequired,
  taskDeadlineDate: PropTypes.string.isRequired,
  updateTaskDeadlineDate: PropTypes.func.isRequired,
  taskDeadlineTime: PropTypes.string.isRequired,
  updateTaskDeadlineTime: PropTypes.func.isRequired,
  taskOwnerName: PropTypes.string.isRequired,
  updateTaskOwnerName: PropTypes.func.isRequired,
  ownerPhotoName: PropTypes.string.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  taskMusic: PropTypes.string.isRequired,
  updateTaskMusic: PropTypes.func.isRequired,
  updateTasksData: PropTypes.func.isRequired,
};

export default NewTaskEnd;
