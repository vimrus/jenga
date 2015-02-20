<?php
class ProjectsHandler extends AuthHandler 
{
    public function get()
    {
    }

    public function post()
    {
        $name = $_POST['name'];
        $desc = $_POST['desc'];
        $idProject = $this->loadModel('project')->create($name, $desc, $this->idMember);

        return $this->json(200, $idProject);
    }
}

class ProjectHandler extends Handler 
{
    public function get()
    {
    }
}
