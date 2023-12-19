/**
 * 请求控制
 * 
 * 负责提供公共方法，处理请求异常的问题
 */

export class RequestExceptionBase extends Error {
    constructor(data: any) {
        super(data);
        this.name = 'RequestExceptionBase';
    }

    public code: number = 0;
    public msg: string = '';
}

export class UndefindedException extends RequestExceptionBase {
    // 未定义的异常
    constructor(data: any, msg: string = '未知错误') {
        super(data);
        this.name = 'UndefindedException';
        this.msg = msg;
    }
}

export class ForbiddenException extends RequestExceptionBase {
    // 请求不被允许
    constructor(data: any, msg: string) {
        super(data);
        this.name = 'ForbiddenException';
        this.code = 403;
        this.msg = msg;
    }
}

export class BadRequestException extends RequestExceptionBase {
    // 请求不完整
    constructor(data: any, msg: string) {
        super(data);
        this.name = 'BadRequestException';
        this.code = 400;
        this.msg = msg;
    }
}

export class NotFoundException extends RequestExceptionBase {
    // 请求的资源不存在
    constructor(data: any, msg: string) {
        super(data);
        this.name = 'NotFoundException';
        this.code = 404;
        this.msg = msg;
    }
}

export class UnauthorizedException extends RequestExceptionBase {
    // 未登录或登录失败
    constructor(data: any, msg: string) {
        super(data);
        this.name = 'UnauthorizedException';
        this.code = 401;
        this.msg = msg;
    }
}