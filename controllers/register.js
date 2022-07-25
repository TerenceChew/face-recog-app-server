const handleRegister = (bcrypt, db) => (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    if (hash) {
      try {
        await db.transaction(async trx => {
          let [ user ] = await trx('users')
            .insert({
              name: name, 
              email: email,
              joined: new Date()
            }, '*');
    
          await trx('login')
            .insert({
              email: email, 
              hash: hash
            })
          
          res.json(user);
        })
      } catch (err) {
        console.log(err);
        res.status(400).json("User already exist!");
      }
    } else {
      console.log(err);
      res.status(400).json("Please try another password!");
    }
  });
}

module.exports = {
  handleRegister
};


