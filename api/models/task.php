<?php
class TaskModel extends Model
{
    public function getList($project_id)
    {
        $this->db->bind('project', $project_id);
        return $this->db->query("SELECT * from task where project = :project");
    }
}
