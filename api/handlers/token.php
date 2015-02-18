<?php
class TokensHandler extends Handler 
{
    public function post()
    {
        $account  = $_POST['account'];
        $password = $_POST['password'];
        $member = $this->loadModel('member')->authorize($account, $password);
        if($member)
        {
            $token = $this->loadModel('token')->createToken($member['id']);
            return $this->json(200, $token);
        }
        return $this->json(200, '');
    }
}
