const mealsCounter = (data) => data.length;

const likesCount = (target, likesArr, numOfLikes) => {
  likesArr.forEach((obj) => {
    if (obj.item_id === target.id) {
      numOfLikes.innerHTML = `${obj.likes} Likes`;
    }
  });
};

export { mealsCounter, likesCount };