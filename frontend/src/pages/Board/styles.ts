import styled from 'styled-components';
import { Card } from 'antd';


export const StyledCard = styled(Card)`
  max-width: 300px;
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  margin-right: 20px;
  overflow-y: hidden;
  background-color: #fff;
  border: none;
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #001529;
    border-radius: 8px;
  }

  &:hover {
    overflow-y: scroll; 
    &::-webkit-scrollbar-thumb {
      background-color: #001529;
    }
  }
`;


export const StyledTask = styled.div`
    background: #EEEEEE;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.6px);
    -webkit-backdrop-filter: blur(7.6px);
    padding: 0px;
    border-radius: 8px;
    margin-bottom: 20px;
    color: #001529;



    div {
      padding: 4px;
    }

`


export const StyledText = styled.h1`
      font-size: 16px;
      margin: 0px;
      width: 100%;
      color: #fff;
      `