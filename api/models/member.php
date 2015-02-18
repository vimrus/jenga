<?php
class MemberModel extends Model
{
    public function authorize($account, $password)
    {
        $this->db->bind('account', $account);
        $member = $this->db->row("SELECT * FROM member WHERE account = :account");

        if(!$member) return false;
        return $member['password'] == md5(crypt($password, substr($password, 0, 4))) ? $member : false;
    }

    public function getById($idMember)
    {
        $this->db->bind('id', $idMember);
        return $this->db->row("SELECT * FROM member WHERE id = :id");
    }
}
