const fetchDrinkFilter = async (filter) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export default fetchDrinkFilter;
