var mongoose=require('mongoose');

const testDataSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    }
});
const testData = mongoose.model('testData',testDataSchema);
module.exports = testData;