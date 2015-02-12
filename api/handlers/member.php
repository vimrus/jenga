<?php
class MembersHandler extends Handler 
{
    public function get()
    {
    }
}

class MemberHandler extends Handler
{
    public function get($member_id)
    {
        if($member_id == 'me')
        {
            $member_id = session('member_id');
            if($member_id)
            {
                $member = $this->member->getByID($member_id);
                if($member) return $this->json(200, $member);
            }
            $data = new stdclass();
            return $this->json(401, $data);
        }
        else
        {
            $member = new stdclass();
            $member->username = 'vimrus';
        }
        $this->json(200, $member);
    }
}
