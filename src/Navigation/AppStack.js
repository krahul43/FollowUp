// import { View, Text, } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Splash from '../Screens/Splash/Splash';
// import Home from '../Screens/Home/Home';
// import Onboarding from '../Screens/Onboarding/Onboarding';
// import BottomTab from './BottomTab'
// import Setting from '../Screens/Setting/Setting';

// const Stack = createNativeStackNavigator();

// const AppStack = ({ navigation }) => {
//     const [showWellcome, setShowWellcome] = useState(true)

//     useEffect(() => {
//         setTimeout(() => {
//             setShowWellcome(false)
//         }, 6000);

//     }, []);

//     if (showWellcome) {
//         // Show splash screen until loading is complete
//         return <Splash navigation={navigation} />;
//     }

//     const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
//     const appcheck = async () => {
//         try {
//             const appData = await AsyncStorage.getItem('isAppFirstLaunched');
//             if (appData == null) {
//                 setIsAppFirstLaunched(true);
//             }
//             else {
//                 setIsAppFirstLaunched(false);
//             }
//         }
//         catch (e) {
//             console.log(e)
//         }
//         return
//     }

//     useEffect(() => {
//         appcheck();
//     }, []);

//     return (
//         isAppFirstLaunched != null && (
//             <Stack.Navigator screenOptions={{ headerShown: false }}>
//                 {isAppFirstLaunched && (<>
//                     <Stack.Screen name="Onboarding" component={Onboarding} />
//                 </>
//                 )}
//                 <Stack.Screen name="Home" component={Home} />
//                 <Stack.Screen name="Setting" component={Setting} />
//                 <Stack.Screen name="BottomTab" component={BottomTab} />

//             </Stack.Navigator>
//         )
//     );
// }

// export default AppStack



import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Splash/Splash';
import BottomTab from './BottomTab'
import Home from '../Screens/Home/Home';
import Setting from '../Screens/Setting/Setting';
import Onboarding from '../Screens/Onboarding/Onboarding';

const Stack = createNativeStackNavigator();

const AppStack = ({ navigation }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(null);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        setIsFirstTimeUser(appData === null);

        // Hide the splash screen after some time
        setTimeout(() => {
          setShowSplash(false);
        }, 2000); // Adjust the time as needed
      } catch (error) {
        console.error('Error checking first-time user:', error);
      }
    };

    checkFirstTimeUser();
  }, []);

  if (showSplash) {
    return <Splash navigation={navigation} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstTimeUser ? (
        <>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={Home} />  
        <Stack.Screen name="Setting" component={Setting} />
        </> 
      ) : (
        <>
        <Stack.Screen name="Home" component={Home} />  
        <Stack.Screen name="Setting" component={Setting} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
