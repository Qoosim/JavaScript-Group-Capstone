import './style.css';

const getMeals = async () => {
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
  .then(res=>res.json())
  // .then(data=> console.log(data))
  .then(data=> displayMeals(data))
}

const displayMeals = foods => {
  const foodItemsDiv = document.getElementById('food-items');

  foods.meals.forEach(meal => {
    const foodDiv = document.createElement('div');
    foodDiv.className = 'col-lg-4';
    const foodInfo = `
      <div class="meal-item text-center card shadow mb-4 border-0">
        <div class="meal-img bg-light">
          <img src="${meal.strMealThumb}" class="" alt="">
        </div>
        <div class="meal-name">
          <h3 class="fs-6 my-3">${meal.strMeal}</h3>
        </div>
      </div>
    `;
    foodDiv.innerHTML = foodInfo;
    foodItemsDiv.appendChild(foodDiv);
});
}

getMeals();