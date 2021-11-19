import './style.css';
import {
  getMealList,
} from './functions';

getMealList();
import getMeals from './getMeals';
import mealList from './mealList';

window.addEventListener('load', async () => {
  mealList(await getMeals());
});
