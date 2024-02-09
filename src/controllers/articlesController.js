const Article = require('../models/articleModel');

// Get all articles

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single article by ID

const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new article

const createArticle = async (req, res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
    });

    try {
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an article

const updateArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Update fields

        article.title = req.body.title || article.title;
        article.content = req.body.content || article.content;
        article.tags = req.body.tags || article.tags;

        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an article

const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        await article.remove();
        res.json({ message: 'Deleted Article' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
};
