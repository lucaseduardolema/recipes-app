import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SEARCH_RESULTS } from '../redux/actions';
import fetchDrinkSearch from '../services/fetchDrinkSearch';
import fetchFoodSearch from '../services/fetchFoodSearch';

function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { location: { pathname } } = history;
  const [inputTerm, setInputTerm] = useState('');
  const [searchRadio, setSearchRadio] = useState('');

  const handleRadio = ({ target: { value } }) => setSearchRadio(value);

  const handleSearchFoods = async () => {
    if (searchRadio === 'f' && inputTerm.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const searchResults = await fetchFoodSearch(searchRadio, inputTerm);

    if (!searchResults.meals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    if (searchResults.meals.length === 1) {
      const { idMeal } = searchResults.meals[0];
      history.push(`/foods/${idMeal}`);
    } else {
      dispatch({
        type: SEARCH_RESULTS,
        payload: searchResults,
      });
    }
  };

  const handleSearchDrinks = async () => {
    if (searchRadio === 'f' && inputTerm.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const searchResults = await fetchDrinkSearch(searchRadio, inputTerm);

    if (!searchResults.drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    if (searchResults.drinks.length === 1) {
      const { idDrink } = searchResults.drinks[0];
      history.push(`/drinks/${idDrink}`);
    } else {
      dispatch({
        type: SEARCH_RESULTS,
        payload: searchResults,
      });
    }
  };

  return (
    <Form className="d-flex flex-column mb-3">
      <Form.Control
        data-testid="search-input"
        type="text"
        className="mb-2"
        placeholder="Search Recipe"
        value={ inputTerm }
        onChange={ ({ target: { value } }) => setInputTerm(value) }
      />
      <div className="d-flex justify-content-center">
        <Form.Check
          data-testid="ingredient-search-radio"
          inline
          type="radio"
          label="Ingredient"
          name="radioSearch"
          id="Ingredient"
          value="i"
          onChange={ handleRadio }
        />

        <Form.Check
          data-testid="name-search-radio"
          inline
          type="radio"
          label="Name"
          name="radioSearch"
          id="Name"
          value="s"
          onChange={ handleRadio }
        />

        <Form.Check
          data-testid="first-letter-search-radio"
          inline
          type="radio"
          label="First Letter"
          name="radioSearch"
          id="First"
          value="f"
          onChange={ handleRadio }
        />

        <Button
          data-testid="exec-search-btn"
          variant="success"
          size="sm"
          onClick={ pathname.includes('/foods') ? handleSearchFoods : handleSearchDrinks }
        >
          Search
        </Button>
      </div>
    </Form>
  );
}

export default SearchBar;
