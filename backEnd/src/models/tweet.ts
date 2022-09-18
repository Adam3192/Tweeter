import { Document, Schema, Model, model } from 'mongoose'


interface ITweet extends Document {
  name: string
  message: string
  createdAt: Date
}

const tweetSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    // allowNull: false,
    default: Date.now,
  }
//   timestamps: {
//     createdAt: true,
//     updatedAt: false,
//   },
})

const Tweet: Model<ITweet> = model('Tweet', tweetSchema)

export { ITweet, Tweet }
