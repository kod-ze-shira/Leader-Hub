import styled from 'styled-components';

export const MyStyleGrid = styled.div` 
&:hover {
    border: 1.5px solid ${(props) => props.color} !important
}`;