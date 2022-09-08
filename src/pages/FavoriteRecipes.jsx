import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [all, setAll] = useState([]);
  const [hasFav, setHasFav] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavorites(doneRecipes);
    setAll(doneRecipes);
    setHasFav(true);
  }, [hasFav]);

  const handleFoodsFilter = () => {
    const foods = all.filter(({ type }) => type === 'food');
    setFavorites(foods);
  };

  const handleDrinksFilter = () => {
    const drinks = all.filter(({ type }) => type === 'drink');
    setFavorites(drinks);
  };

  const handleShare = ({ target: { name, id } }) => {
    const host = window.location.origin;
    setLinkCopied(true);
    clipboardCopy(`${host}/${name}s/${id}`);
  };

  const handleFavorites = ({ target: { id } }) => {
    const favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    );
    const desFavorite = favoriteRecipes.filter(
      (favRecipe) => favRecipe.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(desFavorite));
    setHasFav(false);
  };

  return (
    <>
      <Header title="Favorite Recipes" />
      <Container
        className="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        my-5"
      >
        <div className="mb-3 d-flex justify-content-around">
          <Button data-testid="filter-by-all-btn" onClick={ () => setFavorites(all) }>
            All
          </Button>
          <Button data-testid="filter-by-food-btn" onClick={ handleFoodsFilter }>
            Food
          </Button>
          <Button
            data-testid="filter-by-drink-btn"
            onClick={ handleDrinksFilter }
          >
            Drinks
          </Button>
        </div>

        {favorites.map((fav, index) => (
          <Card key={ fav.id } className="mb-3">
            <Link to={ `${fav.type}s/${fav.id}` }>
              <Card.Img
                data-testid={ `${index}-horizontal-image` }
                src={ fav.image }
              />
            </Link>

            <Card.Body>
              {fav.alcoholicOrNot ? (
                <Card.Text data-testid={ `${index}-horizontal-top-text` }>
                  {fav.alcoholicOrNot}
                </Card.Text>
              ) : (
                <Card.Text data-testid={ `${index}-horizontal-top-text` }>
                  {`${fav.nationality} - ${fav.category}`}
                </Card.Text>
              )}

              <Link to={ `${fav.type}s/${fav.id}` }>
                <Card.Title data-testid={ `${index}-horizontal-name` }>
                  {fav.name}
                </Card.Title>
              </Link>
            </Card.Body>

            <Card.Body className="d-flex justify-content-around">
              <input
                data-testid={ `${index}-horizontal-share-btn` }
                type="image"
                src={ shareIcon }
                alt="share-btn"
                style={ { width: '30px' } }
                onClick={ handleShare }
                name={ fav.type }
                id={ fav.id }
              />

              {linkCopied && <Card.Text>Link copied!</Card.Text>}

              <input
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="image"
                src={ hasFav ? blackHeartIcon : whiteHeartIcon }
                alt="favorite-btn"
                style={ { width: '30px' } }
                onClick={ handleFavorites }
                name={ fav.type }
                id={ fav.id }
              />
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default FavoriteRecipes;
