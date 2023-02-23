const Project = require("../models/project");
const User = require("../models/models");
const jwt = require('jsonwebtoken');

// if a user is logged in, create a new project
async function createNewProject(req, res) {
    try {
        const projectId = req.body.id;
        const projectName = req.body.name;
        const leadRole = req.body.leadRole;
        const projectLeadEmail = req.body.projectLeadEmail;
        await Project.create({
            id: projectId,
            name: projectName,
            projectLead: projectLead,
            leadRole: leadRole,
            projectLeadEmail: projectLeadEmail
        });
        res.status(201).json({ message: "Project created successfully!" });
        // check if the user is logged in
        // const token = req.cookies.jwt;
        // if (!token) {
        //     return res.status(401).json({ message: "You are not logged in!(1)" });
        // }
        // else {
        //     // decode the token
        //     const decoded = jwt.verify(token, process.env.SECRET_KEY);
        //     // find the user with this token
        //     const user = await User.findById(decoded.sub);
        //     if (!user) {
        //         return res.status(401).json({ message: "You are not logged in!(2)" });
        //     }
        //     else if (user.role == "SDE2" || user.role == "SDE3") {
        //         // create a new project
        //         await Project.create({
        //             id: projectId,
        //             name: projectName,
        //             projectLead: projectLead,
        //             leadRole: leadRole
        //         });
        //         res.status(201).json({ message: "Project created successfully!" });
        //     }
        //     else {
        //         res.status(401).json({ message: "You are not authorized to create a new project!" });
        //     }
        // }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

module.exports = {
    createNewProject
}



