import { useState, useEffect } from 'react';

export const useIngredients = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const loadIngredients = async (req, res) => {
      const response = await fetch('/ingredients');
      const ingredients = await response.json();
      setIngredients(ingredients);
      setIsLoading(false);
    };

    loadIngredients();
  }, []);

  return { isLoading, ingredients, setIngredients };
};
