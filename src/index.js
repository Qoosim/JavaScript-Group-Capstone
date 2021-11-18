import './style.css';
import getMeals from './getMeals';
import mealList from './functions';

window.addEventListener('load', async () => {
  mealList(await getMeals());
});