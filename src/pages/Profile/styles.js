import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 50px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    span {
      color: #f94d6a;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      display: flex;
      align-items: center;
      margin: 5px 0 0;
      height: 42px;
      width: auto;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      padding: 0 20px;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;
      align-self: flex-end;

      span {
        margin: 0 0 0 6px;
        color: #fff;
        align-self: center;
      }

      &:hover {
        background: ${lighten(0.03, '#f94d6a')};
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 20px 0 15px;
    }
  }
`;
