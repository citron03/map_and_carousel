import styled from "styled-components";

interface FooterProps {

}

const FooterDiv = styled.div`
    border-top: 1.5px solid #303952;
    width: fit-content;
    margin: 30px auto;
`

const Footer: React.FC<FooterProps> = () => {

    return (
        <FooterDiv>
            <p>이 웹사이트에 사용된 글꼴은 횡성군의 횡성한우체입니다.</p>
        </FooterDiv>
    );
}

export default Footer;