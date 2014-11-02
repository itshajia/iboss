<?php
return array(
    // 站点url
    'WEB_URL' => 'http://iboss.zx',
    'WEB_ROOT' => $_SERVER['DOCUMENT_ROOT'],

    // 路由模式 pathinfo
    'URL_MODEL ' => 0,

    // 模板标签替换
    TMPL_PARSE_STRING  =>array(
        '__PUBLIC__' => '/Resource',
        '__JS__' => '/Resource/Js',
        '__CSS__' => '/Resource/Css',
        '__IMG__' => '/Resource/Images',
        '__MUSIC__' => 'Resource/Music',
        '__QRCODE__' => '/Resource/Qrcode',
        '__UPLOAD__' => '/Uploads',
        '__API__' => '/Api'
    ),

    // 数据库连接
    'DB_TYPE'   => 'mysql',
    'DB_HOST'   => 'localhost',
    'DB_NAME'   => 'snack',
    'DB_USER'   => 'root',
    'DB_PWD'    => '',
    'DB_PORT'   => '3306',
    'DB_PREFIX' => 'iboss_',

    // 表单令牌
    'TOKEN_ON' => true,
    'TOKEN_NAME' => '__hash__',
    'TOKEN_TYPE' => 'md5',
    'TOKEN_RESET' => true,

    // 应用开发模式
    'APP_DEBUG' => false,

);
?>