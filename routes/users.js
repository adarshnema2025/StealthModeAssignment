const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;