import getLikes from "./getLikes";
import createLike from "./createLike";
import mealsCounter from "./functions";

const getMeals = async () => {
  const foodItemsDiv = document.getElementById('food-items');
  const homeCount = document.querySelector('#meal-count');

  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=indian',
  );
  const data = await response.json();
  homeCount.innerHTML = mealsCounter(data.meals);

  data.meals.forEach( food => {
    const foodDiv = document.createElement('div');
    foodDiv.className = 'col-lg-4';
    foodDiv.innerHTML = `
      <div class="meal-item text-center card shadow mb-4 border-0">
        <div class="meal-img bg-light">
          <img src="${food.strMealThumb}" alt="Meal Image">
        </div>
        <div class="meal-name d-flex pt-3 justify-content-center align-items-center">
          <h3 class="fs-6 me-2 pt-1">${food.strMeal}</h3>
          <i class="text-danger like-btn bi bi-heart" role="button" id="${food.idMeal}"></i>
        </div>
        <div class="like-count">
          <small class="text-muted" id="no-of-likes">0 Likes</small>
        </div>
        <div class="comment mb-4 mt-2">
          <button class="btn btn-warning rounded-pill px-4 shadow">Comments</button>
        </div>
      </div>
    `;
    foodItemsDiv.appendChild(foodDiv);
  })
};

export default getMeals;