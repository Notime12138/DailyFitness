const UserService = require('../services/userService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    createUser(req, res) {
        const userData = req.body;
        // 调用UserService中的方法来创建用户
        const user = this.userService.createUser(userData);
        res.json(user);
    }

    getUser(req, res) {
        const userId = req.params.id;
        // 调用UserService中的方法来获取用户
        const user = this.userService.getUser(userId);
        res.json(user);
    }

    updateUser(req, res) {
        const userId = req.params.id;
        const userData = req.body;
        // 调用UserService中的方法来更新用户
        const user = this.userService.updateUser(userId, userData);
        res.json(user);
    }

    deleteUser(req, res) {
        const userId = req.params.id;
        // 调用UserService中的方法来删除用户
        this.userService.deleteUser(userId);
        res.sendStatus(204);
    }
}

module.exports = UserController;
