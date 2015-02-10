<?php
class Jenga 
{
    public $method; 

    public $uri;

    public $routes = array();

    public $params = array();

    public $paramNames = array();

    public function __construct($routes)
    {
        $this->method = strtolower($_SERVER['REQUEST_METHOD']);
        $this->routes = $routes;

        if (!empty($_SERVER['PATH_INFO']))
        {
            $this->uri = $_SERVER['PATH_INFO'];
        }
        else 
        {
            $this->uri = (strpos($_SERVER['REQUEST_URI'], '?') > 0) ? strstr($_SERVER['REQUEST_URI'], '?', true) : $_SERVER['REQUEST_URI'];
        }
    }

    public function config($config)
    {
        if (is_string($config) && file_exists($config)) include $config;
    }

    public function route($routes)
    {
        $method = strtoupper($_SERVER['REQUEST_METHOD']);
        foreach($routes as $route => $target)
        {
            // Construct a regex for route, from Slim framework.
            $patternAsRegex = preg_replace_callback(
                '#:([\w]+)\+?#',
                array($this, 'matchesCallback'),
                str_replace(')', ')?', $route)
            );
            if (substr($route, -1) === '/') {
                $patternAsRegex .= '?';
            }

            // Cache URL params' names and values if this route matches the current HTTP request
            if (preg_match('#^' . $patternAsRegex . '$#', $this->uri, $paramValues)) 
            {
                // module and action 
                list($this->module, $this->handler) = explode('/', $target);

                // params
                foreach ($this->paramNames as $name) 
                {
                    if (isset($paramValues[$name])) 
                    {
                        if (isset($this->paramNamesPath[ $name ])) 
                        {
                            $this->params[$name] = explode('/', urldecode($paramValues[$name]));
                        } 
                        else 
                        {
                            $this->params[$name] = urldecode($paramValues[$name]);
                        }
                    }
                }
                break;
            }
            else
            {
                $this->module  = 'error';
                $this->handler = 'notFound';
            }
        }
    }

    protected function matchesCallback($m)
    {
        $this->paramNames[] = $m[1];
        return '(?P<' . $m[1] . '>[^/]+)';
    }

    public function run()
    {
        $config_file = SP . 'config/jenga.php';
        if(file_exists($config_file)) include $config_file;

        $this->route($this->routes);

        include(SP . 'handlers/' . $this->module . '.php');

        $handler = new $this->handler();
        call_user_func_array(array($handler, $this->method), $this->params);
    }

    private static function is_xhr_request()
    {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest';
    }
}
