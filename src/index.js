import './style.css';
import getMeals from './getMeals';
import { likesCount } from './functions';
import createLike from './createLike';
import getLikes from './getLikes';


// const numOfLikes = document.querySelector('.no-of-likes');

  // const likesArray = await getLikes();
  // likesCount(likeBtn, likesArray, numOfLikes);

  // likeBtn.addEventListener('click', async (e) => {
  //   await createLike(likeBtn.id);
  //   const newLikes = await getLikes();
  //   likesCount(e.target, newLikes, numOfLikes);
  // });

getMeals();