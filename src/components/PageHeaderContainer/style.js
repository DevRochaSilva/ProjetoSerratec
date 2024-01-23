import styled from "styled-components";

export const PageHeaderContainerStyle = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    background-color: var(--verde-primario);
    color: var(--branco-secundario);   
    height: 100px;
    border-radius: 1rem 1rem 0  0;
    
    span{
        font-size: 2rem;        
    }

    svg{
        font-size: 48px;
    }
`;
