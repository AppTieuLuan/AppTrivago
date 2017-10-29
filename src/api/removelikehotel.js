import global from '../component/global';

const register = (userid, idks) => (
    fetch(global.server + 'removelikehotel.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ userid, idks })
    })
    .then(res => res.text())
);

module.exports = register;
