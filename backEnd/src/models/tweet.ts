import { Document, Schema, Model, model } from 'mongoose'
import moment from 'moment';

interface ITweet extends Document {
  name: string
  message: string
  createdAt: string
}

const tweetSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: moment().format("M/D/YYYY, h:mm:ss a")
  }
})

const Tweet: Model<ITweet> = model('Tweet', tweetSchema)

export { ITweet, Tweet }
