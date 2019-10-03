var mongoose=require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type : String,
        required : true
    },
    options: {
        type: [String],
        required : true
    },
    answer :{
        type : String,
        required : true
    },
    testname : {
        type : String,
        required : true,
        default:1
    }
});
const question = mongoose.model('question', questionSchema);
module.exports = question;