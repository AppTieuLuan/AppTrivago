import global from '../component/global';

const likehotels = (userid) => (
    fetch(global.server+'getlikehotels.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ userid })
    })
    .then(res => res.json())
);

module.exports = likehotels;
