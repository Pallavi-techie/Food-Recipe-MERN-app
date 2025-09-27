// const mongoose=require("mongoose")

// const recipeSchema=mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     ingredients:{
//         type:Array,
//         required:true
//     },
//     instructions:{
//         type:String,
//         required:true
//     },
//     time:{
//         type:String,
//     },
//     coverImage:{
//         type:String,
//     },
//     createdBy:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     }

// },{timestamps:true})

// module.exports=mongoose.model("Recipes",recipeSchema)
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: "N/A"
    },
    coverImage: {
      type: String,
      default: ""
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
