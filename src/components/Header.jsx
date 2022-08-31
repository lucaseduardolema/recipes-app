import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { SHOW_SEARCH_BAR } from '../redux/actions';

function Header(props) {
  const { title } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    location: { pathname },
  } = history;

  return (
    <nav className="navbar bg-warning">
      <input
        data-testid="profile-top-btn"
        type="image"
        src={ profileIcon }
        alt="Profile Icon"
        onClick={ () => history.push('/profile') }
      />

      <span data-testid="page-title">{title}</span>

      {pathname === '/foods' || pathname === '/drinks' ? (
        <input
          data-testid="search-top-btn"
          type="image"
          src={ searchIcon }
          alt="Search Icon"
          onClick={ () => dispatch({
            type: SHOW_SEARCH_BAR,
          }) }
        />
      ) : null }
    </nav>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
