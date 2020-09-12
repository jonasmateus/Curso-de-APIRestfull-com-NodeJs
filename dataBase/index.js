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
                tags: ['Bootstrap', 'frontend'],
                author: 'Mosh',
                isPublished: true
        })
        const result = await course.save()
        console.log(result)
        
}

// createCourse()

async function getCourses () {
        // eq (equal)
        // ne (not equl)
        // gt (greater than)
        // gte (greater than or equal to)
        // lt (less than)
        // lte (less than or equal to)
        // in 
        // nin (not in)
        // or 
        // and

        const courses = await Course
        .find({ author: 'Mosh',  isPublished: true })
        // .find({ price: { $gte: 10, $lte: 20}})
        // .find({ price: { $in: [10, 15, 20] }})
        // .find().or([ { author: 'Mosh' }, { isPublished: true } ]).and([ ])
        // Starts with Mosh
        // .find({ author: /^Mosh/})
        // Ends with Hamedani, (case insensitive)
        // .find({ author: /Hamendani$/i})
        // Contains Mosh, (case insensitive)
        // .find({ author: /.*Mosh.*/i})
        .limit(10)
        .sort({ name: 1 })
        // .select({ name: 1, tags: 1 })
        .countDocuments()
        console.log(courses)        
}
 getCourses()