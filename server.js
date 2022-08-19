let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const productRouter = require('./routes/products');
app.use('/products', productRouter);

const allordersRouter = require('./routes/orders');
app.use('/allorders', allordersRouter);

const cartRouter = require('./routes/cart');
app.use('/cart', cartRouter);

const categoryRouter = require('./routes/categories');
app.use('/category', categoryRouter);

const checkOut = require('./routes/checkout');
app.use('/checkout', checkOut);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(` Server is runing on: Port: ${port}`)
})


