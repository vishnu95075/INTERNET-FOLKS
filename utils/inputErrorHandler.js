class InputErrorHandler extends Error{
    constructor(param,code,message,statusCode){
        super(message);
        this.param=param;
        this.code=code;
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports = InputErrorHandler