// import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';
// import {
//   DetailsScreenRouteProp,
//   DetailsScreenNavigationProp,
// } from '../navigation/types';

// type Props = {
//   route: DetailsScreenRouteProp;
//   navigation: DetailsScreenNavigationProp;
// };

// const DetailsScreen: React.FC<Props> = ({route, navigation}) => {
//   const {itemId} = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Details Screen</Text>
//       <Text style={styles.details}>Item ID: {itemId}</Text>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   details: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
// });

// export default DetailsScreen;
