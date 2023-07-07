import React from 'react';
import {
  HiOutlineLightBulb,
  // HiOutlinePresentationChartBar,
} from 'react-icons/hi';
import { FaAngleDown, FaPencilAlt } from 'react-icons/fa';
import {
  TbTrashFilled,
  TbCalendarPlus,
  TbCalendarOff,
  TbCalendarHeart,
} from 'react-icons/tb';

// FaAngleUp
// import { FcFullTrash } from 'react-icons/fc';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import './App.css';

function App() {
  return (
    <section className="container">
      <section className="sidebar">
        <header>
          <h1>Listify Web</h1>
          <h2>Task Board</h2>
        </header>
        <section className="filterOptions">
          <span className="option selected">All</span>
          <span className="option">ICC2</span>
          <span className="option">Calc 2</span>
          <span className="option">Tutoria</span>
          <span className="option">Codelabs</span>
          <span className="option">Estágio</span>
        </section>
        <section className="roadMap">
          <h1>Roadmap</h1>
          <div>
            <div>
              <div>
                <div
                  className="circle"
                  style={{ backgroundColor: '#F49E85' }}
                />
                <h2>In-Progress</h2>
              </div>
              <h3>2</h3>
            </div>

            <div>
              <div>
                <div
                  className="circle"
                  style={{ backgroundColor: '#DF4E85' }}
                />
                <h2>Due late</h2>
              </div>
              <h3>10</h3>
            </div>

            <div>
              <div>
                <div
                  className="circle"
                  style={{ backgroundColor: '#7FC9FB' }}
                />
                <h2>Completed</h2>
              </div>
              <h3>7</h3>
            </div>
          </div>
        </section>
        <section className="filterByOwner">
          <h1>Owners</h1>
          <div
            style={{
              backgroundImage: 'url("https://i.ibb.co/C8jswQC/rudinei.jpg"',
            }}
          />
        </section>
      </section>

      <section className="main">
        <div className="topbar">
          <div className="topbarContent">
            <section>
              <HiOutlineLightBulb style={{ color: '#FEFEFE' }} size={25} />
              <h1>6 Tasks to be done</h1>
              <div>
                <h2>Sort by: </h2>
                <h3>Most Upvotes</h3>
                <FaAngleDown style={{ color: '#FEFEFE' }} size={10} />
              </div>
            </section>
            <div className="addTaskButton">+ Add Task</div>
          </div>
          <div className="topbarProgress" />
        </div>
        <div className="taskList">
          <section>
            <h1>Due late [10]</h1>
          </section>

          <section>
            <h1>Completed [7]</h1>
            <div>
              <div className="taskBar" style={{ backgroundColor: '#7FC9FB' }} />
              <div className="taskInfo">
                <div className="taskGeneralInfo">
                  <div className="taskTypeTitle">
                    <BsFillPatchCheckFill color="#7FC9FB" />
                    <h3>Completed</h3>
                  </div>
                  <div className="taskEditOptions">
                    <FaPencilAlt color="#7FC9FB" />
                    <TbTrashFilled color="#7FC9FB" size={18} />
                  </div>
                </div>
                <div className="taskDesc">
                  <h1>Add tags for solutions</h1>
                  <h2>
                    Easier to search for solutions based on a specific stack.
                  </h2>
                  <div className="taskDates">
                    <div>
                      <TbCalendarPlus color="#3B4374" />
                      <h3>12/03/2023</h3>
                    </div>
                    <div>
                      <TbCalendarOff color="#3B4374" />
                      <h3>12/03/2023</h3>
                    </div>
                    <div>
                      <TbCalendarHeart color="#3B4374" />
                      <h3>12/03/2023</h3>
                    </div>
                  </div>
                </div>
                <div className="taskCategory">
                  <span className="option">ICC2</span>
                  <span className="option">Estágio</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
}

export default App;
