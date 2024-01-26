import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Create from './components/Create';
import Options from './components/Options';
import Read from './components/Read';
import {openDatabase} from 'react-native-sqlite-storage';
import Update from './components/Update';
import Delete from './components/Delete';

const Stack = createNativeStackNavigator();
let db = openDatabase({name: 'studentDatabase.db'});

const App = () => {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'student' +
          ' (eno INTEGER, sname TEXT,course TEXT, fees INTEGER);',
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Options">
        <Stack.Screen
          name="Options"
          component={Options}
          options={{title: 'CHOOSE OPTION'}}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{title: 'NEW STUDENT'}}
        />
        <Stack.Screen
          name="Read"
          component={Read}
          options={{title: 'STUDENT DATA'}}
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{title: 'UPDATE STUDENT DATA'}}
        />
        <Stack.Screen
          name="Delete"
          component={Delete}
          options={{title: 'DELETE STUDENT DATA'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
