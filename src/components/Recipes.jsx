import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import fetchDrinkCategorys from '../services/fetchDrinkCategorys';
import fetchDrinkFilter from '../services/fetchDrinkFilter';
import fetchDrinks from '../services/fetchDrinks';
import fetchFoodCategorys from '../services/fetchFoodCategorys';
import fetchFoodFilter from '../services/fetchFoodFilter';
import fetchFoods from '../services/fetchFoods';
import RecipesCard from './RecipesCard';

function Recipes() {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [recipes, setRecipes] = useState([]);
  const [recipesOriginal, setRecipesOriginal] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let data = {};
      let categorys = [];
      if (pathname === '/foods') {
        data = await fetchFoods();
        categorys = await fetchFoodCategorys();
        setCategoryFilters(categorys);
        setRecipesOriginal(data.meals);
        setRecipes(data.meals);
      }
      if (pathname === '/drinks') {
        data = await fetchDrinks();
        categorys = await fetchDrinkCategorys();
        setCategoryFilters(categorys);
        setRecipesOriginal(data.drinks);
        setRecipes(data.drinks);
      }
    };
    getData();
  }, []);

  const handleFilter = async ({ target: { name } }) => {
    let data = [];
    if (pathname === '/foods') {
      data = await fetchFoodFilter(name);
      setRecipes(data);
    }
    if (pathname === '/drinks') {
      data = await fetchDrinkFilter(name);
      setRecipes(data);
    }
  };

  const handleAll = async () => setRecipes(recipesOriginal);

  return (
    <>
      <ButtonGroup size="sm" className="mb-3">
        <Button data-testid="All-category-filter" onClick={ handleAll }>All</Button>
        {categoryFilters.map(({ strCategory }) => (
          <Button
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            name={ strCategory }
            onClick={ handleFilter }
          >
            {strCategory}
          </Button>
        ))}
      </ButtonGroup>
      {recipes && <RecipesCard recipes={ recipes } />}
    </>
  );
}

export default Recipes;
