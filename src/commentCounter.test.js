import commentCount from './commentCounter';

describe('test comment count function', () => {
  test('test number of comments from the API', () => {
    const comment = [
      {
        comment: 'This is nice',
        creation_date: '2021-11-18',
        username: 'Qoosim',
      },
      {
        comment: 'It is lovely',
        creation_date: '2021-11-19',
        username: 'Catherine',
      },
      {
        comment: 'Awesome meal',
        creation_date: '2021-11-19',
        username: 'Abel',
      },
    ];
    expect(commentCount(comment)).toBe(3);
  });
});
