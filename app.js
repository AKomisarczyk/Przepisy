const express = require('express');
const bodyParser = require('body-parser');
const recipeController = require('./controllers/recipesCont');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', recipeController.getRecipes);
app.get('/add', recipeController.getRecipeForm);
app.post('/add', recipeController.addRecipe);
app.post('/add-comment', recipeController.addComment);
app.post('/add-rating', recipeController.addRating);
app.get('/edit/:id', recipeController.getEditRecipeForm);
app.post('/edit/:id', recipeController.submitEditRecipe);
app.get('/delete/:id', recipeController.deleteRecipe);

app.use((req, res) => {
    res.status(404).send('404: Page Not Found');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});