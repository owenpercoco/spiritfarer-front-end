import React, { useState, useEffect, Dispatch, FormEvent } from 'react';

export enum IngredientType  {
    grains="grains",
    fish="fish",
    meat="meat",
    dish="dish",
  }
  
export interface Ingredient {
    id: string;
    name: string;
    type: IngredientType;
    recipe?: string[];
    description?: string;
    quantity: number;
  
}

interface IngredientFormProps {
    value?: Ingredient;
    setIngredients: Dispatch<React.SetStateAction<Ingredient[]>>;
}

function editIngredient(newIngredient: Ingredient, setIngredients: Dispatch<React.SetStateAction<Ingredient[]>>) : void {
    console.log("editing");
    console.log(newIngredient);
    setIngredients(prev => {
        return prev.map(data => {
            if (data.id === newIngredient.id) {
                return { ...data, ...newIngredient }; // update the ingredient with new values
            }
            return data;
        });
    });
}

export function addIngredient(newIngredient: Partial<Ingredient>, setIngredients: Dispatch<React.SetStateAction<Ingredient[]>>) : void {
    if (newIngredient.id != null) {
        editIngredient(newIngredient as Ingredient, setIngredients);
    } else {
        const id = String(Date.now());
        newIngredient.id = id;
        console.log('adding ', newIngredient);

        setIngredients(prev => {
            const names = prev.map(data=> data.name);
            if (names.includes(newIngredient.name!)) {
                return prev.map(data => {
                    if (data.name === newIngredient.name) {
                        return { ...data, ...newIngredient, quantity: data.quantity + 1 };
                    }
                    return data;
                });
            } else {
                return [...prev, newIngredient as Ingredient]
            }
        });
    }
    
}

export function IngredientForm({ value, setIngredients }: IngredientFormProps) {
    const [isEdited, setIsEdited] = useState(false);
    const [isSaved, setIsSaved] = useState<Boolean>(Boolean(value) as boolean);
    useEffect(() => {
        if (isSaved) {
            setTimeout(() => {
                setIsSaved(false);
            }, 5000);
        }
    }, [isSaved]);


    function deleteIngredient(id: string): void {
        console.log('delteing...', id);
        setIngredients(ingredients => {
            return ingredients.filter(ingredient => ingredient.id !== id)
        });
    }
    function onSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { name } = (event.nativeEvent as SubmitEvent).submitter as HTMLInputElement;
        switch(name) {
            case 'delete': {
                deleteIngredient(value!.id)
                break;
            }
            case 'submit': {
                const form = event.target as any;
                const newIngredient: Partial<Ingredient> = {
                    id: value?.id,
                    name: form.name.value,
                    type: form.type.value,
                    quantity: 1,
                }
                if (!value) {
                    form.name.value = '';
                }
                addIngredient(newIngredient, setIngredients);
                setIsSaved(true);
                break;
            }
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className={`form-control ${value &&  isSaved ? 'saved' : ''}`}>
                <div className='input-control'>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder="ingredient name" defaultValue={value?.name}/>
                </div>
                <div className="input-control">
                    <label htmlFor="type">Choose a Type:</label>
                    <select name="type" defaultValue={value?.type}>
                        {Object.keys(IngredientType).map((data) => <option value={data}>{IngredientType[data as keyof typeof IngredientType]}</option>)}
                    </select>
                </div>
                <div className="input-control">
                    <input type="submit" name="submit" value={value ? 'edit ingredient' : 'enter name'}/>
                </div>
                {value && (
                    <div className="input-control">
                        <input type="submit" name="delete" value='delete'/>
                    </div>
                )}
            </div>
        </form>
    )
}
