import { ForbiddenException, UnauthorizedException, BadRequestException, type requestDto, UndefindedException, NotFoundException } from ".";

export const requestMsgDict: { [key: string]: string } = {
    'success': '成功',
    'Invalid account or password': '账号或密码错误',
    'Invalid old password': '旧密码错误',
    'Invalid page or pageSize': '分页参数错误',
    'Invalid role': '角色不存在',
    'User Need signin': '用户未登录',
    'Invalid token': '无效的token，请重新登录',
    'Permission denied': '权限不足',
    'Invalid new password': '新密码与旧密码相同',
    'Cannot delete root user': '不能删除root用户',
    'User is not empty': '用户存在未删除的引用',
    'post is referenced by the collection': '番剧存在被合集的引用',
    'There are posts that is referenced by the collection': '合集存在被番剧的引用',
    'Category is not empty': '分类存在未删除的引用',
}

/**
* # 处理请求返回
* 
* 会将服务端的一些错误格式转换为统一的格式，并对请求中产生的错误进行处理
* @param data 请求返回数据
* @returns 返回数据
*/
export function requestProc(data: requestDto) {
    if (data.statusCode) data.code = data.statusCode;
    if (data.message) data.msg = data.message;

    let { code, msg } = data;

    if (msg in requestMsgDict) {
        msg = requestMsgDict[msg];
    }

    switch (code) {
        case 400:
            throw new BadRequestException(data, msg);
        case 401:
            throw new UnauthorizedException(data, msg);
        case 403:
            throw new ForbiddenException(data, msg);
        case 404:
            throw new NotFoundException(data, msg);
        case 200:
        case 201:
            break;
        default:
            throw new UndefindedException(data, msg);
    }

    return data;
}