import styled from "styled-components";

const Logo = ({ name }) => {

  function getCharacter(name) {
    return name.charAt(0);
  }
  return <Wrapper>
    <h4>{getCharacter(name)}</h4>
  </Wrapper>
}
const Wrapper = styled.div`
width: 3rem;
height: 3rem;
display: flex;
justify-content: center;
align-items: center;
 background-color:darkcyan;
 color: white;
 border-radius:50%;
 margin-right:0.5rem;
`
export default Logo;