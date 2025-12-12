const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const cowController = require('./controllers/cowController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ตั้งค่า View Engine เป็น EJS (ใช้เขียน HTML ร่วมกับ Logic แสดงผล)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', cowController.getIndex);
app.post('/check-milk', cowController.calculateMilk);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});