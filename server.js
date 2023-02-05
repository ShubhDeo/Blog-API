const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js')
const userRoutes = require('./routes/userRoute.js')
const blogRoutes = require('./routes/blogRoute.js')



const app = express();
dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());


connectDB();


//routes.
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);



const PORT = 5000 || process.env.PORT;
app.listen(PORT, (req, res) => {
    console.log(`Server started on PORT ${PORT}`);
})

module.exports = app;