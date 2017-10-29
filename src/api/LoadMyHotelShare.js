import global from '../component/global';

const LoadMyHotelShare = (userid) => (
    fetch(global.server + 'loadMyHotelShare.php',
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

module.exports = LoadMyHotelShare;