import { Document, Schema, Model, model, MixedSchemaTypeOptions, Mixed } from 'mongoose';
import moment from 'moment';

interface IUser extends Document {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    createdAt: string
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
        type: String,
        default: moment().format("M/D/YYYY, h:mm:ss a")
      }
});

const User: Model<IUser> = model('User', userSchema);

export { IUser, User };
