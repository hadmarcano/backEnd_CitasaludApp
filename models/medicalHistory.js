const mongoose = require('mongoose');
const { stringify } = require('uuid');
const { Schema, model, ObjectId } = mongoose;

// Medical History Schema ...

const medicalHistorySchema = new Schema(
    {
       specialist: {type: ObjectId, ref: 'Specialist'},
       user : {type: ObjectId, ref: 'User'},
       firstName: String,
       lastName: String,
       date: {type: Date},
       description: {type: String}
    }
)

const MedicalHistory = model('MedicalHistory', medicalHistorySchema);

module.exports = MedicalHistory;