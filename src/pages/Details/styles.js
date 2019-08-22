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

    div {
      display: flex;

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
        margin-left: 15px;

        span {
          margin-left: 6px;
        }

        &:hover {
          background: ${lighten(0.03, '#f94d6a')};
        }
      }

      .btnBlue {
        background: #4dbaf9;

        &:hover {
          background: ${lighten(0.03, '#4dbaf9')};
        }
      }
    }
  }
`;
export const Content = styled.div`
  img {
    max-height: 300px;
    object-fit: cover;
    width: 100%;
  }

  p {
    color: #fff;
    margin: 30px auto;
    font-size: 16px;
  }

  div {
    display: flex;

    span {
      color: #d8d8d8;
      display: flex;
      align-items: center;
      margin-right: 30px;

      svg {
        margin-right: 6px;
      }
    }
  }
`;
