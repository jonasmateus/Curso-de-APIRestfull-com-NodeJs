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
        .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
        // .find({ isPublished: true})
        // .or([ { tags: 'frontend' }, { tags: 'backend' } ])
        .sort({ price: -1 })
        .select({ name: 1, author: 1 })
}

async function run() {
        const courses = await getCourses()
        console.log(courses)
}

run()