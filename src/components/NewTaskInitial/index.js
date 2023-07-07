import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { PiShootingStarLight } from 'react-icons/pi';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import CreatableSelect from 'react-select/creatable';

function NewTaskInitial({
  webStage,
  setWebStage,
  taskTitle,
  updateTaskTitle,
  selectedItens,
  updateSelectedItens,
  taskDesc,
  updateTaskDesc,
  increaseNewTaskStage,
}) {
  const [options, setOptions] = useState([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]);

  const handleCreate = (inputValue) => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput.length > 0) {
      const newOption = { value: trimmedInput, label: trimmedInput };
      setOptions((currentOptions) => [...currentOptions, newOption]);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#4661E7' : 'white',
      ':active': {
        backgroundColor: state.isSelected ? '#4661E7' : 'white',
      },
      ':hover': {
        backgroundColor: '#F6F8FC',
      },
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: '#F6F8FC',
      borderRadius: '5px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#4661E7',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: '#4661E7',
        color: 'white',
      },
    }),
  };

  return (
    <section className="containerNewTask">
      <div
        className="toBack"
        role="button"
        onKeyPress={() => setWebStage(webStage - 1)}
        onClick={() => setWebStage(webStage - 1)}
        tabIndex={0}
      >
        <LiaAngleLeftSolid size={10} />
        <h3>Be Back</h3>
      </div>
      <section className="mainNewTask">
        <div className="starCircle">
          <PiShootingStarLight color="white" size={30} />
        </div>
        <h1>Create New Task</h1>
        <div className="titleField">
          <h2>Task Title</h2>
          <h3>Add a title to your task to easily identify it</h3>
          <input
            type="text"
            value={taskTitle}
            onChange={(event) => updateTaskTitle(event)}
          />
        </div>
        <div className="categoryField">
          <h2>Task Category</h2>
          <h3>
            Select or create one or more categories that your task falls into
          </h3>
          <CreatableSelect
            value={selectedItens}
            onChange={updateSelectedItens}
            isClearable
            isMulti
            options={options}
            onCreateOption={handleCreate}
            styles={customStyles}
            formatCreateLabel={(inputValue) =>
              `I want to create "${inputValue}"`
            }
            placeholder="Select categories..."
          />
        </div>
        <div className="descField">
          <h2>Task Description</h2>
          <h3>Add a title to your task to easily identify it</h3>
          <input type="text" value={taskDesc} onChange={updateTaskDesc} />
        </div>
        <div
          className="buttonField"
          style={{
            display:
              taskTitle !== '' && selectedItens.length !== 0 && taskDesc !== ''
                ? 'initial'
                : 'none',
          }}
          role="button"
          tabIndex={0}
          onKeyDown={increaseNewTaskStage}
          onClick={increaseNewTaskStage}
        >
          <h3>Next Step</h3>
        </div>
      </section>
    </section>
  );
}

NewTaskInitial.propTypes = {
  webStage: PropTypes.number.isRequired,
  setWebStage: PropTypes.func.isRequired,
  taskTitle: PropTypes.string.isRequired,
  updateTaskTitle: PropTypes.func.isRequired,
  selectedItens: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateSelectedItens: PropTypes.func.isRequired,
  taskDesc: PropTypes.string.isRequired,
  updateTaskDesc: PropTypes.func.isRequired,
  increaseNewTaskStage: PropTypes.func.isRequired,
};

export default NewTaskInitial;
