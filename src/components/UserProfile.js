import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

function UserProfile({ email, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/userprofile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });
        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, []);

  const togglePopupVisibility = () => {
    setIsPopupVisible((prevVisibility) => !prevVisibility);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <ProfileWrapper>
      <ProfileHeader>
        <UserInfo>
          <BackButton
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/933f9c7c19729999ca962552dc409324acef2332e12aae98cc3ea561a71a041e?apiKey=ca523ab6667346798fc650e20b031f51&"
            alt="Back Button"
            onClick={() => navigate(-1)}
          />
          <UserName>USER PROFILE</UserName>
        </UserInfo>
        {userData && (
          <UserDetails onClick={togglePopupVisibility}>
            <UserAvatar />
            <UserNameSmall>{userData?.Name}</UserNameSmall>
          </UserDetails>
        )}
        {isPopupVisible && (
          <PopupContainer>
            <Popup email={email} onLogout={handleLogout} />
          </PopupContainer>
        )}
      </ProfileHeader>
      <ProfileContent>
        <UserImage />
        {userData && (
          <UserData>
            <UserDataColumn>
              <UserDataWrapper>
                <UserDataItem>Name: {userData?.Name}</UserDataItem>
                <UserDataItem>Employee Id: {userData?.eid}</UserDataItem>
                <UserDataItem>DOB: {userData?.dob}</UserDataItem>
                <UserDataItem>Gender: {userData?.gender}</UserDataItem>
                <UserDataItem>E-mail: {userData?.email}</UserDataItem>
              </UserDataWrapper>
            </UserDataColumn>
            <UserDataColumn>
              <UserImageWrapper>
                <UserDataItem>Phone: {userData?.phone}</UserDataItem>
                <UserDataItem>Department: {userData?.department}</UserDataItem>
                <UserDataItem>
                  Designation: {userData?.designation}
                </UserDataItem>
                <UserDataItem>DOJ: {userData?.doj}</UserDataItem>
              </UserImageWrapper>
            </UserDataColumn>
          </UserData>
        )}
      </ProfileContent>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.section`
  position: absolute;
  border-radius: 25px;
  background-color: #f3f6fb;
  display: flex;
  flex-direction: column;
  height: 93.5vh;
  width: 85vw;
  margin-top: 25px;
  margin-left: 150px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 110px;
  right: 25px;
`;

const ProfileHeader = styled.header`
  display: flex;
  width: 100%;
  align-items: start;
  gap: 20px;
  color: #000;
  justify-content: space-between;
  margin-top: 50px;

  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 19px;
  font-size: 30px;
  font-weight: 600;
`;

const BackButton = styled.img`
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;

const UserName = styled.h3`
  font-family: Montserrat, sans-serif;
  margin: auto 0;
`;

const UserDetails = styled.div`
  display: flex;
  margin-top: 4px;
  gap: 13px;
  font-size: 20px;
  font-weight: 400;
  white-space: nowrap;
  margin-right: 25px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const UserAvatar = styled.div`
  background-color: #d9d9d9;
  border-radius: 50%;
  width: 58px;
  height: 51px;
`;

const UserNameSmall = styled.span`
  font-family: Montserrat, sans-serif;
  margin: auto 0;
`;

const ProfileContent = styled.main`
  border-radius: 15px;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  align-self: center;
  margin-top: 25px;
  width: 60vw;
  height: 70vh;
  max-width: 100%;
  //   padding: 20px 45px 80px;

  @media (max-width: 991px) {
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const UserData = styled.div`
  gap: 10px;
  display: flex;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const UserDataColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 50%;

  @media (max-width: 991px) {
    width: 100%;
  }

  &:first-child {
    margin-left: 0px;
  }

  &:last-child {
    margin-left: 20px;

    @media (max-width: 991px) {
      margin-left: 0;
    }
  }
`;

const UserDataWrapper = styled.div`
  display: flex;
  margin-top: 25px;
  flex-direction: column;
  font-size: 25px;
  color: #000;
  font-weight: 400;
`;

const UserDataItem = styled.p`
  font-family: Montserrat, sans-serif;
  margin-top: 20px;
  margin-left: 50px;

  &:first-child {
    margin-top: 0;
  }
`;

const UserImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  color: #000;
  font-weight: 400;
  margin-top: 20px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const UserImage = styled.div`
  background-color: #d9d9d9;
  border-radius: 50%;
  margin-top: 25px;
  margin-left: 42%;
  width: 100px;
  height: 100px;
`;

export default UserProfile;
