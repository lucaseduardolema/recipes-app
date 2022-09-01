import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';
import SearchBar from '../components/SearchBar';

function Foods() {
  const showBar = useSelector((state) => state.showSearchBar);
  const mealsSearch = useSelector(({ searchResults }) => searchResults.results.meals);

  return (
    <>
      <Header title="Foods" />
      <Container>
        { showBar.show && <SearchBar />}
        { mealsSearch && <RecipesCard recipes={ mealsSearch } />}
      </Container>
    </>
  );
}

export default Foods;
