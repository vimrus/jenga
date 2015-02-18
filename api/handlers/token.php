<?php
class TokensHandler extends Handler 
{
    public function get()
    {
    }

    public function post()
    {
        $account  = $_POST['account'];
        $password = $_POST['password'];
        $member = $this->loadModel('member')->authorize($account, $password);
        if($member)
        {
            $token = $this->loadModel('token')->createToken($account, $password);
            return $this->json(200, $token);
        }
        return $this->json(200, '');
    }
}
