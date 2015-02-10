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
        $member = new stdclass();
        $this->json(200, $member);
    }
}
