const displayMeals = (food) => {
  const foodItemsDiv = document.getElementById('food-items');

  const foodDiv = document.createElement('div');
  foodDiv.className = 'col-lg-4';
  foodDiv.innerHTML = `
      <div class="meal-item text-center card shadow mb-4 border-0">
        <div class="meal-img bg-light">
          <img src="${food.strMealThumb}" alt="Meal Image">
        </div>
        <div class="meal-name">
          <h3 class="fs-6 my-3">${food.strMeal}</h3>
        </div>
      </div>
    `;
  foodItemsDiv.appendChild(foodDiv);
};

const getMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';
  const response = await fetch(url);
  const data = await response.json();
  data.meals.forEach((meal) => displayMeals(meal));
};

export default getMeals;
