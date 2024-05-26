const recipes = require('../data');
const Recipe = require('../models/recipe');

exports.getRecipes = (req, res) => {
    res.render('recipes/list', { recipes });
};

exports.getRecipeForm = (req, res) => {
    res.render('recipes/add');
};

exports.addRecipe = (req, res) => {
    const { name, ingredients, instructions, prepTime } = req.body;
    const newRecipe = new Recipe(
        recipes.length + 1,
        name,
        ingredients.split(',').map(ingredient => ingredient.trim()),
        instructions,
        prepTime
    );
    recipes.push(newRecipe);
    res.redirect('/');
};

exports.getEditRecipeForm = (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (recipe) {
        res.render('recipes/edit', { recipe });
    } else {
        res.status(404).send("Recipe not found.");
    }
};

exports.submitEditRecipe = (req, res) => {
    const { id, name, ingredients, instructions, prepTime } = req.body;
    const index = recipes.findIndex(r => r.id === parseInt(id));
    if (index !== -1) {
        recipes[index] = {
            ...recipes[index],
            name,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
            instructions,
            prepTime
        };
        res.redirect('/');
    } else {
        res.status(404).send("Recipe not found.");
    }
};

exports.deleteRecipe = (req, res) => {
    const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        recipes.splice(index, 1);
        res.redirect('/');
    } else {
        res.status(404).send("Recipe not found.");
    }
};

exports.addComment = (req, res) => {
    const { recipeId, author, text } = req.body;
    const recipe = recipes.find(r => r.id === parseInt(recipeId));
    if (recipe) {
        recipe.addComment(author, text);
        res.redirect('/#recipe-' + recipeId);
    } else {
        res.status(404).send("Recipe not found.");
    }
};

exports.addRating = (req, res) => {
    const { recipeId, score } = req.body;
    const recipe = recipes.find(r => r.id === parseInt(recipeId));
    if (recipe) {
        recipe.addRating(parseInt(score));
        res.redirect('/#recipe-' + recipeId);
    } else {
        res.status(404).send("Recipe not found.");
    }
};
