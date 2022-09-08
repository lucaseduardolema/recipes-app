import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <nav data-testid="footer" className="navbar bg-warning fixed-bottom">
      <input
        data-testid="drinks-bottom-btn"
        type="image"
        src={ drinkIcon }
        alt="drinkIcon"
        onClick={ () => history.push('/recipes-app/drinks') }
      />

      <input
        data-testid="food-bottom-btn"
        type="image"
        src={ mealIcon }
        alt="mealIcon"
        onClick={ () => history.push('/recipes-app/foods') }
      />
    </nav>
  );
}

export default Footer;
