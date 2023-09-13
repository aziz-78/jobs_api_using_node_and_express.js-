require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const auth_route = require("./routes/auth")
const jobs_route = require("./routes/jobs")
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use("/api/v1/auth",auth_route)
app.use("/api/v1/jobs",jobs_route)
app.use(express.json());
const connectDB = require("./db/connect")
// extra packages

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
