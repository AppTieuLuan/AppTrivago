import global from '../component/global';

const registerhotel = (namehotel, price, dataimg, hoteltype, phone,
  date, address, lat, lng, tiennghi, website, userid, tiennghikhachsan) => (
    fetch(global.server + 'registerhotel.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ namehotel, price, dataimg, hoteltype, phone,
          date, address, lat, lng, tiennghi, website, userid, tiennghikhachsan })
    })
    .then(res => res.json())
);

module.exports = registerhotel;
