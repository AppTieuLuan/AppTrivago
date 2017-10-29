const DangNhapModule = (username, password) => (
    fetch('http://192.168.1.173:8080/Demo/DangNhap.php',
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
