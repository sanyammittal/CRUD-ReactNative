import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'studentDatabase.db'});

const StudentInfo = props => {
  

  return (
    <Fragment>
      
    </Fragment>
  );
};

export default StudentInfo;

const styles = StyleSheet.create({
  
});
