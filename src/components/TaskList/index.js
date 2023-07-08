import React, { useState } from 'react';
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

  const [spotifySelect, setSpotifySelect] = useState('');

  const updateSpotifySelect = (id) => {
    if (spotifySelect === id) {
      setSpotifySelect('');
    } else {
      setSpotifySelect(id);
    }
  };

  const getSpotifyId = (url) => {
    const parts = url.split('/');
    const trackWithQuery = parts[parts.length - 1];
    const track = trackWithQuery.split('?')[0];
    return track;
};

  return (
    <>
      {categoryCount.map((taskCategory) => {
        const filteredTasks = tasksData.filter(
          (task) => task.taskType === taskCategory.category
        );

        return (
          <section key={taskCategory.category}>
            <h1>{`${taskCategory.category} [${taskCategory.count}]`}</h1>
            {filteredTasks.map((task) => (
              <div key={task.id}>
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
                            <div key={dateItem.type}>
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
                      <span key={item} className="option">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="taskFooter">
                    {task.owner !== null ? (
                      <div className="taskOwner">
                        <div
                          style={{
                            backgroundImage: `url(${task.owner.photoUrl})`,
                          }}
                        />
                        <h3>{task.owner.name}</h3>
                      </div>
                    ) : null}
                    {task.music !== '' ? (
                      <div>
                        <div
                          className="spotifyIcon"
                          role="button"
                          onClick={() => updateSpotifySelect(task.id)}
                          onKeyDown={() => updateSpotifySelect(task.id)}
                          tabIndex={0}
                          aria-label="spotifyPlayer"
                        />
                      </div>
                    ) : null}
                  </div>
                  {spotifySelect === task.id ? (
                    <div>
                      <iframe
                        title="spotifyMusic"
                        style={{ borderRadius: '12px' }}
                        src={`https://open.spotify.com/embed/track/${getSpotifyId(
                          task.music
                        )}?utm_source=generator&theme=0`}
                        width="90%"
                        height="100"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
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
