/* eslint-disable no-await-in-loop */
import createLike from './createLike';
import getLikes from './getLikes';
import mealCounter from './mealCounter';

const mainDiv = document.querySelector('#food-items');

const likesCount = (target, likesArray, numOfLikes) => {
  likesArray.forEach((obj) => {
    if (obj.item_id === target.id) {
      numOfLikes.innerHTML = `${obj.likes} likes `;
    }
  });
};

const mealList = async (data) => {
  const mealCount = document.querySelector('#home-count');
  mealCount.innerHTML = mealCounter(data);

  for (let i = 0; i <= data.length - 1; i += 1) {
    const foodDiv = document.createElement('div');
    foodDiv.classList.add('col-lg-4');

    const listItem = document.createElement('div');
    listItem.id = data[i].idMeal;
    listItem.classList.add('meal-item', 'text-center', 'card', 'shadow', 'mb-4', 'border-0');

    const itemImage = document.createElement('div');
    itemImage.classList.add('meal-img');

    const image = document.createElement('img');
    image.src = data[i].strMealThumb;

    itemImage.appendChild(image);
    listItem.appendChild(itemImage);

    const itemText = document.createElement('div');
    itemText.classList.add('meal-name', 'd-flex', 'pt-3', 'justify-content-center', 'align-items-center');

    const mealName = document.createElement('h3');
    mealName.classList.add('fs-6', 'me-2', 'pt-1');
    mealName.innerHTML = data[i].strMeal;

    const likeBtn = document.createElement('i');
    likeBtn.classList.add('bi', 'bi-heart', 'like-btn', 'text-danger');
    likeBtn.id = data[i].idMeal;

    itemText.appendChild(mealName);
    itemText.appendChild(likeBtn);
    listItem.appendChild(itemText);

    const mealLikes = document.createElement('div');
    const numOfLikes = document.createElement('small');
    numOfLikes.innerHTML = '0 likes';
    mealLikes.appendChild(numOfLikes);
    listItem.appendChild(mealLikes);

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment', 'mb-4', 'mt-2');

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-warning', 'rounded-pill', 'px-4', 'shadow', 'comment-btn');
    button.setAttribute('id', `${data[i].idMeal}`);
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#staticBackdrop');
    button.innerHTML = 'comments';

    commentContainer.appendChild(button);
    listItem.appendChild(commentContainer);

    foodDiv.appendChild(listItem);
    mainDiv.appendChild(foodDiv);

    const likesArray = await getLikes();
    likesCount(likeBtn, likesArray, numOfLikes);

    likeBtn.addEventListener('click', async (e) => {
      await createLike(likeBtn.id);
      const newLikes = await getLikes();
      likesCount(e.target, newLikes, numOfLikes);
    });
  }
};

export default mealList;