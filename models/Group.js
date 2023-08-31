const { Schema, model } = require('mongoose')

const GroupSchema = Schema({
    semester: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

GroupSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Group', GroupSchema)