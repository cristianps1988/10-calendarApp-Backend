const { Schema, model } = require('mongoose')

const TeacherSchema = Schema({
    name: {
        type: String,
        required: true
    },
    nationalId: {
        type: Number,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

TeacherSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Teacher', TeacherSchema)