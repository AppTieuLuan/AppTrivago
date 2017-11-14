import global from '../component/global';

const Upload = (arridelete, arr, id) => (
    fetch(global.server + 'updateimg.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ arridelete, arr, id})
    })
    .then(res => res.text())
);

module.exports = Upload;