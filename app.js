require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const auth_route = require("./routes/auth")
const jobs_route = require("./routes/jobs")
const Authentication = require("./middleware/authentication")
const helmet = require("helmet")
const cors = require("cors")
const xs_clean = require("xss-clean")
const rate_limiter = require("express-rate-limit")
// error handler
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

app.use(express.json());
app.use("/api/v1/auth",auth_route)
app.use("/api/v1/jobs",Authentication,jobs_route)

const connectDB = require("./db/connect")
// extra packages
app.use(helmet())
app.use(cors())
app.use(xs_clean())
app.use(rate_limiter({
  windowMs:15*60*1000,
max:100}))
// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.db_url)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
