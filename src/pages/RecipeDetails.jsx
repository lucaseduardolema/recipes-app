import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Container, ListGroup } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import ShareFavButtons from '../components/ShareFavButtons';
import fetchDrinkId from '../services/fetchDrinkID';
import fetchDrinks from '../services/fetchDrinks';
import fetchFoodId from '../services/fetchFoodId';
import fetchFoods from '../services/fetchFoods';
import '../styles/RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [ingredientsKeys, setIngredientsKeys] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [measureKeys, setMeasureKeys] = useState([]);
  const [url, setUrl] = useState('');
  const [recomentadions, setRecomentadions] = useState([]);
  const [hasDoneRecipe, setHasDoneRecipe] = useState(false);
  const [hasInProgress, setHasInProgress] = useState(false);
  const {
    location: { pathname },
  } = history;
  const type = pathname.includes('/foods') ? 'Meal' : 'Drink';
  const typeRec = pathname.includes('/foods') ? 'Drink' : 'Meal';

  useEffect(() => {
    const getData = async () => {
      let data = [];
      let recomendations = [];

      if (pathname.includes('/foods')) {
        data = await fetchFoodId(id);
        recomendations = await fetchDrinks();

        const keysI = Object.keys(data.meals[0])
          .filter((key) => key.includes('strIngredient'));

        const keysM = Object.keys(data.meals[0])
          .filter((key) => key.includes('strMeasure'));

        setRecipeDetail(data.meals);
        setRecomentadions(recomendations.drinks);
        setIngredientsKeys(keysI);
        setMeasureKeys(keysM);
      }

      if (pathname.includes('/drinks')) {
        data = await fetchDrinkId(id);
        recomendations = await fetchFoods();

        const keysI = Object.keys(data.drinks[0])
          .filter((key) => key.includes('strIngredient'));

        const keysM = Object.keys(data.drinks[0])
          .filter((key) => key.includes('strMeasure'));

        setRecipeDetail(data.drinks);
        setRecomentadions(recomendations.meals);
        setIngredientsKeys(keysI);
        setMeasureKeys(keysM);
      }
    };
    getData();
  }, []); // eslint-disable-line

  useEffect(() => {
    const dones = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const inCurrent = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const hasDone = dones.some((recipe) => recipe.id === id);

    if (pathname.includes('/foods') && inCurrent !== null && inCurrent !== undefined) {
      const hasCurrent = Object.keys(inCurrent.meals).includes(id);
      setHasInProgress(hasCurrent);
    }

    if (pathname.includes('/drinks') && inCurrent !== null && inCurrent !== undefined) {
      const hasCurrent = Object.keys(inCurrent.cocktails).includes(id);
      setHasInProgress(hasCurrent);
    }

    setHasDoneRecipe(hasDone);
  }, []); // eslint-disable-line

  useEffect(() => {
    const recipe = recipeDetail;
    const keysI = ingredientsKeys;
    const filteredI = [];

    if (pathname.includes('/foods') && recipeDetail[0]) {
      const urlVideo = recipeDetail[0].strYoutube.split('=');
      setUrl(urlVideo[1]);
    }

    for (let i = 0; i < keysI.length; i += 1) {
      if (recipe[0][keysI[i]]) {
        filteredI.push(keysI[i]);
      }
    }
    setFilteredKeys(filteredI);
  }, [ingredientsKeys]); // eslint-disable-line

  const handleButton = () => {
    history.push(`${pathname}/in-progress`);
  };

  return (
    <Container className="mb-5 mt-5">
      {recipeDetail
        && recipeDetail.map((recipe) => (
          <Card key={ recipe[`id${type}`] }>
            <Card.Img
              variant="top"
              src={ recipe[`str${type}Thumb`] }
              data-testid="recipe-photo"
            />

            <ShareFavButtons recipe={ recipeDetail } />

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
                {filteredKeys
                  && filteredKeys.map((key, index) => (
                    <ListGroup.Item
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ `${index}-${recipe[key]}` }
                      className="text-capitalize"
                    >
                      {`${recipe[key]} - ${recipe[measureKeys[index]]}`}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>

            <Card.Body>
              <Card.Title>Instructions</Card.Title>
              <Card.Text data-testid="instructions" className="text-justify">
                {recipe.strInstructions}
              </Card.Text>
            </Card.Body>

            {recipe.strYoutube && (
              <Card.Body>
                <Card.Title>Video</Card.Title>
                <div className="iframe-container">
                  <iframe
                    data-testid="video"
                    src={ `https://www.youtube.com/embed/${url}` }
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer;
                    autoplay; clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture"
                    allowFullScreen
                    className="responsive-iframe"
                  />
                </div>
              </Card.Body>
            )}

            <Card.Body>
              <Card.Title>Recommended</Card.Title>
              <Carousel variant="dark" indicators={ false } wrap={ false }>
                {recomentadions.map((recomend, index) => (
                  <Carousel.Item
                    data-testid={ `${index}-recomendation-card` }
                    key={ recomend[`id${typeRec}`] }
                  >
                    <img
                      className="d-block img-fluid"
                      src={ recomend[`str${typeRec}Thumb`] }
                      alt={ recomend[`str${typeRec}`] }
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card.Body>
          </Card>
        ))}
      <nav
        className="navbar fixed-bottom justify-content-center"
        style={ { marginBottom: '11px' } }
      >
        { !hasDoneRecipe && (
          <Button
            data-testid="start-recipe-btn"
            variant="success"
            style={ { position: 'fixed' } }
            name={ hasInProgress ? 'continue' : 'start' }
            onClick={ handleButton }
          >
            { hasInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </Button>
        )}
      </nav>
    </Container>
  );
}

export default RecipeDetails;
