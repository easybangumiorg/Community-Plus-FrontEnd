type visible = {
    canEditSelfProfile: boolean; // 允许用户编辑自己的个人资料
    canUseUserCenter: boolean; // 允许用户访问用户中心
    adminEditCategory: boolean; // 允许用户使用修改分类功能
    canEditPost: boolean;      // 允许用户编辑自己的番剧 
    adminEditPost: boolean; // 允许用户访问所有番剧并编辑
    canEditCollection: boolean; // 允许用户编辑合集
    adminEditCollection: boolean; // 允许用户访问所有合集并编辑
}

/**
 * 默认允许所有用户访问分类、番剧、合集以及概览标签项
 * 同时允许用户浏览分类、浏览番剧，浏览合集
 * 在以上标志有所更改的前提下提供额外的访问权限
 * 但是最终权限控制由服务端完成
 */
export const userCtrl: { [key: string]: visible } = {
    "USER": {
        canEditSelfProfile: true,
        canUseUserCenter: false,
        adminEditCategory: false,
        canEditPost: true,
        adminEditPost: false,
        canEditCollection: false,
        adminEditCollection: false,
    },
    "EDITOR": {
        canEditSelfProfile: true,
        canUseUserCenter: false,
        adminEditCategory: false,
        canEditPost: true,
        adminEditPost: true,
        canEditCollection: true,
        adminEditCollection: true,
    },
    "ADMIN": {
        canEditSelfProfile: true,
        canUseUserCenter: true,
        adminEditCategory: true,
        canEditPost: true,
        adminEditPost: true,
        canEditCollection: true,
        adminEditCollection: true,
    },
}