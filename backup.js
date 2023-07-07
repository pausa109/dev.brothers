import React from 'react';
import {
  HiOutlineLightBulb,
  HiOutlinePresentationChartBar,
} from 'react-icons/hi';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { FcFullTrash } from 'react-icons/fc';

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
          <div className="task">
            <div className="taskInfo">
              <div className="taskIcon">
                <FaAngleUp style={{ color: '#4D67E7' }} size={15} />
                <HiOutlinePresentationChartBar
                  style={{ color: '#4D67E7' }}
                  size={20}
                />
              </div>
              <div className="taskDesc">
                <div>
                  <h1>Add tags for solutions |</h1>
                  <div>
                    <div
                      className="circle"
                      style={{ backgroundColor: '#DF4E85' }}
                    />
                    <h2 style={{ color: '#DF4E85' }}>Due late</h2>
                  </div>
                </div>
                <h2>
                  Easier to search for solutions based on a specific stack.
                </h2>
                <span className="option">ICC2</span>
              </div>
            </div>
            <div className="taskChange">
              <h2>Created in 14/03/2023</h2>
              <FcFullTrash size={30} />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default App;


// .taskInfo {
//   display: flex;
//   align-items: flex-start;
//   gap: 35px;
// }

// .taskIcon {
//   background-color: #F2F5FE;
//   display: flex;
//   flex-direction: column;
//   border-radius: 10px;
//   padding: 10px 12px;
//   justify-content: center;
//   align-items: center;
// }

// .taskDesc {
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// }

// .taskDesc h1 {
//   color: #424A79;
//   font-size: 15px;
//   font-weight: 700;
// }

// .taskDesc h2 {
//   color: #9CA4BC;
//   font-size: 12px;
//   font-weight: 400;
// }

// .taskDesc span {
//   border-radius: 10px;
//   padding: 10px 15px;
//   align-self: flex-start;
//   margin-top: 10px;
// }

// .taskDesc div {
//   display: flex;
//   gap: 10px;
//   align-items: center;
// }

// .taskChange {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: end;
// }

// .taskChange h2 {
//   color: #9CA4BC;
//   font-size: 12px;
//   font-weight: 400;
// }
