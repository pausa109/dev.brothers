import React from 'react';
import './App.css';
import { PiShootingStarLight } from 'react-icons/pi';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { TiCalendar } from 'react-icons/ti';
import { LuAlarmClock } from 'react-icons/lu';
import { IoIosImages } from 'react-icons/io';

function App() {
  return (
    <section className="container">
      <div className="toBack">
        <LiaAngleLeftSolid size={10} />
        <h3>Be Back</h3>
      </div>
      <section className="main">
        <div className="starCircle">
          <PiShootingStarLight color="white" size={30} />
        </div>
        <h1>Create New Task</h1>
        <div className="timeField">
          <h2>Task Deadline</h2>
          <h3>Select the date you have to finish the task</h3>
          <div className="timeEditorField">
            <div className="dateContainer">
              <input type="date" />
              <div className="dateIcon">
                <TiCalendar color="white" />
              </div>
              <div className="dateBackground" />
            </div>
            <div className="timeContainer">
              <input type="time" />
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
            <input type="text" />
            <h3>@</h3>
          </div>
        </div>
        <div className="ownerPhotoField">
          <h2>Task Owner Photo (optional)</h2>
          <h3>Select the date you have to finish the task</h3>
          <div className="sendFileContainer">
            <div className="sendTitle">
              <IoIosImages size={40} color="#373E68" />
              <h3>Drag and drop</h3>
            </div>
            <input
              type="hidden"
              name="MAX_FILE_SIZE"
              value="4194304"
              className="sendFileButton"
            />
            <input type="file" className="sendFileButton" />
          </div>
        </div>
        <div className="buttonField">
          <h3>Next Step</h3>
        </div>
      </section>
    </section>
  );
}

export default App;
