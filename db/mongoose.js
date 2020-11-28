const mongoose = require('mongoose');
const {connect} = mongoose;
require('dotenv').config();

const db = async () => {
    try {
        const success = await connect(process.env.DATABASE, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB connected');
    }catch(e) {
        console.log('DB Connection Error');
    }
};

module.exports = db;