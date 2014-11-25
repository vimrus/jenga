<?php
class Controller
{
    public $view = array();
    public $controller;
    public $action;
    public $method;

    public function __construct($method, $controller, $action)
    {
        $this->method     = $method;
        $this->controller = $controller;
        $this->action     = $action;
    }

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
        echo trim(ob_get_clean());
    }
}
