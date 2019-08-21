import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0 10px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  aside {
    display: flex;
    align-items: center;

    button {
      background: #d44059;
      color: #fff;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      height: 38px;
      width: 70px;
    }
  }
`;

export const Profile = styled.div`
  div {
    text-align: right;
    margin-right: 30px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      color: #999;
      margin-top: 3px;

      &:hover {
        color: #d44059;
      }
    }
  }
`;
