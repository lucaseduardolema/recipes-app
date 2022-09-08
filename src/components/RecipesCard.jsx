import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const maxRecipes = 12;

function RecipesCard(props) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const { recipes } = props;
  const type = pathname === '/foods' ? 'Meal' : 'Drink';

  return (
    <div
      className="
      d-flex
      justify-content-center
      flex-column
      align-items-center
      mb-5"
    >
      {recipes.slice(0, maxRecipes).map((recipe, index) => (
        <Link
          key={ recipe[`id${type}`] }
          to={ `${pathname}/${recipe[`id${type}`]}` }
        >
          <Card className="mb-5" data-testid={ `${index}-recipe-card` }>
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
        </Link>
      ))}
    </div>
  );
}

RecipesCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipesCard;
