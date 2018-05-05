const fs = require('fs');
const path = require('path');
const formatProjectData = require('./helper_functions/formatProjectData');

const knex = require('../database/index');

exports.test = (req, res) => {
    const dataPath = path.join(path.dirname(__dirname),'/dummy_data/graph_data.json');
    
    fs.readFile(dataPath, (err, data) => {
        console.log(data);
        if (err) console.error(err);
        res.send(JSON.parse(data));
    })
};

exports.postUser = (req, res) => {

    // UPDATE TO REQ.BODY.__________ for each line OR format req.body before sending
    let userData = {
        first_name: 'Steve',
        last_name: 'Jones',
        username: 'steveJones',
        email: 'steveJones@aol.com',
        hashed_password: '123456',
    };

    knex('users').insert(userData).then(result => {
        console.log('result: ', result);
        res.status(200).send(result);
    }).catch(err => {
        console.log('err: ', err);
        res.status(500).send(err);
    });
};

exports.getProjectData = (req, res) => {
    let projectID = req.query.id;

    console.log(req);

    // knex('labels').then(results => { res.status(200).send(results) }).catch(err => { res.status(500).send(err) });

    Promise.all([
        knex('projects').where('id', projectID),
        knex('nodes').where('project_id', projectID),
        knex('links').where('project_id', projectID),
        knex('labels')
    ]).then(results => {
        let projectData = {
            project: results[0][0],
            nodes: results[1],
            links: results[2],
            labels: results[3],
        }
        let formattedData = formatProjectData(projectData);
        res.status(200).send(formattedData);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
};
