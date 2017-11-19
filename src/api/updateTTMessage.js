import global from '../component/global';

const updatemessage = (id) => (
    fetch(global.server + 'updateTTMessage.php?id=' + id)
        .then(res => res.text())
);

module.exports = updatemessage;
