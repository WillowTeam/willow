const knex = require('../../database/index');

module.exports = saveNodesAndLinks = (nodes, links) => {
  let allUpdates = [...nodes, ...links];

  return Promise.all(allUpdates.map(entry => {
    // if the entry is a node --> update 'Nodes' table
    if (entry.hasOwnProperty('node_data')) {
      if (entry.status === 'new') {
        delete entry.status;
        return knex('nodes').insert(entry);
      } else if (entry.status === 'updated') {
        delete entry.status;
        return knex('nodes').where('hash_id', '=', entry.hash_id).update(entry);
      } else if (entry.status === 'delete') {
        return knex('nodes').where('hash_id', '=', entry.hash_id).del();
      }

      // else: update 'Links' table
    } else {
      if (entry.status === 'new') {
        delete entry.status;
        return knex('links').insert(entry);
      } else if (entry.status === 'updated') {
        delete entry.status;
        return knex('links').where('hash_id', '=', entry.hash_id).update(entry);
      } else if (entry.status === 'delete') {
        return knex('links').where('hash_id', '=', entry.hash_id).del();
      }
    }
  }));
};