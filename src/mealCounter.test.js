import mealCounter from './mealCounter';

describe('Returns number of items on the homepage', () => {
  it('returns 0 if the meals array is empty', () => {
    const mealsArray = [];
    expect(mealCounter(mealsArray)).toBe(0);
  });

  it('returns the number of meals in the mealsArray ', () => {
    const mealsArray = [
      {
        strMeal: 'Chicken Handi',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
        idMeal: '52795',
      },
    ];
    expect(mealCounter(mealsArray)).toBe(1);
  });
});