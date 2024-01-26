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

const Delete = props => {
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

  const deleteData = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM student WHERE eno=' + eno, [], (tx, res) => {
        alert('Record Deleted');
        props.navigation.goBack();
      });
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
        <Text style={styles.input}>{eno}</Text>
        <Text style={styles.textStyle}>Full Name</Text>
        <Text style={styles.input}>{name}</Text>
        <Text style={styles.textStyle}>Course Name</Text>
        <Text style={styles.input}>{course}</Text>
        <Text style={styles.textStyle}>Course Fees</Text>
        <Text style={styles.input}>{fees}</Text>
        <TouchableOpacity
          onPress={() => {
            deleteData();
          }}>
          <View style={[styles.btn, {backgroundColor: 'purple'}]}>
            <Text style={styles.btnText}>DELETE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Delete;

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
    marginBottom: 20,
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
    color: 'black',
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
