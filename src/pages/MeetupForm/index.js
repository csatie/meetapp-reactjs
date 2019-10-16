import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import DatePicker from 'react-datepicker';
import { subDays, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';

import { MdAddCircleOutline } from 'react-icons/md';
import history from '~/services/history';
import api from '~/services/api';

import BannerInput from './BannerInput';

import { Container } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

const schema = Yup.object().shape({
  name: Yup.string().required('Título obrigatório'),
  description: Yup.string().required('Descrição obrigatória'),
  date: Yup.date(),
  location: Yup.string().required('Localização obrigatória'),
  file_id: Yup.number(),
});

export default function MeetupForm({ match }) {
  const { id } = match.params;

  const dispatch = useDispatch();
  const [meetup, setMeetup] = useState([]);
  const [description, setDescription] = useState('');
  const [startDate, setDate] = useState();

  useEffect(() => {
    setDescription(meetup.description);
  }, [meetup]);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`meetups/${id}`);
      const data = {
        ...response.data,
        date: new Date(response.data.date),
        formattedDate: format(
          parseISO(response.data.date),
          `dd 'de' MMMM, 'às' HH'h'mm`,
          { locale: pt }
        ),
        file: response.data.file,
      };
      setMeetup(data);
    }
    loadMeetup();
  }, [id]);

  function handleChange(date) {
    setDate(date);
    console.tron.log(date);
  }

  async function handleSubmit(data) {
    try {
      const meetupData = {
        ...data,
        date: startDate,
      };
      if (id) {
        await api.put(`meetups/${id}`, meetupData);
        toast.success('Meetup atualizado com sucesso!');
        history.push('/dashboard');
      } else {
        await api.post('meetups', meetupData);
        toast.success('Meetup criado com sucesso!');
        history.push('/dashboard');
      }
    } catch (error) {
      console.tron.log(data);
      toast.error('Erro ao inserir meetup');
    }
  }

  return (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />
        <Input name="name" placeholder="Título do meetup" />
        <Input
          name="description"
          placeholder="Descrição completa"
          multiline
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <DatePicker
          name="date"
          placeholderText="Data e hora"
          selected={startDate || meetup.date}
          onChange={handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd 'de' MMMM, 'às' HH'h'mm"
          timeCaption="time"
          minDate={subDays(new Date(), 0)}
          locale={pt}
        />
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
