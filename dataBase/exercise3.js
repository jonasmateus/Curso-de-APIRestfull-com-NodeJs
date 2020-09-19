const mongoose = require('mongoose')

async function connectToMongo() {
        return await mongoose.connect('mongodb://localhost/playground', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
        })
}

const myDataBaseConnection = connectToMongo()

myDataBaseConnection
        .then(() => console.log('Database connected...'))
        .catch((erro) => console.error('DataBase NOT connected...', erro))

const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)
                
async function getCourses() {
        return await Course
        .find({ isPublished: true })
        .or([
            {
                price: { $gte: 15 }
            },
            { 
                name: /.*by.*/ 
            }
        ])
}

async function run() {
        const courses = await getCourses()
        console.log(courses)
}

run()