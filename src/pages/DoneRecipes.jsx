import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Container } from 'react-bootstrap';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [dones, setDones] = useState([]);
  const [all, setAll] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setDones(doneRecipes);
    setAll(doneRecipes);
  }, []);

  const handleShare = ({ target: { name, id } }) => {
    const host = window.location.origin;
    setLinkCopied(true);
    clipboardCopy(`${host}/${name}/${id}`);
  };

  const handleFoodsFilter = () => {
    const foods = all.filter(({ type }) => type === 'foods');
    setDones(foods);
  };

  const handleDrinksFilter = () => {
    const drinks = all.filter(({ type }) => type === 'drinks');
    setDones(drinks);
  };

  return (
    <>
      <Header title="Done Recipes" />
      <Container>
        <div className="mb-3 d-flex justify-content-around">
          <Button data-testid="filter-by-all-btn" onClick={ () => setDones(all) }>
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

        {dones.map((done, index) => (
          <Card key={ done.id } className="mb-3">
            <Link to={ `${done.type}/${done.id}` }>
              <Card.Img
                data-testid={ `${index}-horizontal-image` }
                src={ done.image }
              />
            </Link>

            <Card.Body>
              <div className="d-flex justify-content-around">
                {done.alcoholicOrNot ? (
                  <Card.Text data-testid={ `${index}-horizontal-top-text` }>
                    {done.alcoholicOrNot}
                  </Card.Text>
                ) : (
                  <Card.Text data-testid={ `${index}-horizontal-top-text` }>
                    {`${done.nationality} - ${done.category}`}
                  </Card.Text>
                )}

                <input
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="image"
                  src={ shareIcon }
                  alt="share-btn"
                  style={ { width: '30px' } }
                  name={ done.type }
                  id={ done.id }
                  onClick={ handleShare }
                />
              </div>

              {linkCopied && <Card.Text>Link copied!</Card.Text>}

              <Link to={ `${done.type}/${done.id}` }>
                <Card.Title data-testid={ `${index}-horizontal-name` }>
                  {done.name}
                </Card.Title>
              </Link>

              <Card.Text data-testid={ `${index}-horizontal-done-date` }>
                {`Done in: ${done.doneDate}`}
              </Card.Text>
            </Card.Body>

            <div className="d-flex justify-content-around mb-3">
              {done.tags
                && done.tags.map((tagName) => (
                  <Badge
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                    key={ tagName }
                  >
                    {tagName}
                  </Badge>
                ))}
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default DoneRecipes;
