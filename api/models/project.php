<?php
class ProjectModel extends Model
{
    public function getById($project_id)
    {
        $this->db->bind('id', $project_id);
        $project = $this->db->fetch("SELECT * FROM project WHERE id = :id");

        $this->db->bind('project', $project_id);
        $entries = $this->db->fetchAll("SELECT * FROM entry WHERE project = :project", 'id');

        $this->db->bind('entries', implode(',', array_keys($entries)));
        $tasks = $this->db->fetchAll("SELECT * FROM task WHERE entry in (:entries) and deleted = 0", 'id');

        foreach($tasks as $task)
        {
            $entry = $task->entry;
            if(!isset($entries[$entry]->tasks)) $entries[$entry]->tasks = array();
            $entries[$entry]->tasks[$task->id] = $task;
        }
        $project->entries = $entries;

        return $project;
    }

    public function getList()
    {
        return $this->db->query("SELECT * FROM project where deleted = '0'");
    }

    public function create($name, $desc, $createdBy)
    {
        $this->db->bindMore(array(
            'name' => $name, 
            'desc' => $desc, 
            'createdBy' => $createdBy, 
            'createdTime' => date('Y-m-d H:i:s',time())
        ));
        $this->db->query("INSERT INTO project(name,`desc`,createdBy,createdTime) VALUES(:name,:desc,:createdBy,:createdTime)");
        return $this->db->lastInsertId();
    }
}
