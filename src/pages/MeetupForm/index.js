import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';

import { MdAddCircleOutline } from 'react-icons/md';
import api from '~/services/api';

import BannerInput from './BannerInput';

import { Container } from './styles';

/*
const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field.min(6, 'No mínimo 6 caracteres').required('Preencha nova senha')
      : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Confirme senha')
          .oneOf([Yup.ref('password')], 'Confirme senha')
      : field
  ),
});
*/
export default function MeetupForm({ match }) {
  const { id } = match.params;

  const dispatch = useDispatch();
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`meetups/${id}`);
      const data = {
        ...response.data,
        formattedDate: format(
          parseISO(response.data.date),
          `dd 'de' MMMM, 'às' HH'h'`,
          { locale: pt }
        ),
        file: response.data.file,
      };
      setMeetup(data);
    }
    loadMeetup();
  }, [id]);

  async function handleSubmit(data) {
    try {
      const meetupData = {
        ...data,
      };
      if (id) {
        await api.put(`meetups/${id}`, meetupData);
        toast.success('Meetup atualizado com sucesso');
      } else {
        await api.post('meetups', meetupData);
        toast.success('Meetup criado com sucesso');
      }
    } catch (error) {
      console.tron.log(data);
      toast.error('Erro ao inserir meetup');
    }
  }

  return (
    <Container>
      <Form initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <Input name="name" placeholder="Título do meetup" />
        <Input name="description" placeholder="Descrição completa" multiline />
        <Input name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />

        <button type="submit">
          <MdAddCircleOutline size={20} />
          <span>Salvar meetup</span>
        </button>
      </Form>
    </Container>
  );
}

MeetupForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
