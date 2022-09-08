import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
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
  const [toggleCategoryFilter, setToggleCategoryFilter] = useState({});

  useEffect(() => {
    const getData = async () => {
      let data = {};
      let categorys = [];

      if (pathname.includes('/foods')) {
        data = await fetchFoods();
        categorys = await fetchFoodCategorys();
        setCategoryFilters(categorys);
        setRecipesOriginal(data.meals);
        setRecipes(data.meals);
      }
      if (pathname.includes('/drinks')) {
        data = await fetchDrinks();
        categorys = await fetchDrinkCategorys();
        setCategoryFilters(categorys);
        setRecipesOriginal(data.drinks);
        setRecipes(data.drinks);
      }
    };
    getData();
  }, []); // eslint-disable-line

  const handleFilter = async ({ target: { name } }) => {
    if (toggleCategoryFilter[name]) {
      setToggleCategoryFilter({ [name]: false });
      setRecipes(recipesOriginal);
      return;
    }
    let data = [];
    if (pathname.includes('/foods')) {
      data = await fetchFoodFilter(name);
      setRecipes(data);
      setToggleCategoryFilter({ [name]: true });
    }
    if (pathname.includes('/drinks')) {
      data = await fetchDrinkFilter(name);
      setRecipes(data);
      setToggleCategoryFilter({ [name]: true });
    }
  };

  const handleAll = async () => setRecipes(recipesOriginal);

  return (
    <div
      className="
      d-flex
      justify-content-center
      flex-column
      align-items-center"
    >
      <ButtonGroup size="sm" className="mb-3">
        <Button data-testid="All-category-filter" onClick={ handleAll }>All</Button>
        <DropdownButton title="Categorys">
          {categoryFilters.map(({ strCategory }) => (
            <Dropdown.Item
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              name={ strCategory }
              onClick={ handleFilter }
            >
              {strCategory}
            </Dropdown.Item>
          ))}

        </DropdownButton>
      </ButtonGroup>
      {recipes && <RecipesCard recipes={ recipes } />}
    </div>
  );
}

export default Recipes;
