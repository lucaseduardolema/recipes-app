const fetchFoodCategorys = async () => {
  try {
    const maxCategorys = 5;
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(url);
    const data = await response.json();
    return data.meals.slice(0, maxCategorys);
  } catch (error) {
    console.log(error);
  }
};

export default fetchFoodCategorys;
