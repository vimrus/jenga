<?php
include('bootstrap.php');

$jenga = new Jenga();

$jenga->route(array(
    '/' => 'index/index',
));

$jenga->config('config/jenga.php');
$jenga->run();
