const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    projectLead: {
        type: String,
        required: true,
    },
    projectLeadEmail: {
        type: String,
        required: true,
    },
    leadRole: {
        type: String,
        required: true,
    },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;