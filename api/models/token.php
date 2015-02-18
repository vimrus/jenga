<?php
class TokenModel extends Model
{
    public function createToken($idMember)
    {
        $token = $this->getMemberToken($idMember);
        if($token) return $token['token'];

        $idToken = md5(uniqid('', true));
        $this->db->bindMore(array('token' => $idToken, 'idMember' => $idMember));
        $this->db->query("INSERT INTO token(token,idMember) VALUES(:token,:idMember)");

        return $idToken;
    }

    public function getByToken($token)
    {
        $this->db->bind('token', $token);
        return $this->db->row("SELECT * FROM token WHERE token = :token");
    }

    public function getMemberToken($idMember)
    {
        $this->db->bind('idMember', $idMember);
        return $this->db->row("SELECT * FROM token WHERE idMember = :idMember");
    }
}
