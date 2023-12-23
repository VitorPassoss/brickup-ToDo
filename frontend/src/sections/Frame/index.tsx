import React from 'react';
import styled from 'styled-components';



const ScrollableContent = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  overflow-x: scroll; 
  scrollbar-width: thin;
  height: 100%;
  padding: 2%;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover {
    overflow-x: scroll; 
    &::-webkit-scrollbar-thumb {
      background-color: #001529;
    }
  }
`;

function FrameCore({ children }: any) {
  return (
      <ScrollableContent>{children}</ScrollableContent>
  );
}

export default FrameCore;
