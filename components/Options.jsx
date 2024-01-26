import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Options = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Create')}>
        <View style={[styles.btn, {backgroundColor: 'blue'}]}>
          <Text style={styles.btnText}>NEW STUDENT</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Read')}>
        <View style={[styles.btn, {backgroundColor: 'green'}]}>
          <Text style={styles.btnText}>STUDENT DATA</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Update')}>
        <View style={[styles.btn, {backgroundColor: 'purple'}]}>
          <Text style={styles.btnText}>UPDATE DATA</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('Delete')}>
        <View style={[styles.btn, {backgroundColor: 'red'}]}>
          <Text style={styles.btnText}>DELETE STUDENT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    height: 45,
    alignSelf: 'center',
    marginTop: '20%',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#f5f4f2',
  },
});
