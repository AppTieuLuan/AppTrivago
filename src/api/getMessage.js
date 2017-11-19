import global from '../component/global';

const message = (iduser, page) => (
    fetch(global.server+'getMessage.php?page='+page,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ iduser })
    })
    .then(res => res.json())
);

module.exports = message;
