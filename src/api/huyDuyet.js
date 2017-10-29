
import global from '../global';
const huyDuyet = (id, noidung) => (
    fetch('http://192.168.1.88:8080/Demo/huyDuyetKhachSan.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id, noidung })
    })
    .then(res => res.text())
);
module.exports = huyDuyet();
