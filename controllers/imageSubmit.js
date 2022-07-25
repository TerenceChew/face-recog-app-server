const handleImageSubmit = (db) => async (req, res) => {
  const { id } = req.body;

  let [ response ] = await db('users')
    .where({id: id})
    .increment({rank: 1})
    .returning('rank');

  if (response) {
    res.json(response.rank);
  } else {
    res.status(400).json('Failed to update rank!');
  }
}

module.exports = {
  handleImageSubmit
};