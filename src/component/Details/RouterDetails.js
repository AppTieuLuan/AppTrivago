import React from 'react';
import {
    Dimensions
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Details_Info from './Details_Info';
import Ratings from './Ratings';
import MapViewDetails from './MapViewDetails';
import Images from './Images';
export const TbDetails = TabNavigator(
    {
        TabDetails: {
            screen: Details_Info,
            navigationOptions: {
                tabBarLabel: 'Chi Tiết',
            }
        },
        TabRatings: {
            screen: Ratings,
            navigationOptions: {
                tabBarLabel: 'Bình Luận'
            }
        },
        TabImages: {
            screen: Images,
            navigationOptions: {
                tabBarLabel: 'Hình ảnh'
            }
        },
        TabMapView: {
            screen: MapViewDetails,
            navigationOptions: {
                tabBarLabel: 'Bản Đồ'
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