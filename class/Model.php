<?php
class Model
{
	public $db;

	public function __construct()
	{
		$this->db = new DB('localhost', 'shuji', 'root', 'zentao');
	}
}
