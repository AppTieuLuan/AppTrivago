import React from 'react';
import {
    Dimensions
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import TopFilters from './TopFilters';
import ExtraFilters from './ExtraFilters';

export const TabFilters = TabNavigator(
    {
        TabTopFilter: {
            screen: TopFilters,
            navigationOptions: {
                tabBarLabel: 'Lọc dữ liệu'
            }
        }
        // ,
        // TabExtraFilter: {
        //     screen: ExtraFilters,
        //     navigationOptions: {
        //         tabBarLabel: 'Extra Filters'
        //     }
        // }
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

