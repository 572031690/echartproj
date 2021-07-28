export default class SocketService {
    // 单例的设计模式
    //如果别人通过get Instance 来的到我的实例对象 那我只会给他返回同一个实例对象
    static instance = null
    static get Instance() {
        if (!this.instance) {
            this.instance = new SocketService()
        }
        return this.instance
    }

    //和服务端连接的socket对象
    ws = null
    //存储回调函数
    callBackMapping = {}
    //定义连接服务器的方法
    connect() {
        //连接服务器
        if (!window.WebSocket) {
            return console.log('你的浏览器不支持WebSocket');
        }
        this.ws = new WebSocket('ws://localhost:9998')

        //连接服务端成功
        this.ws.onopen = () => {
            console.log('连接服务端成功');
        }
        //连接服务端失败
        this.ws.onclose = () => {
            console.log('连接服务端失败');
        }
        //得到服务端发送过来的数据
        this.ws.onmessage = msg => {
            console.log('从服务端获取数据');
            //得到的数据在msg的data里面
            // console.log(msg.data);
            const recvData = JSON.parse(msg.data)
            const socketType = recvData.socketType
            //判断回调函数是否存在
            if(this.callBackMapping[socketType]){
                const action = recvData.action
                if(action === 'getData') {
                    const realData = JSON.parse(recvData.data)
                    this.callBackMapping[socketType]
                }else if( action === 'fullScreen') {

                }else if(action === 'themeChange') {
                    
                }
            }
        }
    }
    //回调函数的注册
    registerCallBack(socketType, callBack) {
        this.callBackMapping[socketType] = callBack
    }
    //取消某一个回调函数
    unRegisterCallBack(socketType) {
        this.callBackMapping[socketType] = null
    }

}