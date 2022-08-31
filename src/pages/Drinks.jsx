import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  const showBar = useSelector((state) => state.showSearchBar);

  return (
    <>
      <Header title="Drinks" />
      { showBar.show && <SearchBar />}
      <p>drinks</p>
    </>
  );
}

export default Drinks;
