import React, { useState } from 'react';
import './App.css';
import { PiShootingStarLight } from 'react-icons/pi';
import { LiaAngleLeftSolid } from 'react-icons/lia';
import CreatableSelect from 'react-select/creatable';

function App() {
  const [options, setOptions] = useState([
    { value: 'option1', label: 'Opção 1' },
    { value: 'option2', label: 'Opção 2' },
    { value: 'option3', label: 'Opção 3' },
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
        <div className="titleField">
          <h2>Task Title</h2>
          <h3>Add a title to your task to easily identify it</h3>
          <input type="text" />
        </div>
        <div className="categoryField">
          <h2>Task Category</h2>
          <h3>
            Select or create one or more categories that your task falls into
          </h3>
          <CreatableSelect
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
          <input type="text" />
        </div>
        <div className="buttonField">
          <h3>Next Step</h3>
        </div>
      </section>
    </section>
  );
}

export default App;
