import global from '../component/global';

const UploadImg = (id, dataimg) => (
    fetch(global.server + 'uploadImg.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id, dataimg})
    })
    .then(res => res.text())
);

module.exports = UploadImg;