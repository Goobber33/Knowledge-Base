import Answers from "../models/answerModel";
import Questions from "../models/questionModel";
import UserModel from '../models/userModel';

export const createQuestion = async(req, res, next) => {
    try {
        const { userId } = req.body.user;
        const { title, description, image } = req.body;

        if (!title || !description) {
            next("Please provide a title AND description for your question");
            return;
        }

        const question = await Questions.create({
            userId,
            title,
            description,
            image,
        });

        res.status(200).json({
            success: true,
            message: "Question posted successfully",
            data: question,
        })
    }catch (error){
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getAllQuestions = async(req, res, next) => {
    try{
        const questions = await Questions.findAll();

        if(questions.length === 0){
            res.status(404).json({
                success: false,
                message: "No Questions posted yet."
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Questions retrieved",
            data: questions
        });
    }catch (error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
};

export const getQuestionById = async(req, res, next) =>{
    try{
        const { questionId } = req.params();
        const question = Questions.findById(questionId);
        if(!question){
            return res.status(404).json({
                success: false,
                message: "Question not found."
            });
        }
        res.status(200).json({
            success: true,
            message: "Question found successfully",
            data: question
        });
    }catch(error){
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid question ID format." });
        }
        console.error(error);
        res.status(500).json({ message: "Server error while retrieving the question." });
    }
}