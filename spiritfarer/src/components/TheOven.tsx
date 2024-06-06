import React, { useState, Dispatch, FormEvent } from 'react';
import { Ingredient, addIngredient } from './IngredientForm';
import { TheRecipes } from './TheRecipes';

interface TheOvenProps {
    ingredients: Ingredient[];
    setIngredients: Dispatch<React.SetStateAction<Ingredient[]>>
}



export function TheOven({ ingredients, setIngredients } : TheOvenProps) {
    const [resultName, setResultName] = useState<string>();

    function onSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const form = event.target as any;
        console.log(form);
        const { first, second } = form;

        let foodKey: string;
    
        if (second.value === 'empty' && first.value === 'empty') {
            throw console.error('nothing is cooking');
        } else if (second.value == 'empty') {
            foodKey = first.value.toLowerCase();
        } else {
            foodKey = `${first.value.toLowerCase()}-${second.value.toLowerCase()}`;
        }
        try {
            const newFood = TheRecipes[foodKey];
            addIngredient(newFood, setIngredients);
        } catch (e) {
            console.log(e)
        }
        
    }

    function generateMouth(name: string) {
        return (
            <div className="input-control-square">
                <select name={name}>
                    <option value={0}> </option>
                    {ingredients.map((data) => <option value={data.name}>{data.name}</option>)}
                </select>
            </div>
        )
    }
    return (
        <form onSubmit={onSubmit} className="the-oven-form">
            <div className="big-square">
                <div className="top-row">
                  <div className="left-square">
                    {generateMouth('first')}
                  </div>
                  <div className="right-square">
                    {generateMouth('second')}
                  </div>
                </div>
            </div>
            <div className="bottom-row">
                <input type="submit" value="cook it up cook it up" />
                <p>{resultName}</p>
            </div>
        </form>
    )
}
