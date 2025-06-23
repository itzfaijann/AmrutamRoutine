import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RoutineHome from '../Assign/RoutineHome';
import ConsultationRoutine from '../Assign/ConsultationRoutine';
import AssignValue from '../Assign/AssignValue';
import VideoCall from '../Assign/VideoCall';
import NewAssign from '../Assign/NewAssign';
import NewRoutine from '../Assign/NewRoutine';
import RoutineStepTwo from '../CreateRoutine/RoutineStepTwo';
import AddReminder from '../CreateRoutine/ProductsBased/AddReminder';
import AddReminder2 from '../CreateRoutine/ProductsBased/AddReminder2';
import AddReminder3 from '../CreateRoutine/ProductsBased/AddReminder3';
import AddReminderActi from '../CreateRoutine/ActivityBased/AddReminderActi';
import AddReminderActi2 from '../CreateRoutine/ActivityBased/AddReminderActi2';
import AddActivity from '../CreateRoutine/ActivityBased/AddActivity';
import ActivitySuccess from '../CreateRoutine/ActivityBased/ActivitySuccess';
import AddProduct from '../CreateRoutine/ProductsBased/AddProduct';
import ProductSuccess from '../CreateRoutine/ProductsBased/ProductSuccess';
import AddWeeklyBenefit from '../CreateRoutine/Weekly/AddWeeklyBenefit';
import AddReminderChannel from '../CreateRoutine/Reminder/AddReminderChannel';
import Caregiver from '../CreateRoutine/Caregiver/Caregiver';


const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
         
        <Stack.Screen
          component={RoutineHome}
          name="RoutineHome"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ConsultationRoutine}
          name="ConsultationRoutine"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={AssignValue}
          name="AssignValue"
          options={{ headerShown: false }}
        />
          <Stack.Screen
          component={VideoCall}
          name="VideoCall"
          options={{ headerShown: false }}
        />
          <Stack.Screen
          component={NewAssign}
          name="NewAssign"
          options={{ headerShown: false }}
        />

          <Stack.Screen
          component={NewRoutine}
          name="NewRoutine"
          options={{ headerShown: false }}
        />
        
          <Stack.Screen
          component={RoutineStepTwo}
          name="RoutineStepTwo"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={AddReminder} 
          name="AddReminder"
          options={{ headerShown: false }}
        />
          <Stack.Screen
          component={AddReminder2} 
          name="AddReminder2"
          options={{ headerShown: false }}
        />

          <Stack.Screen
          component={AddReminder3} 
          name="AddReminder3"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={AddReminderActi} 
          name="AddReminderActi"
          options={{ headerShown: false }}
        />
          <Stack.Screen
          component={AddReminderActi2} 
          name="AddReminderActi2"
          options={{ headerShown: false }}
        />

         <Stack.Screen
          component={AddActivity} 
          name="AddActivity"
          options={{ headerShown: false }}
        />
           <Stack.Screen
          component={ActivitySuccess} 
          name="ActivitySuccess"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={AddProduct} 
          name="AddProduct"
          options={{ headerShown: false }}
        />
            <Stack.Screen
          component={ProductSuccess} 
          name="ProductSuccess"
          options={{ headerShown: false }}
        />
            <Stack.Screen
          component={AddWeeklyBenefit} 
          name="AddWeeklyBenefit"
          options={{ headerShown: false }}
        />
          <Stack.Screen
          component={AddReminderChannel} 
          name="AddReminderChannel"
          options={{ headerShown: false }}
        />
          <Stack.Screen
          component={Caregiver} 
          name="Caregiver"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
