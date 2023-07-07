import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { FaPencilAlt } from 'react-icons/fa';
import {
  TbTrashFilled,
  TbCalendarPlus,
  TbCalendarOff,
  TbCalendarHeart,
} from 'react-icons/tb';
import { BsFillPatchCheckFill, BsPatchCheck } from 'react-icons/bs';

function TaskList({
  tasksData,
  categoryCount,
  deleteTask,
  handleTaskTypeChange,
}) {
  const datesIcon = {
    deadlineDate: <TbCalendarOff color="#3B4374" />,
    createdDate: <TbCalendarPlus color="#3B4374" />,
    finishDate: <TbCalendarHeart color="#3B4374" />,
  };

  return (
    <>
      {categoryCount.map((taskCategory) => {
        const filteredTasks = tasksData.filter(
          (task) => task.taskType === taskCategory.category
        );

        return (
          <section>
            <h1>{`${taskCategory.category} [${taskCategory.count}]`}</h1>
            {filteredTasks.map((task) => (
              <div>
                <div
                  className="taskBar"
                  style={{ backgroundColor: taskCategory.color }}
                />
                <div className="taskInfo">
                  <div className="taskGeneralInfo">
                    <div
                      className="taskTypeTitle"
                      role="button"
                      onKeyDown={() => handleTaskTypeChange(task.id)}
                      onClick={() => handleTaskTypeChange(task.id)}
                      tabIndex={0}
                    >
                      {taskCategory.category === 'Completed' ? (
                        <BsFillPatchCheckFill color={taskCategory.color} />
                      ) : (
                        <BsPatchCheck color={taskCategory.color} />
                      )}
                      <h3>{taskCategory.category}</h3>
                    </div>
                    <div className="taskEditOptions">
                      <FaPencilAlt color={taskCategory.color} />
                      <TbTrashFilled
                        color={taskCategory.color}
                        size={18}
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteTask(task.id, task.taskType);
                        }}
                      />
                    </div>
                  </div>
                  <div className="taskDesc">
                    <h1>{task.title}</h1>
                    <h2>{task.desc}</h2>
                    <div className="taskDates">
                      {task.dates.map((dateItem) => {
                        if (dateItem.date !== null) {
                          return (
                            <div>
                              {datesIcon[dateItem.type]}
                              <h3>{dateItem.date}</h3>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                  <div className="taskCategory">
                    {task.category.map((item) => (
                      <span className="option">{item}</span>
                    ))}
                  </div>
                  {task.owner !== null ? (
                    <div className="taskOwner">
                      <div
                        style={{
                          backgroundImage:
                            'url("https://i.ibb.co/C8jswQC/rudinei.jpg")',
                        }}
                      />
                      <h3>Rudinei Goularte</h3>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </>
  );
}

TaskList.propTypes = {
  tasksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
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
  categoryCount: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleTaskTypeChange: PropTypes.func.isRequired,
};

export default TaskList;
