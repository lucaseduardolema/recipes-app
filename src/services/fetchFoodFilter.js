const fetchFoodFilter = async (filter) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export default fetchFoodFilter;
