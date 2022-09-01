import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';
import SearchBar from '../components/SearchBar';

function Drinks() {
  const showBar = useSelector((state) => state.showSearchBar);
  const drinksSearch = useSelector(({ searchResults }) => searchResults.results.drinks);

  return (
    <>
      <Header title="Drinks" />
      <Container>
        { showBar.show && <SearchBar />}
        { drinksSearch && <RecipesCard recipes={ drinksSearch } />}
      </Container>
    </>
  );
}

export default Drinks;
