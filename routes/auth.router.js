const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

const router = express.Router();

router.get(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const payload = {
        sub: req.user.id,
        role: req.user.role,
      };

      const token = jwt.sign(payload, config.jwtSecret);
      res.json({ user: req.user, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
