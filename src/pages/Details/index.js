import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdDeleteForever, MdEdit, MdToday, MdRoom } from 'react-icons/md';
import history from '~/services/history';
import api from '~/services/api';

import { Container, Content } from './styles';

export default function Detail({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`meetups/${id}`);
      const data = {
        ...response.data,
        formattedDate: format(
          parseISO(response.data.date),
          `dd 'de' MMMM, 'às' HH'h'mm`,
          { locale: pt }
        ),
        file: response.data.file.url,
      };

      setMeetup(data);
    }
    loadMeetup();
  }, [id]);

  async function handleDelete() {
    try {
      await api.delete(`/meetups/${id}`);
      toast.success('Meetup cancelado');
      history.push('/dashboard');
    } catch (error) {
      console.tron.log(error);
      toast.error('Erro ao cancelar');
    }
  }

  return (
    <Container>
      <header>
        <h1>{meetup.name}</h1>
        <div>
          <Link
            to={{
              pathname: `/meetup/${id}/edit`,
            }}
          >
            <button type="button" className="btnBlue">
              <MdEdit size={20} />
              <span>Editar</span>
            </button>
          </Link>
          <Link to="/">
            <button type="button" onClick={() => handleDelete()}>
              <MdDeleteForever size={20} />
              <span>Cancelar</span>
            </button>
          </Link>
        </div>
      </header>
      <Content>
        <img src={meetup.file} alt="" />

        <p>{meetup.description}</p>

        <div>
          <span>
            <MdToday size={18} />
            {meetup.formattedDate}
          </span>
          <span>
            <MdRoom size={18} />
            {meetup.location}
          </span>
        </div>
      </Content>
    </Container>
  );
}

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
