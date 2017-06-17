import {get, post, update} from './requester';

async function createUser(name, username, contact, role) {
    let newUser = {
        Name: name,
        Username: username,
        Email: contact,
        Role: role,
        History: [],
        Team: []
    };

    return await post('appdata', 'Participants', newUser, 'kinvey');
}

async function updateUser(user) {
    return await update('appdata', 'Participants/' + user._id, user, 'kinvey');
}

function parseUsers(data) {
    let list = data.split(/\n/)
        .filter(e => e !== '')
        .map(e => e.split(/\t/))
        .map(e => ({
            username: e[0],
            name: (names => `${names.shift()} ${names.pop()}`)(e[1].split(/\s+/).filter(e => e !== '')),
            contact: e[2],
            role: e[3] === 'Онлайн' ? 'Online' : 'Onsite'
        }));

    return list;
}

async function getAllUsers() {
    let list = await get('appdata', 'Participants', 'kinvey');
    return list.sort(sortUsers);
}

function createGroups(list) {
    let present = list.filter(e => e.Role === 'In Class');
    let onsite = list.filter(e => e.Role === 'Onsite');
    let online = list.filter(e => e.Role === 'Online');

    return scramble(present).concat(scramble(onsite)).concat(scramble(online));
}

function scramble(list) {
    const min = 3;
    const max = 4;
    let teams = [];
    while (list.length > 9) teams.push(extractTeammates(4));
    while (list.length > 0) {
        switch (list.length) {
            case 9:
            case 6:
            case 5:
                teams.push(extractTeammates(3));
                break;
            case 8:
            case 7:
            case 4:
                teams.push(extractTeammates(4));
                break;
            default:
                teams.push(extractTeammates(list.length));
                break;
        }
    }

    return teams;

    function extractTeammates(count) {
        let team = [];
        while (count > 0) {
            count--;
            let index = Math.floor(Math.random() * list.length);
            team.push(list.splice(index, 1)[0]);
        }
        return team;
    }
}

function applyTeams(teams) {
    let list = [];

    for (let team of teams) {
        for (let user of team) {
            user.Team = team.map(u => u.Username).filter(name => name !== user.Username);
            list.push(user);
        }
    }

    return list;
}

function archiveTeams(users) {
    for (let user of users) {
        user.History = user.Team;
        user.Team = [''];
        if (user.Role === 'In Class') {
            user.Role = 'Onsite';
        }
    }

    return users;
}

function applyTeamWipe(users) {
    let newValues = {users: users.map(u => [u.Username, {Role: u.Role, History: u.History, Team: u.Team}])};

    return post('rpc', 'custom/updateUsers', newValues, 'kinvey');
}

function sortUsers(a, b) {
    let ra = 0, rb = 0;
    switch (a.Role) {
        case 'Onsite':
            ra = 1;
            break;
        case 'Online':
            ra = 2;
            break;
    }
    switch (b.Role) {
        case 'Onsite':
            rb = 1;
            break;
        case 'Online':
            rb = 2;
            break;
    }

    return ra - rb;
}

export {createUser, parseUsers, getAllUsers, createGroups, applyTeams, updateUser, archiveTeams, applyTeamWipe};