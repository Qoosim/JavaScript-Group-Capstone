const createLike = async (mealId) => {
  const response = await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/mfrWKMutGeXBQO8OVg4U/likes', {
    method: 'POST',
    body: JSON.parse({
      "item_id": mealId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.text();
};

export default createLike;