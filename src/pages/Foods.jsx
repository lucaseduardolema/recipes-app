import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
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
        { !mealsSearch && <Recipes />}
        { mealsSearch && <RecipesCard recipes={ mealsSearch } />}
      </Container>
      <Footer />
    </>
  );
}

export default Foods;
