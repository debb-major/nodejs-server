export interface IUser extends Document{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    generateAuthToken: () => string; // adding method signature for generating auth token
}