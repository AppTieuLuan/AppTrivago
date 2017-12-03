import global from '../component/global';

const LoadMyHotelShare = (userid, page) => (
    fetch(global.server + 'loadMyHotelShare.php?page='+page,
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