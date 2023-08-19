const { Schema, model } = require('mongoose')

const EventSchema = Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

EventSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Event', EventSchema)