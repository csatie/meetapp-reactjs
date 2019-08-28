import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    h1 {
      color: #fff;
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
        margin-left: 6px;
      }

      &:hover {
        background: ${lighten(0.03, '#f94d6a')};
      }
    }
  }
`;

export const Meetup = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  color: #fff;
  padding: 20px;

  opacity: ${props => (props.past ? 0.2 : 1)};

  span {
    align-items: center;
    display: flex;
    opacity: 0.6;
    font-size: 14px;
  }
`;
