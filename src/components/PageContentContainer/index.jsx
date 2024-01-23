import { React } from "react";
import {PageContentContainerStyle} from "./style";

function PageContentContainer(props) {
    return(
        <PageContentContainerStyle>
            {props.children}
        </PageContentContainerStyle>
    );
}

export default PageContentContainer;
