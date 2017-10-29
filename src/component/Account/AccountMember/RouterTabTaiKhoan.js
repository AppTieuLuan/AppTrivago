import React from 'react';
import {
    Dimensions
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import QuanLyKhachSan from './QuanLyKhachSan';
import QuanLyTaiKhoan from './QuanLyTaiKhoan';

export const TbAccount = TabNavigator(
    {
        TabKhachSan: {
            screen: QuanLyKhachSan,
            navigationOptions: {
                tabBarLabel: 'Dịch vụ của tôi',
            }
        },
        TabTaiKhoan: {
            screen: QuanLyTaiKhoan,
            navigationOptions: {
                tabBarLabel: 'Tài khoản'
            }
        }
    },
    {
        tabBarPosition: 'top',
        tabBarOptions: {
            upperCaseLabel: false,
            activeTintColor: 'black',
            inactiveTintColor: 'black',
            labelStyle: {
              fontSize: 12,
            },
            style: {
              backgroundColor: '#D2D8DD',
            }
        }
    }
);