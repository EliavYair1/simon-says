import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Home stack params
export type HomeStackParamList = {
  Home: undefined;
  Details: {itemId: number};
};

// Navigation props for home stack screens
export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Home'
>;
export type DetailsScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Details'
>;

// Route props for home stack screens
export type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'Home'>;
export type DetailsScreenRouteProp = RouteProp<HomeStackParamList, 'Details'>;
