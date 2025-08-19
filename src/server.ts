import app from './app.js';

// this is the entry point for the server
// it imports the Express app from app.js and starts the server on a specified port

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

