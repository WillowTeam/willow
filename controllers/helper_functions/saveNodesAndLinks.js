const knex = require('../../database/index');

exports.saveNodes = (nodes) => {
  return Promise.all(nodes.map(entry => {
    console.log('nodes: ', { entry });
    if (entry.status === 'new') {
      delete entry.status;
      return knex('nodes').insert(entry);
    } else if (entry.status === 'updated') {
      delete entry.status;
      return knex('nodes').where('hash_id', '=', entry.hash_id).update(entry);
    } else if (entry.status === 'delete') {
      return knex('nodes').where('hash_id', '=', entry.hash_id).del();
    }
  }));
};

exports.saveLinks = (links) => {

  return Promise.all(links.map(entry => {
    console.log('links: ', { entry })
    if (entry.status === 'new') {
      delete entry.status;
      return knex('links').insert(entry);
    } else if (entry.status === 'updated') {
      delete entry.status;
      return knex('links').where('hash_id', '=', entry.hash_id).update(entry);
    } else if (entry.status === 'delete') {
      return knex('links').where('hash_id', '=', entry.hash_id).del();
    }
  }));
};

exports.saveProject = (project) => {
  return knex('projects').where('id', '=', project.id).update(project);
};