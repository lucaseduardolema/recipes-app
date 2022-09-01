const fetchDrinkSearch = async (radio, term) => {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${radio}=${term}`;
  if (radio === 'i') url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${term}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchDrinkSearch;
