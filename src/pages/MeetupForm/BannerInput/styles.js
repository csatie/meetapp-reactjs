import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  label {
    width: 940px;
    height: 300px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    margin-bottom: 10px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
  }

  .selectImg {
    width: 940px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    svg {
      opacity: 0.3;
    }

    span {
      align-self: auto;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.3);
      margin-top: 10px;
    }
  }

  label input {
    display: none;
  }
`;
