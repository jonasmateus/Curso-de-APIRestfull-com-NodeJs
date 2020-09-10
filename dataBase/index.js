const mongoose = require('mongoose')

async function connectToMongo() {
        return await mongoose.connect('mongodb://127.0.0.1/playground', {
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

async function createCourse() {
        const course = new Course({
                name: 'Bootstrap Course',
                author: 'Mosh',
                tags: ['Bootstrap', 'frontend'],
                isPublished: true
        })
        const result = await course.save()
        console.log(result)
        
}

// createCourse()

async function getCourses () {
        const courses = await Course.find({
                author: 'Mosh', 
                isPublished: true,
        })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
        console.log(courses)        
}

 getCourses()