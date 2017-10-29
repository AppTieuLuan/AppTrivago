import { AsyncStorage } from 'react-native';

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null) {
            return value;
            console.log(value);
        }
        return '';
    } catch (error) {
    // Error retrieving data
        return '';
    }
};

export default getToken;
