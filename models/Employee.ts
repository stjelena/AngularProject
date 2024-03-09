import mongoose from "mongoose";

const Schema = mongoose.Schema

let Employee = new Schema({
    Id:{
        type: String
    },
    EmployeeName:{
        type: String
    },
    StarTimeUtc:{
        type:String
    },
    EndTimeUtc:{
        type: String
    },
    EntryNotes:{
        type: String
    },
    DeletedOn:{
        type: String
    }
})

export default mongoose.model('Employee', Employee, 'staff')