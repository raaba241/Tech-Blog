const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (res, req) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (res, req) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (res, req) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userNameBool = await User.findOne({ where: { userName: req.body.userName } });

    if (!userNameBool) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userNameBool.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userNameBool.id;
      req.session.logged_in = true;

      res.json({ user: userNameBool, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;