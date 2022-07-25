const handleSignIn = (bcrypt, db) => async (req, res) => {
  const { email, password } = req.body;
  
  // query from login table to get hash
  // if query fails, undefined will be returned
  let [ response ] = await db.select('hash')
  .from('login')
  .where({email: email});

  if (response) {
    bcrypt.compare(password, response.hash, async (err, result) => {
      if (result) {
        // query from users table to get user
        // if query fails, undefined will be returned
        let [ user ] = await db.select('*')
        .from('users')
        .where({email: email});

        if (user) {
          res.json(user);
        } else {
          res.status(400).json('Failed to fetch user!');
        }
      } else {
        console.log(err);
        res.status(400).json('Email and password do not match!');
      } 
    });
  } else {
    res.status(400).json('User does not exist!');
  }
};

module.exports = {
  handleSignIn
};


