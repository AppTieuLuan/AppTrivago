import saveToken from './saveToken';
import getToken from './getToken';
import global from '../component/global';

const getNewToken = (token) => (
    fetch(global.server + 'refresh_token.php',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.text())
);

const refreshToken = async () => {
    try {
        const token = await getToken();
        if (token === '' || token === 'TOKEN_KHONG_HOP_LE' || token === 'HET_HAN') {
            console.log('Chua co token');
        }else{
          const newToken = await getNewToken(token);
          await saveToken(newToken);
          console.log('TOKEN MOI: ' + newToken);
        }
    } catch (e) {
        console.log(e);
    }
};

export default refreshToken;
