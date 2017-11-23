import global from '../component/global';
const DangNhapModule = (username, password) => (
    fetch(global.server+ '/DangNhap.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
);

module.exports = DangNhapModule;
