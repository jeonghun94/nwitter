import { PATH_TITLE } from "@/constants";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.nav`
  widht: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const NavBackButton = styled.button`
  display: flex;
  padding: 10px;
  border: none;
  color: #1da1f2;
  background-color: transparent;
  cursor: pointer;

  svg {
    fill: white;
  }
`;

const NavBarTitle = styled.h1`
  margin-left: 20px;
  font-size: 1.25rem;
  font-weight: 600;
`;

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = `/${location.pathname.split("/")[1]}`;

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      {currentPath !== "/" && (
        <NavBackButton onClick={handleHome}>
          <svg viewBox="0 0 24 24" aria-hidden="true" width={20} height={20}>
            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
          </svg>
        </NavBackButton>
      )}
      <NavBarTitle>
        {PATH_TITLE[currentPath] ? PATH_TITLE[currentPath].title : ""}
      </NavBarTitle>
    </Wrapper>
  );
}
