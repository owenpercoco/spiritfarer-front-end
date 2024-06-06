import React, { useState, useEffect } from 'react';
import { Ingredient, IngredientForm } from './components/IngredientForm'
import { TheOven } from './components/TheOven'
import './App.css';
import './style.scss'


function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientsRecord, setIngredientsRecord] = useState<Record<string, Ingredient>>()

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients])

  return (
    <div className="App">
      <p>Hello! Learning To Cook</p>
      <div className="give-me-stuff">
        <p>here, give yourself anything.</p>
        <IngredientForm setIngredients={setIngredients} />
      </div>
        <div className="the-oven-container">
        <p>Hello! Im the Oven.  Feed me food and Ill give you more food.</p>
          <TheOven setIngredients={setIngredients} ingredients={ingredients} />
        </div>
        <div>
          {ingredients.map((data) => {
            return (
                    <div>
                      <IngredientForm value={data} setIngredients={setIngredients} />
                      {data.description}
                      {data.quantity}
                   </div>)
          })}
        </div>
    </div>
  );
}

export default App;
