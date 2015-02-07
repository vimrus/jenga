<?php
include('bootstrap.php');

$jenga = new Jenga();

$jenga->route(array(
    '/' => 'index/index',
    '/organizations' => 'organization/create',
    '/organizations/:organization_id' => 'organization/info',
    '/projects/' => 'project/create',
    '/projects/:project_id' => 'project/info',
    '/entries' => 'entry/create',
    '/entries/:entry_id' => 'entry/info',
    '/tasks' => 'task/create',
    '/tasks/:task_id' => 'task/info',
    '/members' => 'member/create',
    '/members/:member_id' => 'member/info',
    '/actions' => 'action/create',
    '/actions/:action_id' => 'action/info',
));

$jenga->run();
