<?php
class MembersHandler extends AuthHandler 
{
    public function get()
    {
    }
}

class MemberHandler extends AuthHandler
{
    public function get($member_id)
    {
        if($member_id == 'me')
        {
            $member = $this->loadModel('member')->getByID($this->idMember);
            if($member) return $this->json(200, $member);
        }
        else
        {
            $member = new stdclass();
            $member->username = 'vimrus';
        }
        $this->json(200, $member);
    }
}
