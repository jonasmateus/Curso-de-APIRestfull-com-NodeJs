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

// Query first approuch
// async function updateCourse(id) {

//     const course = await Course.findById(id)

//     if(!course) return
//     // course.isPublished = true
//     // course.author = 'Another Course'

//     course.set({
//         isPublished: true,
//         author: 'Another Author'
//     })

//     const result = await course.save()
//     console.log(result)
// }

// Upadate firts approuch
async function updateCourse(id) {

    const course = await Course.findByIdAndUpdate({ _id: id }, {
        $set: {
            author: "Jonas Mateus",
            isPublished: true
        }
    }, { new: true })

    console.log(course)
}

async function removeCourse (id) {

    const result = await Course.deleteOne({ _id: id })
    console.log(result);
}

// updateCourse('5f598ce43df3ea2ca89ad1a2')

removeCourse("5f598a1006fbb02a000b15bc")