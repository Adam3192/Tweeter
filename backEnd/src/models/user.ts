import { Document, Schema, Model, model } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    createdAt: Date
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        // allowNull: false,
        default: Date.now,
      }
});

const User: Model<IUser> = model('User', userSchema);

export { IUser, User };