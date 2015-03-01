<?php
class ProjectModel extends Model
{
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
        return $this->db->query("INSERT INTO project(name,`desc`,createdBy,createdTime) VALUES(:name,:desc,:createdBy,:createdTime)");
    }
}
