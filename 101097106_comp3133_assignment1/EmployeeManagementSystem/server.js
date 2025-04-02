const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const root = require('./schema/resolvers');
const cors = require('cors')
require('dotenv').config()
const DB_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:4000/graphql`);
});