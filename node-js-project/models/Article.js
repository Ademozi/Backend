const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for the Article model
const articleSchema = new Schema({
    title: String,
    body: String,
    numberOfLikes: Number,
});

// Create a model based on the schema
// we nemed the model "Article" because we want to create a collection called "articles" in the database.
// Mongoose will automatically pluralize the model name to create the collection name.
const Article = mongoose.model("Article", articleSchema);

// Export the model so it can be used in other files
module.exports = Article;