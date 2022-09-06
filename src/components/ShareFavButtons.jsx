import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ShareFavButtons({ recipe }) {
  const { id } = useParams();
  const history = useHistory();
  const [hasFav, setHasFav] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const {
    location: { pathname },
  } = history;

  const type = pathname.includes('/foods') ? 'Meal' : 'Drink';
  const typeAddress = pathname.includes('/foods') ? '/foods' : '/drinks';

  const favToSave = {
    id: recipe[0][`id${type}`],
    type: pathname.includes('/foods') ? 'food' : 'drink',
    nationality: recipe[0].strArea ? recipe[0].strArea : '',
    category: recipe[0].strCategory,
    alcoholicOrNot: pathname.includes('/foods') ? '' : 'Alcoholic',
    name: recipe[0][`str${type}`],
    image: recipe[0][`str${type}Thumb`],
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    );
    const has = favoriteRecipes.some((favRecipe) => favRecipe.id === id);
    setHasFav(has);
  }, []); // eslint-disable-line

  const handleShare = () => {
    const host = window.location.origin;
    setLinkCopied(true);
    clipboardCopy(`${host}${typeAddress}/${id}`);
  };

  const handleFavorites = () => {
    const favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    );
    if (hasFav) {
      const desFavorite = favoriteRecipes.filter(
        (favRecipe) => favRecipe.id !== id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(desFavorite));
      setHasFav(false);
      return;
    }

    if (!hasFav) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favoriteRecipes, favToSave]),
      );
      setHasFav(true);
    }
  };

  return (
    <Card.Body className="d-flex justify-content-around">
      <input
        data-testid="share-btn"
        type="image"
        src={ shareIcon }
        alt="share-btn"
        style={ { width: '30px' } }
        onClick={ handleShare }
      />

      {linkCopied && <Card.Text>Link copied!</Card.Text>}

      <input
        data-testid="favorite-btn"
        type="image"
        src={ hasFav ? blackHeartIcon : whiteHeartIcon }
        alt="favorite-btn"
        style={ { width: '30px' } }
        onClick={ handleFavorites }
      />
    </Card.Body>
  );
}

ShareFavButtons.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ShareFavButtons;
