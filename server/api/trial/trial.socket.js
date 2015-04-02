/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Trial = require('./trial.model');

exports.register = function(socket) {
  Trial.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Trial.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('trial:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('trial:remove', doc);
}