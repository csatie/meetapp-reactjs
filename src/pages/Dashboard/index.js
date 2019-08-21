import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('my-meetups');

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(
            parseISO(meetup.date),
            `dd 'de' MMMM, 'às' HH'h'`,
            { locale: pt }
          ),
        };
      });

      setMeetups(data);
    }
    loadMeetups();
  }, []);

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="/details">
          <button type="button">
            <MdAddCircleOutline size={20} />
            <span>Novo meetup</span>
          </button>
        </Link>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Link key={meetup.id} to={`details/${meetup.id}`}>
            <Meetup>
              <strong>{meetup.name}</strong>
              <span>
                {meetup.formattedDate} <MdChevronRight size={20} />
              </span>
            </Meetup>
          </Link>
        ))}
      </ul>
    </Container>
  );
}
