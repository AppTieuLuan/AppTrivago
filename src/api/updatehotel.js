import global from '../component/global';

const updatehotel = (id ,namehotel, price, dataimg, hoteltype, phone,
  date, address, lat, lng, tiennghi, website) => (
    fetch(global.server + 'updatehotel.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id, namehotel, price, dataimg, hoteltype, phone,
          date, address, lat, lng, tiennghi, website })
    })
    .then(res => res.text())
);

module.exports = updatehotel;
