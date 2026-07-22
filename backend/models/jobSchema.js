import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minlength: [3, "Title must contain at least 3 Characters!"],
    maxlength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide description."],
    minlength: [100, "Description must contain at least 100 Characters!"],
    maxlength: [1000, "Description cannot exceed 1000 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minlength: [3, "Location must contain at least 3 characters!"],
  },
  fixedSalary: {
    type: Number,
    min: [1000, "Salary must contain at least 4 digits"],
    max: [1000000000, "Salary cannot exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    min: [1000, "Salary must contain at least 4 digits"],
    max: [1000000000, "Salary cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    min: [1000, "Salary must contain at least 4 digits"],
    max: [1000000000, "Salary cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
