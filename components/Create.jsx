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

const Create = props => {
  const [eno, setEno] = useState();
  const [name, setName] = useState();
  const [course, setCourse] = useState();
  const [fees, setFees] = useState();

  const setData = async () => {
    await db.transaction(async tx => {
      await tx.executeSql(
        'INSERT INTO student (eno, sname, course, fees) VALUES (?,?,?,?)',
        [eno, name, course, fees],
        (tx, res) => {
          if (res.rowsAffected == 1) {
            alert('record added');
            props.navigation.goBack();
          }
          console.log(res);
        },
        error => console.log(error),
      );
    });
  };

  return (
    <View style={styles.content}>
      <Text style={styles.textStyle}>Enrollment Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEno(text)}
        value={eno}
      />
      <Text style={styles.textStyle}>Full Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
      />
      <Text style={styles.textStyle}>Course Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setCourse(text)}
        value={course}
      />
      <Text style={styles.textStyle}>Course Fees</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setFees(text)}
        value={fees}
      />
      <TouchableOpacity
        onPress={() => {
          setData();
        }}>
        <View style={[styles.btn, {backgroundColor: 'purple'}]}>
          <Text style={styles.btnText}>SUBMIT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontSize: 20,
  },
  content: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#f5f4f2',
  },
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    fontSize: 20,
    marginBottom: 20,
  },
  btn: {
    width: '100%',
    height: 45,
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
