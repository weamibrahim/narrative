
import mongoose, { Schema } from "mongoose";

const booksSchema = new Schema({
    author: String,
   name: String,
  
  body: String,
  
  

}, {
  timestamps: true
});

const books = mongoose.models.books || mongoose.model('books', booksSchema);

export default books;
