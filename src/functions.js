const foodItemsDiv = document.getElementById('food-items');
const mealCount = document.querySelector('#meal-count');
const mealDetails = document.querySelector('.meal-details');
const mealDetailsContent = document.querySelector('.meal-details-content');

const appId = 'Fp12eL7c25FQ3gxVeMCZ';

const getMealList = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=indian';
  const response = await fetch(url);
  const data = await response.json();
  data.meals.forEach((food) => {
    const foodDiv = document.createElement('div');
    foodDiv.className = 'col-lg-4';
    foodDiv.setAttribute('data-id', `${food.idMeal}`);
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
            <button class="btn btn-warning rounded-pill px-4 shadow comment-btn">Comments</button>
          </div>
        </div>
      `;
    foodItemsDiv.appendChild(foodDiv);
    mealCount.textContent = data.meals.length;
  });
};

const mealModal = (meal) => {
  [meal] = meal;
  mealDetailsContent.innerHTML = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <p class = "recipe-category">${meal.strCategory}</p>
    <div class = "recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class = "meal-img">
      <img src = "${meal.strMealThumb}" alt = "">
    </div>
  `;
  mealDetailsContent.parentElement.classList.add('showComment');
};

const getMealRecipe = async (e) => {
  e.preventDefault();
  if (e.target.classList.contains('comment-btn')) {
    const mealItem = e.target.parentElement.parentElement.parentElement;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`;
    const response = await fetch(url).then((response) => response.json()).then((data) => data);
    mealModal(response.meals);
  }
};

foodItemsDiv.addEventListener('click', getMealRecipe);

export {
  getMealList,
};
