const fetchDrinkCategorys = async () => {
  try {
    const maxCategorys = 5;
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks.slice(0, maxCategorys);
  } catch (error) {
    console.log(error);
  }
};

export default fetchDrinkCategorys;
