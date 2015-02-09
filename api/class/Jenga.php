<?php
class Jenga 
{
    public $method; 

    public $uri;

    public $params = array();

    public $paramNames = array();

    public $map = array(
        'GET' => array(), 
        'POST' => array(), 
        'PUT' => array(), 
        'PATCH' => array(), 
        'DELETE' => array()
    );

    public function __construct()
    {
        $this->method = strtolower($_SERVER['REQUEST_METHOD']);

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

    public function addRoute($method, $pattern, $handler)
    {
        $this->map[$method][$pattern] = $handler;
    }

    public function get($pattern, $handler)
    {
        $this->addRoute('GET', $pattern, $handler);
    }

    public function post($pattern, $handler)
    {
        $this->addRoute('POST', $pattern, $handler);
    }

    public function put($pattern, $handler)
    {
        $this->addRoute('PUT', $pattern, $handler);
    }

    public function patch($pattern, $handler)
    {
        $this->addRoute('PATCH', $pattern, $handler);
    }

    public function delete($pattern, $handler)
    {
        $this->addRoute('DELETE', $pattern, $handler);
    }

    public function route($map)
    {
        $method = strtoupper($_SERVER['REQUEST_METHOD']);
        foreach($map[$method] as $route => $target)
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
                list($this->module, $this->action) = explode('/', $target);

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
                $this->module = 'error';
                $this->action = 'notFound';
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

        $this->route($this->map);

        include(SP . 'controllers/' . $this->module . '.php');
        $className  = ucfirst($this->module) . 'Controller'; 

        $controller = new $className($this->method, $this->module, $this->action);
        call_user_func_array(array($controller, $this->action), $this->params);
    }

    private static function is_xhr_request()
    {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest';
    }
}
