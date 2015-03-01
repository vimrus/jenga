<?php
include('bootstrap.php');

$routes = array(
    '/actions' => 'action/ActionsHandler',
    '/actions/:action_id' => 'action/ActionHandler',
    '/projects' => 'project/ProjectsHandler',
    '/projects/:project_id' => 'project/ProjectHandler',
    '/projects/:project_id/tasks' => 'project/ProjectTasksHandler',
    '/projects/:project_id/docs' => 'project/ProjectDocsHandler',
    '/entries' => 'entry/EntriesHandler',
    '/entries/:entry_id' => 'entry/EntryHandler',
    '/tasks' => 'task/TaskHandler',
    '/tasks/:task_id' => 'task/TaskHandler',
    '/members' => 'member/MembersHandler',
    '/members/:member_id' => 'member/MemberHandler',
    '/tokens' => 'token/TokensHandler',
);

$app = new Jenga($routes);
$app->run();
