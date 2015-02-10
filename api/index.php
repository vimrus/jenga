<?php
include('bootstrap.php');

$routes = array(
    '/actions' => 'action/actionsHandler',
    '/actions/:action_id' => 'action/actionHandler',
    '/projects' => 'project/projectsHandler',
    '/projects/:project_id' => 'project/projectHandler',
    '/entries' => 'entry/entriesHandler',
    '/entries/:entry_id' => 'entry/entryHandler',
    '/tasks' => 'task/taskHandler',
    '/tasks/:task_id' => 'task/taskHandler',
);

$app = new Jenga($routes);
$app->run();
