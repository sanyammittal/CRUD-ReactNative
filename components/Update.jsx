import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'studentDatabase.db'});

const Update = props => {
  const [student, setStudent] = useState([]);
  const [value, setValue] = useState();
  const [eno, setEno] = useState();
  const [name, setName] = useState();
  const [course, setCourse] = useState();
  const [fees, setFees] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM student', [], (tx, res) => {
        var len = res.rows.length;
        var temp = [];
        if (len > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            temp.push(res.rows.item(i));
          }
          setStudent(temp);
        }
      });
    });
  };

  const getStudentData = studentEnoData => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM student WHERE eno=?',
        [studentEnoData],
        (tx, res) => {
          setEno(String(res.rows.item(0).eno));
          setName(res.rows.item(0).sname);
          setCourse(res.rows.item(0).course);
          setFees(String(res.rows.item(0).fees));
        },
      );
    });
  };

  const changeStudent = item => {
    setValue(item);
    getStudentData(item.eno);
  };

  const updateData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE student SET eno=?, sname=?, course=?, fees=? WHERE eno=' + eno,
        [eno, name, course, fees],
        (tx, res) => {
          alert('Record Updated');
          props.navigation.goBack();
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholder="SELECT NAME ..."
        placeholderStyle={{fontSize: 16, color: 'black'}}
        data={student}
        labelField="sname"
        valueField="eno"
        value={value}
        onChange={changeStudent}
        itemTextStyle={styles.itemText}
        selectedTextStyle={{color: 'black'}}
        maxHeight={250}
      />

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
            updateData();
          }}>
          <View style={[styles.btn, {backgroundColor: 'purple'}]}>
            <Text style={styles.btnText}>UPDATE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f4f2',
  },
  dropdown: {
    marginTop: '10%',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
  },
  itemText: {
    color: 'black',
  },
  textStyle: {
    color: 'black',
    fontSize: 20,
  },
  content: {
    marginTop: '20%',
    width: '80%',
    alignSelf: 'center',
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
