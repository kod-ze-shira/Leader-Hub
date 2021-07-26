import styled from 'styled-components';

export const ProjectStyleLabel = styled.div`
    &{
        background-color: ${(props)=>props.color};
        display: inline-block;
        width: 9px;
        position: relative;
        height: 10px;
    }
    &:before {
        border-left: 6px solid ${(props)=>props.color};
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        content: "";
        height: 0;
        left: 9px;
        position: absolute;
    }
   `;