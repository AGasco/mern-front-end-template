import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BackButton, Dropdown } from '../ui';

const unitOptions = ['pounds', 'cups', 'tablespoons', 'teaspoons', 'count'];

const initialState = {
  name: '',
  amount: 0,
  units: unitOptions[0]
};

export const AddIngredientPage = () => {
  const [ingredientData, setIngredientData] = useState(initialState);
  const history = useHistory();

  const onChange = (e) => {
    setIngredientData({ ...ingredientData, [e.target.name]: e.target.value });
  };

  const addToIngredients = async () => {
    const newIngredient = {
      ...ingredientData,
      name: ingredientData.name.toLowerCase()
    };

    await fetch('/ingredients', {
      method: 'post',
      body: JSON.stringify(newIngredient),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    history.push('/');
  };

  const { name, amount, units } = ingredientData;

  return (
    <div className="page">
      <BackButton />
      <div className="centered-container">
        <h1>Add Ingredient</h1>
        <input
          type="text"
          name="name"
          placeholder="Enter Ingredient Name"
          className="space-after space-before full-width"
          value={name}
          onChange={onChange}
        />
        <input
          type="number"
          name="amount"
          className="space-before full-width"
          value={amount}
          onChange={onChange}
        />
        <Dropdown
          name="units"
          className="space-before full-width"
          value={units}
          onChange={onChange}
          options={unitOptions}
        />
        <button className="space-before full-width" onClick={addToIngredients}>
          Add
        </button>
      </div>
    </div>
  );
};
