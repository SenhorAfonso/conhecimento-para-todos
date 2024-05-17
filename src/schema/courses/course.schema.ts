import { Schema,  model } from 'mongoose';

const courseSchema = new Schema({
  title:          String,
  studentQnt:     Number,
  price:          Number,
  teacher:        String,
  description:    String

});