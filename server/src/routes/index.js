require('dotenv').config();
const express = require('express');

const router = express.Router();

// Controller
// import controller function here
const { getUsers, getUser, updateUser, deleteUser, getUserBooks, getUserTransactions, userBookList, addUserProfile, updateUserProfile } = require('../controllers/user');

const { addBook, getBooks, getBook, updateBook, deleteBook, addCategoryBook } = require('../controllers/book');

const { getTransactions, addTransaction, getTransaction, updateTransaction } = require('../controllers/transaction');

const { getCategories, getCategory, addCategory, updateCategory, deleteCategory } = require('../controllers/category');

const { register, login, checkAuth } = require('../controllers/auth');

const { auth } = require('../middlewares/auth');

const { uploadFile } = require('../middlewares/uploadFile');

// Route User
router.get('/users', auth, getUsers);
router.get('/user/:id', auth, getUser);
router.patch('/user/:id', auth, updateUser);
router.delete('/user/:id', auth, deleteUser);

router.get('/user-books', getUserBooks);
router.get('/user-transactions', getUserTransactions);

router.post('/add-book-to-user-list', auth, userBookList);

router.post('/add-profile', auth, addUserProfile);
router.patch('/update-profile', auth, updateUserProfile);

//Route Book
router.post('/book', auth, uploadFile('bookFile'), addBook);
router.get('/books', auth, getBooks);
router.get('/book/:id', auth, getBook);
router.patch('/book/:id', auth, updateBook);
router.delete('/book/:id', auth, deleteBook);
router.post('/add-category-to-book/:id', addCategoryBook);

//Route Transaction
router.get('/transactions', auth, getTransactions);
router.get('/transaction/:id', auth, getTransaction);
router.post('/transaction', auth, uploadFile('transferProof'), addTransaction);
router.patch('/transaction/:id', auth, updateTransaction);


//Router Category
router.get('/categories', getCategories);
router.get('/category/:id', getCategory);
router.post('/category', addCategory);
router.patch('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

//Router Register
router.post('/register', register);

//Route Login
router.post('/login', login);

//Route Check Auth
router.get('/check-auth', auth, checkAuth);

module.exports = router;