import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const maxRecipes = 12;

function RecipesCard(props) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const { recipes } = props;
  const type = pathname === '/foods' ? 'Meal' : 'Drink';

  return (
    <>
      { recipes.slice(0, maxRecipes).map((recipe, index) => (
        <Card data-testid={ `${index}-recipe-card` } key={ recipe[`id${type}`] }>
          <Card.Img
            data-testid={ `${index}-card-img` }
            variant="top"
            src={ recipe[`str${type}Thumb`] }
          />
          <Card.Body>
            <Card.Title data-testid={ `${index}-card-name` }>
              {recipe[`str${type}`]}
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

RecipesCard.propTypes = {
  recipes: PropTypes.shape({
    slice: PropTypes.func,
  }).isRequired,
};

export default RecipesCard;
