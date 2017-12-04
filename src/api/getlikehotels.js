import global from '../component/global';

const likehotels = (userid, page) => (
    fetch(global.server+'getlikehotels.php?page='+page,
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
