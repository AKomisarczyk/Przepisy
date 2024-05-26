const Comment = require('./comment');
const Rating = require('./rating');

class Recipe {
    constructor(id, name, ingredients, instructions, prepTime) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.prepTime = prepTime;
        this.comments = [];
        this.ratings = [];
    }

    addComment(author, text) {
        const comment = new Comment(author, text);
        this.comments.push(comment);
    }

    addRating(score) {
        const rating = new Rating(score);
        this.ratings.push(rating);
    }
}

module.exports = Recipe;