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
        name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
                // match: /RegEx/
        },
        tags: {
                type: Array,
                //Async validator are commented
                validate: {
                        // isAsync: true,
                        validator: function (value) { return value && value.length > 0 },
                        // validator: function (value, callback) {
                        //         setTimeout(() => {
                        //                 const result = value && value.length > 0
                        //                 callback(result)
                        //         }, 5000)
                        // },
                        message: 'The course should has at least one tag'
                }
        },
        author: String,
        isPublished: Boolean,
        price: {
                type: Number,
                required: function () { return this.isPublished },
                min: 10,
                max: 200,
                set: value => Math.round(value),
                // get: value => Math.round(value) when the value will be read from
                // the database
        },
        category: {
                type: String,
                required: true,
                enum: ['web', 'frontend-lib', 'mobile'],
                lowercase: true
        }
})

const Course = mongoose.model('Course', courseSchema)
                
async function createCourse() {

        const course = new Course({
                // name: 'jQuery Course',
                tags: ['jQuery', 'frontend'],
                author: 'Mosh',
                isPublished: true
        })

        try {
            const result = await course.save()
            console.log(result)
            // await course.validate()
        }
        catch (err) {
            console.log(err.message)
        }
        
}

async function createValidCourse() {

    const course = new Course({
            name: 'Futter Course',
            tags: ['Mobile framework'],
        //     tags: null, Async validation testing
            author: 'Jonas Mateus',
            price: 37.69,
            category: 'Mobile',
            isPublished: true
    })

    try {
        const result = await course.save()
        console.log(result)
        // await course.validate()
    }
    catch (error) {
        console.log(error.message)
        // for ( errorPos in error.errors ) {
        //         console.log(error.errors[errorPos])
        // }
    }
    
}

createValidCourse()

// createCourse()