// Dependencies
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

// Connect to the database
async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', { useNewUrlParser: true });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connectToMongoDB();

const app = express()
const port = 3000;

app.use(express.static("public"))

// Variables needed to display the current date

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}/${month}/${year}`;


// Schemas for daily and weekly task

const daySchema = new mongoose.Schema({
    task: String
});

const weekSchema = new mongoose.Schema({
    task: String
});

// Models

const DayTask = mongoose.model("DayTask", daySchema);

const WeekTask = mongoose.model("WeekTask", weekSchema);

// Insert 1 variable in each collection

const daily = new DayTask({
    task: "Buy sugar"
})

const weekly = new WeekTask({
    task: "Go to the gym"
})


// If you want to test, save and insert, then comment out to avoid repetition

// daily.save();

// weekly.save();


// Paths

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const dayTasks = await DayTask.find({});
        const weekTasks = await WeekTask.find({});
        res.render('index.ejs', { dayTasks, currentDate, weekTasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Error fetching tasks');
    }
});


app.post('/submit', (req, res) => {
    let newDayTask = req.body["task"];
    if (newDayTask !== "") {
        const newDay = new DayTask({
            task: newDayTask
        })
        newDay.save()
    };
    res.redirect('/')
})

app.post('/submit2', (req, res) => {
    let newWeekTask = req.body["weeklyTask"];
    if (newWeekTask !== "") {
        const newWeek = new WeekTask({
            task: newWeekTask
        })
        newWeek.save()
    };
    res.redirect('/')
})

// Delete posts Day
app.post('/delete', async (req, res) => {
    const selectedId = req.body.taskId;
    const deleteTask = await DayTask.findOneAndDelete(
        { _id: selectedId }
    )

    res.redirect('/');
});


app.post('/delete2', async (req, res) => {
    const selectedId = req.body.taskId;
    const deleteTask = await WeekTask.findOneAndDelete(
        { _id: selectedId }
    )

    res.redirect('/');
});


app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})
