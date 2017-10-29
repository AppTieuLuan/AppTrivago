import global from '../component/global';

const ChangePass = (userid, newpassword) => (
    fetch(global.server + 'changePass.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ userid, newpassword })
    })
    .then(res => res.text())
);

module.exports = ChangePass;
