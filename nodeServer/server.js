var  http = require('http')
    ,sio = require( 'socket.io' );


var server = http.createServer( );



var io = sio.listen( server );
var sockets = {};

io.sockets.on( 'connection', function( socket ){
    var index = new Date().valueOf();

    sockets[index] = socket;
    console.log( '当前socket链接数为:'+ getSocketLength() );
    console.log( 'Someone connected!' );


    // 公共方法
    function com() {

    }

    /**
     * socket 断开
     * */
    socket.on('disconnect', function(){
        com();
        delete( sockets[index] );
        console.log( 'close;len='+ getSocketLength() );
    });

    /**
     * socket 加入不同场景
     * */
    socket.on('join', function( scene_id ){
        var ids = scene_id.split(',');

        if ( ids.length >1 ) {
            for ( var i in ids ) {
                socket.join( ids[i] );
                console.log( '该socket已经加入'+ ids[i] +'的场景！' );
                console.log( ids[i] +'房间中现有' + getClientLengthInRoom( ids[i] ) +'个客户！' )
            }
        } else {
            socket.join( scene_id );
            console.log( '该socket已经加入'+ scene_id +'的场景！' );
            console.log( scene_id +'房间中现有' + getClientLengthInRoom( scene_id ) +'个客户！' )
        }
        com();

    });



    /**
     * ++++++++++++++++++++++++++++++++++++++++++++++
     * 主体 “事件”
     * 事件名称，user_ 表示用户事件。admin_表示后台管理员事件。waiter_表示服务员事件。
     * ++++++++++++++++++++++++++++++++++++++++++++++
     * */

    // 订单线下后台审核，用户及时获取相应
    socket.on( 'admin_order_unline', function( opt ){
        var data = {
            order_id: opt['order_id']
        };

        console.log( 'order_id='+ opt['order_id'] );
        socket.broadcast.to( opt['scene_id'] ).emit( 'user_order_unline', data );
    } );

    socket.on( 'waiter_order_unline', function( opt ){
        var data = {
            ticket: opt['ticket']
        };
        console.log(' waiter_order_unline ');
        socket.broadcast.to( opt['scene_id'] ).emit( 'user_order_unline', data );
    });

    //  用户订单状态
    socket.on( 'user_order_status', function( opt ){
        var data = {
            order_id: opt['order_id']
        };

        console.log( 'order_id='+ opt['order_id'] );
        console.log('to admin_order_status;scene_id='+ opt['scene_id'] );
        socket.broadcast.emit( 'admin_order_status', data );
    } );


    // 后台订单审核状态
    socket.on( 'admin_order_status', function( opt ) {
        var data = {
            msg_id: opt['msg_id']
        };

        console.log( 'admin_order_status ');
        socket.broadcast.to( opt['scene_id'] ).emit( 'user_order_status', data );
    });

    // 积分兑换
    socket.on('admin_scoreAuthen', function( opt ){
        console.log( 'admin_scoreAuth to user_scoreAuth.openid='+ opt['scene_id'] );
        socket.broadcast.to( opt['scene_id'] ).emit( 'user_scoreAuthen' );
    });

    // 活动中奖
    socket.on('admin_lottery_prize', function( opt ){
        var data = {
            msg_id: opt['msg_id']
        };

        console.log( 'admin_lottery_prize to user_lottery_prize' );
        socket.broadcast.to( opt['scene_id'] ).emit( 'user_lottery_prize', data );
    } );

    // 现金券使用
    socket.on('admin_cashTicketAuthen', function( opt ){
        console.log( 'admin_cashTicketAuthen to user_cashTicketAuthen.openid='+ opt['scene_id'] );
        socket.broadcast.to( opt['scene_id'] ).emit( 'user_cashTicketAuthen' );
    });

} );


function getSocketLength () {
    var idex = 0;

    for ( var i in sockets ) {
        idex++;
    }

    return idex;
}

function getClientLengthInRoom( room ) {
    if ( !room ) return;

    var count = 0;
    if ( io.sockets && io.sockets.adapter && io.sockets.adapter.rooms ) {
        var clients = io.sockets.adapter.rooms[ room ];
        for ( var i in clients ) {
            count++;
        }
        return count;
    }
}

server.listen( 3000, function(){
    console.log('服务已经建立！');
} );



