<?php
class ErrorHandler extends Handler 
{
    public function get()
    {
        $this->json(404, "not found");
    }
}
class NotFoundHandler extends Handler 
{
    public function get()
    {
        $this->json(404, "not found");
    }
}
