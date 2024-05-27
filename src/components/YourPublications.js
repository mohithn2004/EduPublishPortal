import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Popup from "./Popup";

function YourPublications({ email, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/user/allPublications",
          { email }
        );
        setPublications(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [email]);

  const togglePopupVisibility = () => {
    setIsPopupVisible((prevVisibility) => !prevVisibility);
  };

  const handleLogout = () => {
    onLogout();
  };

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

  const handleDelete = async (table, title) => {
    try {
      await axios.delete(
        `http://localhost:3001/user/publication/delete/${table}/${title}`
      );
      setPublications((prevPublications) =>
        prevPublications.filter(
          (pub) => pub.title !== title || pub.type !== table
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (table, title) => {
    navigate(`/edit/${table}/${title}`, { state: { email } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Wrapper>
      <HeaderSection>
        <LogoContainer style={{ marginTop: "0px" }}>
          <BackButton
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d75be4bcd404b7d7ca57be4c88a6bb75f54bbc68d60d29adaec46e7324e3f5a4?apiKey=c7cb6aff308d468eaa8f6ae297335b14&"
            alt="Search icon"
            onClick={() => navigate(-1)}
          />
          <Title>Your Publications</Title>
        </LogoContainer>
        {userData && (
          <UserInfo onClick={togglePopupVisibility}>
            <UserIcon />
            <UserName>{userData?.Name}</UserName>
          </UserInfo>
        )}
        {isPopupVisible && (
          <PopupContainer>
            <Popup email={email} onLogout={handleLogout} />
          </PopupContainer>
        )}
      </HeaderSection>
      <ScrollableContainer>
        {publications.length === 0 ? (
          <p>No publications found.</p>
        ) : (
          publications.map((pub, index) => (
            <PublicationCard key={index}>
              <PublicationHeader>
                <PublicationTitle>Title: {pub.title}</PublicationTitle>
                <ActionButton onClick={() => handleEdit(pub.type, pub.title)}>
                  Update
              {console.log(pub)}
                </ActionButton>
              </PublicationHeader>
              <PublicationFooter>
                <PublicationYear>Year: {pub.year}</PublicationYear>
                <PublicationYear style={{marginRight: "550px"}}>Type: {pub.type}</PublicationYear>
                <DeleteButton onClick={() => handleDelete(pub.type, pub.title)}>
                  Delete
                </DeleteButton>
              </PublicationFooter>
            </PublicationCard>
          ))
        )}
      </ScrollableContainer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  border-radius: 35px;
  background-color: #f3f6fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  margin-left: 50px;
  width: 85vw;
  height: 93.5vh;
  overflow: hidden;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const HeaderSection = styled.header`
  align-self: stretch;
  display: flex;
  width: 80vw;
  margin-top: 30px;
  margin-bottom: 5px;
  margin-left: 0px;
  align-items: start;
  gap: 20px;
  color: #000;
  justify-content: space-between;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  margin-top: 8px;
  gap: 20px;
  font-size: 20px;
  font-weight: 600;
`;

const BackButton = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 45px;
  height: 45px;
  margin-top: 5px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: Montserrat, sans-serif;
  margin: auto 0;
  margin-top: 1px;
`;

const PopupContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 110px;
  right: 140px;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 15px;
  font-size: 20px;
  // margin-top: 15px;
  // margin-left: 30px;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const UserIcon = styled.div`
  background-color: #d9d9d9;
  border-radius: 50%;
  width: 58px;
  height: 51px;
`;

const UserName = styled.p`
  font-family: Montserrat, sans-serif;
  margin: auto 0;
  font-size: 20px;
`;

const ScrollableContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: calc(90vh - 120px); // Adjust the height based on your layout
  padding: 0 50px;
`;

const PublicationCard = styled.section`
  border-radius: 25px;
  box-shadow: 0px 4px 16.1px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  display: flex;
  margin-top: 15px;
  margin-bottom: 10px;
  width: 80%;
  margin-left: 50px;
  max-width: 1360px;
  flex-direction: column;
  font-weight: 400;
  padding: 19px 79px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const PublicationHeader = styled.div`
  display: flex;
  gap: 20px;
  margin-top: -20px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const PublicationTitle = styled.h2`
  color: #000;
  flex-grow: 1;
  font: 25px Montserrat, sans-serif;
`;

const ActionButton = styled.button`
  border-radius: 10px;
  background-color: #4b4b4a;
  color: #fff;
  white-space: nowrap;
  width: 10vw;
  height: 35px;
  margin-top: 20px;
  justify-content: center;
  padding: 7px 48px;
  font: 17px Montserrat, sans-serif;
  cursor: pointer;
  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 30px;
  }
  &:hover {
    background-color: #181818;
  }
`;

const DeleteButton = styled.button`
  border-radius: 10px;
  background-color: #4b4b4a;
  opacity: 80%;
  color: #fff;
  white-space: nowrap;
  width: 10vw;
  height: 35px;
  justify-content: center;
  padding: 7px 48px;
  font: 17px Montserrat, sans-serif;
  cursor: pointer;
  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 30px;
  }
  &:hover {
    background-color: #141414;
  }
`;

const PublicationFooter = styled.div`
  display: flex;
  margin-top: 0px;
  // gap: 0px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
`;

const PublicationYear = styled.p`
  color: #000;
  flex-grow: 1;
  margin: 0 0;
  font: 20px Montserrat, sans-serif;
  font-weight: 0;
`;

export default YourPublications;
