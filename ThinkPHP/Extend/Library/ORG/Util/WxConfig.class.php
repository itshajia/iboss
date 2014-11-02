<?php

/**
 * @author Ligboy
 * @name 微信调用接口类
 * @example 里面是Wechat类内所有需要的接口，都是需要按自己情况实现的方法
 */
class WechatTools implements WechatSessionToolInter{

    var $memcache;
    var $db_link = null;
    var $userid = '';
    function __construct($userid){
        //这里使用memcache存储cookies和token，没有该环境的用户可以自己去实现使用文件或其他方式存取
        //$this->memcache = new Memcache();
        //$this->memcache->connect("127.0.0.1", 12000);
        $this->userid = $userid;
    }

    /**
     * @name 获取Cookies
     * @see WechatSessionToolInter::getCookies()
     */
    public function getCookies() {
        //return $this->memcache->get("{$this->userid}_cookies");  //使用memcache高速缓存存取cookies
    }

    /**
     * @name 获取token
     * @see WechatSessionToolInter::getToken()
     */
    public function getToken() {
        //return $this->memcache->get("{$this->userid}_token");  //使用memcache高速缓存存取Token
    }

    /**
     * @name 设置保存Cookies
     * @param string $Cookies
     * @see WechatSessionToolInter::setCookies()
     */
    public function setCookies($Cookies) {
        //$this->memcache->set("{$this->userid}_cookies", $Cookies);  //使用memcache高速缓存存取cookies
    }

    /**
     * @name 设置保存token
     * @param string $token
     * @see WechatSessionToolInter::setToken()
     */
    public function setToken($token) {
        //$this->memcache->set("{$this->userid}_token", $token);  //使用memcache高速缓存存取Token
    }

}

