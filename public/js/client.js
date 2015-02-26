var client = new $.RestClient('/api/', {token: localStorage.token});
client.add('members');
client.add('tokens');
client.add('projects');

module.exports = client;
