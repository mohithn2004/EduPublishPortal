import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Popup({email, onLogout}) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <NavContainer>
      <ProfileSection>
        <Link style={{ all: "unset" }} to="/publications">
          <PublicationsSection>
            <ProfileImage
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/525531cf84a2ba4cc916ea47e83d043830f4e7da0bd78dd6f8addfa7b43d091c?apiKey=ca523ab6667346798fc650e20b031f51&"
            />
            <ProfileText>
              Your
              <br /> Publications
            </ProfileText>
          </PublicationsSection>
        </Link>
        <Link style={{ all: "unset" }} to="/userProfile">
          <UserProfileSection>
            <MainLogo
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/48fae61581810b0f725b62ae112721049d3a777e853c55d4f402708c8d393dc3?apiKey=ca523ab6667346798fc650e20b031f51&"
            />
          </UserProfileSection>
        </Link>
        <LogoutSection onClick={handleLogout}>
          <LogoutIcon
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6eaafb67125bebe57f629ec879336d8d49e6ae4cc53fe96fed9d9bfe7c5ca953?apiKey=ca523ab6667346798fc650e20b031f51&"
          />
          <LogoutText tabIndex="0" role="button">
            Log Out
          </LogoutText>
        </LogoutSection>
      </ProfileSection>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  color: #000;
  font-weight: 500;
  justify-content: center;
  padding: 0 1px;
  //   padding: 0 15px;
  //   padding-bottom: 20px;
`;

const PublicationsSection = styled.div`
  display: flex;
  padding: 0 15px;
  //   padding-bottom: 20px;
  cursor: pointer;

  &:hover {
    background-color: #dedede;
    border-radius: 10px;
  }
`;

const UserProfileSection = styled.div`
  padding: 10px;
  padding-left: 17px;
  cursor: pointer;

  //   padding-top: 15px;

  &:hover {
    background-color: #dedede;
    border-radius: 10px;
  }
`;

const ProfileSection = styled.section`
  display: flex;
  //   gap: 18px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  width: 100%;
  flex-direction: column;
`;

const ProfileImage = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 30px;
  height: 30px;
  margin-top: 17px;
`;

const ProfileText = styled.p`
  font-family: Montserrat, sans-serif;
  margin-left: 15px;
`;

const MainLogo = styled.img`
  aspect-ratio: 3.7;
  object-fit: auto;
  object-position: center;
  width: 93px;
  //   margin-top: 21px;

  //   padding: 10px 15px;
  //   padding-right: 15px;
  //   padding-bottom: 20px;

  //   &:hover {
  //     background-color: #5e5e5d;
  //   }
`;

const LogoutSection = styled.section`
  display: flex;
  //   margin-top: 20px;
  gap: 19px;
  cursor: pointer;

  padding: 15px 15px;
  //   padding-bottom: 20px;
  //   padding-top: 15px;

  &:hover {
    background: #dedede;
    border-radius: 10px;
  }
`;

const LogoutIcon = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 25px;
`;

const LogoutText = styled.div`
  font-family: Montserrat, sans-serif;
  margin: auto 0;
`;

export default Popup;

