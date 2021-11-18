import getLikes from "./getLikes";
import createLike from "./createLike";

const foodItemsDiv = document.getElementById('food-items');
const mealCount = document.querySelector('#meal-count');

const likesCounter = (target, likesArr, numOfLikes) => {
  likesArr.forEach((obj) => {
    if (obj.item_id === target.id) {
      numOfLikes.innerHTML = `${obj.likes} Likes`;
    }
  });
};

const mealList = async (data) => {

  for(let i = 0; i <= data.length - 1; i += 1) {
    const foodDiv = document.createElement('div');
    foodDiv.classList.add('col-lg-4');

    const mealItem = document.createElement('div');
    mealItem.id = data[i].idMeal;
    mealItem.classList.add('meal-item', 'text-center', 'card', 'shadow', 'mb-4', 'border-0');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('meal-img');

    const image = document.createElement('img');
    image.src = data[i].strMealThumb;
    imgContainer.appendChild(image);
    mealItem.appendChild(imgContainer);

    const mealText = document.createElement('div');
    mealText.classList.add('meal-name', 'd-flex', 'pt-3', 'justify-content-center', 'align-items-center');

    const mealName = document.createElement('h3');
    mealName.classList.add('fs-6', 'me-2', 'pt-1');
    mealName.innerHTML = data[i].strMeal;

    const likeBtn = document.createElement('i');
    likeBtn.classList.add('text-danger', 'bi', 'bi-heart');
    likeBtn.id = data[i].idMeal;

    mealText.appendChild(mealName);
    mealText.appendChild(likeBtn);
    mealItem.appendChild(mealText);

    const mealLikes = document.createElement('div');
    mealLikes.classList.add('like-count');

    const numOfLikes = document.createElement('small');
    numOfLikes.innerHTML = '0 Likes';
    mealLikes.appendChild(numOfLikes);
    mealItem.appendChild(mealLikes);

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment', 'mb-4', 'mt-2');

    const commentBtn = document.createElement('button');
    commentBtn.classList.add('btn', 'btn-warning', 'rounded-pill', 'px-4', 'shadow');
    commentBtn.innerHTML = 'Comments';
    commentContainer.appendChild(commentBtn);
    mealItem.appendChild(commentContainer);
    foodDiv.appendChild(mealItem);
    foodItemsDiv.appendChild(foodDiv);

    const likesArr = await getLikes();
    likesCounter(likeBtn, likesArr, numOfLikes);

    likeBtn.addEventListener('click', async (e) => {
      await createLike(likeBtn.id);
      const newLikes = await getLikes();
      likesCounter(e.target, newLikes, numOfLikes);
    });
  }
};

// const displayMeals = (food) => {
//   const foodDiv = document.createElement('div');
//   foodDiv.className = 'col-lg-4';
//   foodDiv.innerHTML = `
//       <div class="meal-item text-center card shadow mb-4 border-0">
//         <div class="meal-img bg-light">
//           <img src="${food.strMealThumb}" alt="Meal Image">
//         </div>
//         <div class="meal-name d-flex pt-3 justify-content-center align-items-center">
//           <h3 class="fs-6 me-2 pt-1">${food.strMeal}</h3>
//           <i class="text-danger bi bi-heart" role="button"></i>
//         </div>
//         <div class="like-count">
//           <small class="text-muted">2 Likes</small>
//         </div>
//         <div class="comment mb-4 mt-2">
//           <button class="btn btn-warning rounded-pill px-4 shadow">Comments</button>
//         </div>
//       </div>
//     `;
//   foodItemsDiv.appendChild(foodDiv);
// };

export default mealList;
