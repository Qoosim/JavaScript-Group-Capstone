const foodItemsDiv = document.getElementById('food-items');
const mealCount = document.querySelector('#home-count');
const mealDetailsContent = document.querySelector('.meal-details-content');
const closeBtn = document.querySelector('.close-btn');

// const appId = 'Fp12eL7c25FQ3gxVeMCZ';
const appId = '8WhiXHgGMaGrsfo6vYsR';

const getMealList = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=indian';
  const response = await fetch(url);
  const data = await response.json();
  data.meals.forEach((food) => {
    console.log(food);
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

const postComment = async (data) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8WhiXHgGMaGrsfo6vYsR/comments';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.ok;
};

const getComment = async (item) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/8WhiXHgGMaGrsfo6vYsR/comments?item_id=${item.idMeal}`;
  let myComment = await fetch(url).then((response) => response.json());
  const ul = document.querySelector('#list-comment');
  ul.innerHTML = '';
  const h3 = document.querySelector('.comment-count');
  h3.innerHTML = `Comments(${myComment.length ? myComment.length : 0})`;
  if (!myComment.length) myComment = [];
  myComment.forEach((comment) => {
    ul.innerHTML += `
      <li class="d-flex justify-content-start align-items-center">
        <p class="me-3">${comment.creation_date}</p>
        <p class="me-3">${comment.username}</p>
        <p>${comment.comment}</p>
      </li>
    `;
  });
};

const mealModal = async (meal) => {
  [meal] = meal;
  mealDetailsContent.innerHTML = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <p class = "recipe-category">${meal.strCategory}</p>
    <div class = "recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class = "recipe-meal-img">
      <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <h3 class="m-3 comment-count"></h3>
    <div class="d-flex justify-content-center align-items-center">
      <ul id="list-comment" class="list-unstyled">
      </ul>
    </div>
    <h3 class="m-3">Add a comment</h3>
    <form autocomplete="off" class="w-50 mx-auto">
      <input type="text" class="form-control w-75 mx-auto mb-2" id="commentator" placeholder="Your name">
      <textarea id="comment" name="comment" placeholder="Your comment..."></textarea>
      <button type="button" class="btn btn-secondary commentBtn">Comment</button>
    </form>
  `;
  mealDetailsContent.parentElement.classList.add('showComment');

  const commentBtn = document.querySelector('.commentBtn');
  commentBtn.addEventListener('click', () => {
    const username = document.querySelector('#commentator').value;
    const comment = document.querySelector('#comment').value;
    const itemId = meal.idMeal;
    const newData = {
      item_id: itemId,
      username,
      comment,
    };
    postComment(newData);
    document.querySelector('#commentator').value = '';
    document.querySelector('#comment').value = '';
    setTimeout(() => {
      getComment(meal);
    }, 1000);
  });
  getComment(meal);
};

const getMeal = async (e) => {
  e.preventDefault();
  if (e.target.classList.contains('comment-btn')) {
    const mealItem = e.target.parentElement.parentElement.parentElement;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`;
    const response = await fetch(url).then((response) => response.json()).then((data) => data);
    mealModal(response.meals);
  }
};

foodItemsDiv.addEventListener('click', getMeal);
closeBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showComment');
});

export {
  getMealList,
};
