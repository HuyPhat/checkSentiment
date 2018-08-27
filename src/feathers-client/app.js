import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import config from '../config';

const { apiDomain } = config;
const host = apiDomain;

// const socket = io('http://multi-branch-checker.advosights.com');
const socket = io(host);
const client = feathers();

client.configure(feathers.socketio(socket, { timeout: 500000 }));
client.configure(
  feathers.authentication({
    storage: window.localStorage
  })
);

export default client;
