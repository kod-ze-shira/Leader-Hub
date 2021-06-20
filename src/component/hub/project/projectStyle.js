import styled, { css } from 'styled-components'
import React, { useEffect, useRef, useState } from 'react';

export default function ProjectStyle(props) {
    const ProjectStyleLabel = styled.div`
    &{
        background-color: ${props.color};
        display: inline-block;
        width: 9px;
        position: relative;
        height: 10px;
    }
    &:before {
        border-left: 6px solid ${props.color};
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        content: "";
        height: 0;
        left: 9px;
        position: absolute;
    }
   `;
    return (
        <ProjectStyleLabel></ProjectStyleLabel>
    )
}

