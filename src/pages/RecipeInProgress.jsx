import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, ListGroup } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import ShareFavButtons from '../components/ShareFavButtons';
import fetchDrinkId from '../services/fetchDrinkID';
import fetchFoodId from '../services/fetchFoodId';
import '../styles/RecipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [ingredientsKeys, setIngredientsKeys] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [measureKeys, setMeasureKeys] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  const type = pathname.includes('/foods') ? 'Meal' : 'Drink';
  const typeInProgress = pathname.includes('/foods') ? 'meals' : 'cocktails';

  useEffect(() => {
    const getData = async () => {
      if (pathname.includes('/foods')) {
        const food = await fetchFoodId(id);

        const keysI = Object.keys(food.meals[0])
          .filter((key) => key.includes('strIngredient'));

        const keysM = Object.keys(food.meals[0])
          .filter((key) => key.includes('strMeasure'));

        setRecipeInProgress(food.meals);
        setIngredientsKeys(keysI);
        setMeasureKeys(keysM);
      }
      if (pathname.includes('/drinks')) {
        const drink = await fetchDrinkId(id);

        const keysI = Object.keys(drink.drinks[0])
          .filter((key) => key.includes('strIngredient'));

        const keysM = Object.keys(drink.drinks[0])
          .filter((key) => key.includes('strMeasure'));
        setRecipeInProgress(drink.drinks);
        setIngredientsKeys(keysI);
        setMeasureKeys(keysM);
      }
    };
    getData();
  }, []); // eslint-disable-line

  useEffect(() => {
    const recipe = recipeInProgress;
    const keysI = ingredientsKeys;
    const filteredI = [];

    for (let i = 0; i < keysI.length; i += 1) {
      if (recipe[0][keysI[i]]) {
        filteredI.push(keysI[i]);
      }
    }
    setFilteredKeys(filteredI);
  }, [ingredientsKeys]); // eslint-disable-line

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
      setInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    } else {
      setInProgress(inProgressRecipes);
    }
  }, []);

  const handleIngredientStep = ({ target }) => {
    const label = document.getElementById(target.id).nextSibling;
    const strike = document.createElement('strike');
    const text = label.innerText;
    const localInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (localInProgress?.[typeInProgress]?.[id]) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...localInProgress,
          [typeInProgress]: {
            ...localInProgress[typeInProgress],
            [id]: [...localInProgress[typeInProgress][id], target.name],
          },
        }),
      );
    } else {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({
          ...localInProgress,
          [typeInProgress]: {
            ...localInProgress[typeInProgress],
            [id]: [target.name],
          },
        }),
      );
    }
    label.innerText = '';
    strike.innerText = text;
    label.appendChild(strike);
  };

  return (
    <Container className="mb-5 mt-5">
      {recipeInProgress
        && recipeInProgress.map((recipe) => (
          <Card key={ recipe[`id${type}`] }>
            <Card.Img
              variant="top"
              src={ recipe[`str${type}Thumb`] }
              data-testid="recipe-photo"
            />

            <ShareFavButtons recipe={ recipeInProgress } />

            <Card.Body>
              <Card.Title data-testid="recipe-title">
                {recipe[`str${type}`]}
              </Card.Title>
              <Card.Text data-testid="recipe-category">
                {recipe.strAlcoholic
                  ? `${recipe.strAlcoholic}`
                  : `${recipe.strCategory}`}
              </Card.Text>
            </Card.Body>

            <Card.Body>
              <Card.Title>Ingredients</Card.Title>
              <ListGroup variant="flush">
                <Form>
                  {filteredKeys.map((key, index) => (
                    <div
                      key={ `${index}-${recipe[key]}` }
                      className="text-capitalize list-group-item"
                    >
                      <div
                        className="form-check"
                        data-testid={ `${index}-ingredient-step` }
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={ `${index}-${recipe[key]}` }
                          onClick={ handleIngredientStep }
                          name={ `${recipe[key]} - ${
                            recipe[measureKeys[index]]
                          }` }
                          defaultChecked={
                            inProgress[typeInProgress][id]
                            && !!inProgress[typeInProgress][id]
                              .includes(`${recipe[key]} - ${recipe[measureKeys[index]]}`)
                          }
                        />
                        <label htmlFor={ `${index}-${recipe[key]}` }>
                          {`${recipe[key]} - ${recipe[measureKeys[index]]}`}
                        </label>
                      </div>
                    </div>
                  ))}
                </Form>
              </ListGroup>
            </Card.Body>

            <Card.Body>
              <Card.Title>Instructions</Card.Title>
              <Card.Text data-testid="instructions" className="text-justify">
                {recipe.strInstructions}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      <nav
        className="navbar fixed-bottom justify-content-center"
        style={ { marginBottom: '11px' } }
      >
        <Button
          style={ { position: 'fixed' } }
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </Button>
      </nav>
    </Container>
  );
}

export default RecipeInProgress;