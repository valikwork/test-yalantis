import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Header, List } from 'semantic-ui-react';
import axios from "axios";

function App() {

  const [users, setUsers] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const months = [
    {
      number: '01',
      name: 'January',
      count: 0
    },
    {
      number: '02',
      name: 'February',
      count: 0
    },
    {
      number: '03',
      name: 'March',
      count: 0
    },
    {
      number: '04',
      name: 'April',
      count: 0
    },
    {
      number: '05',
      name: 'May',
      count: 0
    },
    {
      number: '06',
      name: 'June',
      count: 0
    },
    {
      number: '07',
      name: 'July',
      count: 0
    },
    {
      number: '08',
      name: 'August',
      count: 0
    },
    {
      number: '09',
      name: 'September',
      count: 0
    },
    {
      number: '10',
      name: 'October',
      count: 0
    },
    {
      number: '11',
      name: 'November',
      count: 0
    },
    {
      number: '12',
      name: 'December',
      count: 0
    },
  ]

  useEffect(() => {
    setLoadingStatus(true)
    axios.get('https://yalantis-react-school-api.yalantis.com/api/task0/users')
    .then(res => {
      setUsers(res.data);
      setLoadingStatus(false);
    });
  }, []);

  const Content = () => {
    
    users.forEach(user => {
      let userMonth = user.dob.split('-')[1];
      let matchedMonth = months.find(month => month.number === userMonth)
      matchedMonth.users ? matchedMonth.users.push(user.firstName + ' ' + user.lastName) : matchedMonth.users = [user.firstName + ' ' + user.lastName]
      matchedMonth.count += 1;

      if( matchedMonth.count <= 2 ){ matchedMonth.color = 'grey' } else 
      if( matchedMonth.count >= 3 && matchedMonth.count <= 6 ){ matchedMonth.color = 'blue' } else 
      if( matchedMonth.count >= 7 && matchedMonth.count <= 10 ){ matchedMonth.color = 'green' } else
      if( matchedMonth.count >= 11 ){ matchedMonth.color = 'red' }
    });

    return (
      <List>
        {months.map(month => {
            let style = {
              color: month.color
            }
            return <List.Item style={style}>
                      {month.name}
                      <List className='users_popup'>
                        {month.users && month.users.map(u => <List.Item>{u}</List.Item>)}
                      </List>
                   </List.Item>
        })}

      </List>
    )
  }

  const Loading = () => {
    return <Header as='h2'>Loading...</Header>
  }

  return (
    <Container className="App">
      <Header as='h1'>Тестове завдання для Yalantis React.js School</Header>
      {loadingStatus ? Loading() : Content()}
    </Container>
  );
}

export default App;
