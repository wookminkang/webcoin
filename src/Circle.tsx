import styled from "styled-components";



const Container = styled.div<CirclePorps>`
    width:200px;
    height:200px;    
    background:${props => props.bgColor};
`;

interface CirclePorps {
    bgColor: string,
}


function Circle ({bgColor}:CirclePorps){
    return (
        <Container bgColor="tomato" />
    );
}





export default Circle;