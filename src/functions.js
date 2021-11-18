const foodItemsDiv = document.getElementById('food-items');
const mealCount = document.querySelector('#meal-count');

const mealList = async (data) => {
  for (let i = 0; i <= data.length - 1; i += 1) {
    const foodDiv = document.createElement('div');
    foodDiv.classList.add('col-lg-4');

    const mealItem = document.createElement('div');
    mealItem.classList.add('meal-item text-center card shadow mb-4 border-0');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('meal-img');

    const image = document.createElement('img');
    image.src = data[i].strMealThumb;
    imgContainer.appendChild(image);
    mealItem.appendChild(imgContainer);

    const mealText = document.createElement('div');
    mealText.classList.add('meal-name d-flex pt-3 justify-content-center align-items-center');

    const mealName = document.createElement('h3');
    mealName.classList.add('fs-6 me-2 pt-1');
    mealName.innerHTML = data[i].strMeal;

    const likeBtn = document.createElement('i');
    likeBtn.classList.add('text-danger bi bi-heart');
    likeBtn.id = data[i].idMeal;

    mealText.appendChild(mealName);
    mealText.appendChild(likeBtn);
    mealItem.appendChild(mealText);

    const likeCount = document.createElement('div');
    likeCount.classList.add('like-count');

    const likesNumber = document.createElement('small');
    likesNumber.innerHTML = '0 Likes';
    likeCount.appendChild(likesNumber);
    mealItem.appendChild(likeCount);

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment mb-4 mt-2');

    const commentBtn = document.createElement('button');
    commentBtn.classList.add('btn btn-warning rounded-pill px-4 shadow');
    commentBtn.innerHTML = 'Comments';
    commentContainer.appendChild(commentBtn);
    mealItem.appendChild(commentContainer);
  }
}

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
