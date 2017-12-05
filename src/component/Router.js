import React from 'react';
import {
    Dimensions
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Main from './Main/Main';
import MainView from './Main/MainView';
import Menu from './Menu/Menu';
//import Account from './Account/Account';
import Search from './Search/Search';
import Details from './Details/Details';
import Welcome from './Welcome/Welcome';
import AccountMember from './Account/AccountMember/Account';
import SignIn from './Account/SignIn';
import SignUp from './Account/SignUp';

import TrangQuanLyAdmin from './Account/AccountAdmin/TrangQuanLyAdmin';
import DuyetKhachSan from './Account/AccountAdmin/DuyetKhachSan';
import QuanLyKhachSan from './Account/AccountAdmin/QuanLyKhachSan';

import LikeHotels from './Account/AccountMember/cpAcc/LikeHotels';
import HotelShare from './Account/AccountMember/cpAcc/HotelShare';
import LocationAddress from './Account/AccountMember/cpAcc/Location_Address';
import ChangePass from './Account/AccountMember/cpAcc/ChangePass';
import UploadImg from './Account/AccountMember/cpAcc/UploadImg';
import HotelShared from './Account/AccountMember/cpAcc/Hotel_Shared';
import Message from './Account/AccountMember/cpAcc/Message';
import UploadAnyImg from './Account/AccountMember/cpAcc/UploadAnyImg';


var { height, width } = Dimensions.get('window');

export const SideMenu = DrawerNavigator(
    {
        MainSide: {
            screen: Main
        }
    },
    {
        drawerWidth: 0.8 * width,
        drawerPosition: 'left',
        contentComponent: props => <Menu {...props} />
    }
);
export const MainStack = StackNavigator({
    WelcomeScreen: {
        screen: Welcome,
        navigationOptions: {
            header: null
        }
    },
    MainScreen: {
        screen: SideMenu,
        navigationOptions: {
            header: null
        }
    },
    AccountScreen: {
        screen: TrangQuanLyAdmin,
        // navigationOptions: {
        //     headerTitle: 'Tài khoản'
        // }
        navigationOptions: {
            header: null
        }
    },
    AccountMemberScreen: {
        screen: AccountMember,
        navigationOptions: {
            headerTitle: 'Quay lại'
        }
    },
    SearchScreen: {
        screen: Search,
        navigationOptions: {
            header: null
        }
    },
    DetailScreen: {
        screen: Details,
        navigationOptions: {
            header: null
        }
    },


    TrangQuanLyAdmin: {
        screen: TrangQuanLyAdmin,
        navigationOptions: {
            header: null
        }
    },
    DuyetKhachSan: {
        screen: DuyetKhachSan,
        navigationOptions: {
            header: null
        }
    },
    QuanLyKhachSan: {
        screen: QuanLyKhachSan,
        navigationOptions: {
            header: null
        }
    },

    SigninScreen: {
        screen: SignIn,
        navigationOptions: {
            headerTitle: 'Quay lại'
        }
    },
    SignupScreen: {
        screen: SignUp,
        navigationOptions: {
            headerTitle: 'Quay lại'
        }
    },
    LikeScreen: {
        screen: LikeHotels,
        navigationOptions: {
            headerTitle: 'Quay lại'
        }
    },
    ShareScreen: {
        screen: HotelShare,
        navigationOptions: {
            headerTitle: 'Quay lại'
        }
    },
    LocationScreen: {
        screen: LocationAddress,
        navigationOptions: {
            header: null
        }
    },
    ChangePassScreen: {
        screen: ChangePass,
        navigationOptions: {
            headerTitle: 'Quay lại'
        }
    },
    UploadImgScreen: {
        screen: UploadAnyImg,
        navigationOptions: {
            headerTitle: 'Quay lại'
        }
    },
    HotelSharedScreen: {
        screen: HotelShared,
        navigationOptions: {
            headerTitle: 'Quay lại'
        }
    },
    MessageScreen: {
        screen: Message,
        navigationOptions: {
            headerTitle: 'Quay lại'
        }
    }
});
const prevGetStateForActionHomeStack = MainStack.router.getStateForAction;
MainStack.router.getStateForAction = (action, state) => {
    if (state && action.type === 'ReplaceCurrentScreen') {
        const routes = state.routes.slice(0, state.routes.length - 1);
        routes.push(action);
        return {
            ...state,
            routes,
            index: routes.length - 1,
        };
    }
    return prevGetStateForActionHomeStack(action, state);
};