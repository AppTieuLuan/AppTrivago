import global from '../component/global';

const checkPass = (userid, password) => (
    fetch(global.server + 'check_Pass.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ userid, password })
    })
    .then(res => res.text())
);

module.exports = checkPass;
