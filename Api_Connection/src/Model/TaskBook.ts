import { Schema, model } from 'mongoose';

const TaskBook = new Schema({
  title: { type: String, required: true },
  editorial: { type: String, required: true },
  edition: { type: String, required: true },
  author: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  enabled: { type: Boolean, require: true }
});

export default model("Book", TaskBook);
