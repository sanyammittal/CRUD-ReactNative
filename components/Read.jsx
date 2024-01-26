import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Table, Row, Rows} from 'react-native-table-component';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'studentDatabase.db'});

const Read = () => {
  const [student, setStudent] = useState([]);

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
            temp.push([
              res.rows.item(i).eno,
              res.rows.item(i).sname,
              res.rows.item(i).course,
              res.rows.item(i).fees,
            ]);
          }
          setStudent(temp);
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={styles.table} style={styles.tbl}>
        <Row
          data={['ENO', 'NAME', 'COURSE', 'FEES']}
          textStyle={styles.tblHead}
          style={styles.tblHeadText}
        />
        <Rows data={student} textStyle={styles.tblContent} />
      </Table>
    </View>
  );
};

export default Read;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    backgroundColor: '#f5f4f2',
  },
  table: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  tbl: {
    width: '90%',
    alignSelf: 'center',
  },
  tblHead: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
  },
  tblHeadText: {
    backgroundColor: '#c8e1ff',
  },
  tblContent: {
    color: 'black',
    alignSelf: 'center',
  },
});
