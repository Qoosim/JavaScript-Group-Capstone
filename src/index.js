import './style.css';
import getMeals from './functions';

const likesCounter = (target, likesArr, numOfLikes) => {
  likesArr.forEach((obj) => {
    if (obj.item_id === target.id) {
      numOfLikes.innerHTML = `${obj.likes} Likes`;
    }
  });
};

getMeals();
