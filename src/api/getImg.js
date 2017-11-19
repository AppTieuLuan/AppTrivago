import global from '../component/global';

const getImg = (id) => (
    fetch(global.server + 'getImg.php?id='+id,)
    .then(res => res.json())
);

module.exports = getImg;
