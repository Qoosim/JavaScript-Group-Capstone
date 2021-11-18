const foodItemsDiv = document.getElementById('food-items');
const mealCount = document.querySelector('#meal-count');

const displayMeals = (food) => {
  const foodDiv = document.createElement('div');
  foodDiv.className = 'col-lg-4';
  foodDiv.innerHTML = `
      <div class="meal-item text-center card shadow mb-4 border-0">
        <div class="meal-img bg-light">
          <img src="${food.strMealThumb}" alt="Meal Image">
        </div>
        <div class="meal-name d-flex pt-3 justify-content-center align-items-center">
          <h3 class="fs-6 me-2 pt-1">${food.strMeal}</h3>
          <i class="text-danger bi bi-heart" role="button"></i>
        </div>
        <div class="like-count">
          <small class="text-muted">2 Likes</small>
        </div>
        <div class="comment mb-4 mt-2">
          <button class="btn btn-warning rounded-pill px-4 shadow">Comments</button>
        </div>
      </div>
    `;
  foodItemsDiv.appendChild(foodDiv);
};

const getMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=indian';
  const response = await fetch(url);
  const data = await response.json();
  data.meals.forEach((meal) => displayMeals(meal));
  mealCount.textContent = data.meals.length;
};

export default getMeals;
