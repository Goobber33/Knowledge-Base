const express = require('express');
const router = express.Router();

import { createQuestion, getAllQuestions, getQuestionById } from '../controllers/questionsController';

// create question
router.post("/questions-create", createQuestion);
// get questions
router.post("/", getAllQuestions);
router.post("/:id", getQuestionById);