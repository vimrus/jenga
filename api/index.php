<?php
include('bootstrap.php');

$app = new Jenga();

$app->get('/actions', 'action/list');
$app->get('/actions/:action_id', 'action/info');
$app->post('/actions', 'action/create');
$app->put('/actions/:action_id', 'action/update');
$app->delete('/actions', 'action/delete');

$app->get('/projects', 'project/list');
$app->get('/projects/:project_id', 'project/info');
$app->post('/projects', 'project/create');
$app->put('/projects/:project_id', 'project/update');
$app->delete('/projects/:project_id', 'project/delete');

$app->get('/entries', 'entry/list');
$app->get('/entries/:entry_id', 'entry/info');
$app->post('/entries', 'entry/create');
$app->put('/entries/:entry_id', 'entry/update');
$app->delete('/entries/:entry_id', 'entry/delete');

$app->get('/tasks', 'task/list');
$app->get('/tasks/:action_id', 'task/info');
$app->post('/tasks', 'task/create');
$app->put('/tasks/:task_id', 'task/update');
$app->delete('/tasks/:task_id', 'task/delete');

$app->run();
