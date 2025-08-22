import bcrypt from 'bcrypt';

// you can ust accept saltround here too, but it should also have a default value

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; 
    return await bcrypt.hash(password, saltRounds);
};

// this utility function hashes a password using bcrypt
// it takes a plain text password as input and returns a hashed version
// the salt rounds determine the complexity of the hashing process
// this function is used in the authentication module of the application
// it ensures that user passwords are securely stored in the database
// it is part of the security measures to protect user credentials
// it is used in the registration process to hash user passwords before saving them to the database