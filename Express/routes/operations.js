const Project = require("../models/project");
const User = require("../models/models");
const jwt = require('jsonwebtoken');

// if a user is logged in, create a new project
async function createNewProject(req, res) {
    try {
        const projectId = req.body.projectId;
        const projectName = req.body.projectName;
        const projectLead = req.body.projectLead;
        const leadRole = req.body.leadRole;
        const projectLeadEmail = req.body.projectLeadEmail;


        await Project.create({
            id: projectId,
            name: projectName,
            projectLead: projectLead,
            leadRole: leadRole,
            projectLeadEmail: projectLeadEmail,
        });
        console.log({
            id: projectId,
            name: projectName,
            projectLead: projectLead,
            leadRole: leadRole,
            projectLeadEmail: projectLeadEmail,
        });
        res.status(201).json({ message: "Project created successfully!" });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

module.exports = {
    createNewProject
}



