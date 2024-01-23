import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  

  //ScrollBar Config
  *::-webkit-scrollbar {
  width: 3px; 
  }
  *::-webkit-scrollbar-track {
    background: transparent; 
  }
  *::-webkit-scrollbar-thumb {
    background-color: var(--verde-primario3); 
    border-top-right-radius: 50px; 
    border-bottom-right-radius: 50px; 
    padding-top: 1rem;
  }
  *::-webkit-scrollbar-thumb:hover {
    background: var(--verde-primario2); 
  }
  *::-webkit-scrollbar-track-piece:start {
  margin-top: 10px; 
  }
  *::-webkit-scrollbar-track-piece:end {
  margin-bottom: 10px;
  }
  
  

  .bg-sidebar {
    background-color: var(--bg-color) !important;
  }
  :root {
    --branco: ${(props) => props.theme.colors.white};
    --branco-primario: ${(props) => props.theme.colors.whitePrimary};
    --branco-secundario: ${(props) => props.theme.colors.whiteSecondary};
    --verde-primario: ${(props) => props.theme.colors.greenPrimary};
    --verde-primario2: ${(props) => props.theme.colors.greenPrimary2};
    --verde-primario3: ${(props) => props.theme.colors.greenPrimary3};
    --verde-primario4: ${(props) => props.theme.colors.greenPrimary4};
    --verde-secundario: ${(props) => props.theme.colors.greenSecondary};
    --cinza-primario: ${(props) => props.theme.colors.grayPrimary};
    --cinza-secundario: ${(props) => props.theme.colors.graySecondary};
    --preto-primario: ${(props) => props.theme.colors.blackPrimary};
    --preto-primario2: ${(props) => props.theme.colors.blackPrimary2};
    --verde-constraste: ${(props) => props.theme.colors.greenConstrast};
    --amarelo-constraste: ${(props) => props.theme.colors.yellowConstrast};
    --vermelho-constraste: ${(props) => props.theme.colors.redConstrast};
    --azul-constraste: ${(props) => props.theme.colors.blueConstrast};
    --azul-lgt-constraste: ${(props) => props.theme.colors.blueLightConstrast};
    
    --cor-fonte: var(--cinza-secundario);
    --cor-fundo: var(--branco-primario);
  }

  body {
    font-size: ${(props) => props.theme.font.size};
    list-style-type: none;
    background-color: var(--bg-color) !important;
    color: var(--preto-primario) !important;
    font-family: 'Source Sans Pro', sans-serif !important;
  }

  
`;
export default GlobalStyle;
