<?php
class AuthHandler extends Handler
{
    public $idMember;

    public function __construct()
    {
        if($_GET['token'])
        {
            $idMember = $this->loadModel('token')->getMemberByToken($_GET['token']);
            return $this->idMember = $idMember;
        }
        $this->json(401, '');
        exit;
    }
}
