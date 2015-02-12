<?php
class Member extends Model
{
    public function authorize($account, $password)
    {
        $member = R::findOne('member', "account = ?", [$account]);
        return $member->password == md5(crypt($passwod,substr($password,0,4))) ? $member : false;
    }

    public function getById($member_id)
    {
        return R::findOne('member', "id = ?", [$member_id]);
    }
}
