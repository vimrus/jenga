var client = new $.RestClient('/api/', {token: localStorage.token});
client.add('members');
client.add('tokens');
client.add('projects');
client.projects.add('tasks');
client.projects.add('docs');
client.projects.add('topics');
client.projects.add('entries');

module.exports = client;
