<?php
class ProjectsHandler extends AuthHandler 
{
    public function get()
    {
        $projects = $this->loadModel('project')->getList();
        return $this->json(200, $projects);
    }

    public function post()
    {
        $name = $_POST['name'];
        $desc = $_POST['desc'];
        $projectID = $this->loadModel('project')->create($name, $desc, $this->idMember);

        return $this->json(200, $projectID);
    }
}

class ProjectTasksHandler extends AuthHandler 
{
    public function get($project_id)
    {
        $tasks = $this->loadModel('task')->getList($project_id);
        return $this->json(200, $tasks);
    }
}

class ProjectHandler extends Handler 
{
    public function get($project_id)
    {
        $project = $this->loadModel('project')->getById($project_id);
        return $this->json(200, $project);
    }
}
