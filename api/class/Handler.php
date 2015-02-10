<?php
class Handler
{
    public $view = array();
    public $controller;
    public $action;
    public $method;

    public function redirect($path, $code = 302) 
    {
        @header("Location: {$path}", true, $code);
        exit;
    }

    public function render($view)
    {
        extract($this->view, EXTR_SKIP);

        ob_start();
        include(SP . 'views/' . $view);
        die(trim(ob_get_clean()));
    }

    public function json($code, $data)
    {
        header("Content-type: application/json");
        header("HTTP/1.1 200 OK");
        echo json_encode($data); 
        exit;
    }

	public function loadModel($moduleName)
	{
		include(SP . 'models/' . strtolower($moduleName) . '.php');	
		return new $moduleName();
	}
}
