import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdPhotoCamera } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('file');

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    if (defaultValue) {
      setFile(defaultValue.id);
      setPreview(defaultValue.url);
    }
  }, [defaultValue,ref.current]);// eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;
    console.tron.log(response.data);

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="file">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <div className="selectImg">
            <MdPhotoCamera size={48} color="#FFF" />
            <span>Selecionar imagem</span>
          </div>
        )}

        <input
          type="file"
          id="file"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
