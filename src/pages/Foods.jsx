import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Foods() {
  const showBar = useSelector((state) => state.showSearchBar);

  return (
    <>
      <Header title="Foods" />
      { showBar.show && <SearchBar />}
      <p>foods</p>
    </>
  );
}

export default Foods;
