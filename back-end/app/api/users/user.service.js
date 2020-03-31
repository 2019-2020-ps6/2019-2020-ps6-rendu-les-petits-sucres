const fs = require('fs');

const usersFile = './mocks/user.mocks.json';
let users = findUsers(usersFile);

module.exports = {
    authenticate,
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

function findUsers(usersFile) {
    if (fs.existsSync(arguments[0])) {
        fs.readFile(arguments[0], (err, data) => {
            if (err)
                throw err;
            users = JSON.parse(data);
        });
    }
}
