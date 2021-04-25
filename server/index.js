const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport')

const app = express();
app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(cors());

app.use(passport.initialize());

require('./config/passport')(passport);

// app.use(express.static((path.join(__dirname, 'public'))))

const db = require('./config/keys').mongoURI
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log(`Database connected successfully`)
}).catch(err => console.log(`unable to connect with the database ${err}`))


const users = require('./routes/users')
const auditionRoute = require("./routes/audition");
const performerRoute = require("./routes/performer");
const scoreRoute = require("./routes/score");
// const awsRoute = require("./routes/aws");


app.use("/users", users);
app.use("/audition", auditionRoute);
app.use("/performer", performerRoute);
app.use("/score", scoreRoute);
// app.use("/aws", awsRoute);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})