import { Ingredient, IngredientType } from './IngredientForm'

export const TheRecipes: Record<string, Partial<Ingredient>> = {
    'beef': {
        name: 'Steak',
        type: IngredientType.meat,
        recipe: ['beef'],
        description: 'Tasty grilled steak, fat and delicious'
    },
    'steak-rice': {
        name: 'Steak Fried Rice',
        type: IngredientType.dish,
        recipe: ['steak', 'rice'],
        description: 'a leftovers classic',
    },
    'bread-cheese': {
        name: 'Grilled Cheese',
        type: IngredientType.dish,
        recipe: ['bread', 'cheese'],
        description: 'Parmesan pecorino swiss mountainarella'
    },
}

export function cookIngredient(name: string): void {
    
}
