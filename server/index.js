const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const app = express();

const postRouter = require('./routes/api/post');



//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/api/posts', postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
})
