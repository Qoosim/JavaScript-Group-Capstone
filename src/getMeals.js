const getMeals = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=indian',
  );
  const result = await response.json();
  return result.meals;
  // const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=indian';
  // const response = await fetch(url);
  // const data = await response.json();
  // return data.meals;
};

export default getMeals;