import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import DetailedResults from "./DetailedResults";
import Popup from "./Popup";

const publications = [
  {
    title: "CONFERENCES",
  },
  {
    title: "JOURNALS",
  },
  {
    title: "BOOK CHAPTERS",
  },
  {
    title: "TEXT BOOKS",
  },
];
function Dashboard({ email, onLogout }) {
  const [publicationCounts, setPublicationCounts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  

  useEffect(() => {
    const fetchPublicationCounts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/user/publications",
          { email: email }
        );
        setPublicationCounts(response.data);
      } catch (error) {
        console.error("Error fetching publication counts:", error);
      }
    };

    fetchPublicationCounts();
  }, [email]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/search?term=${searchTerm}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleSearchResultClick = async (result) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/fullrowdata?tableName=${result.table_name}&columnName=${result.column_name}&searchTerm=${result.eid}`
      );
      setSelectedResult(response.data);
    } catch (error) {
      console.error("Error fetching full row data:", error);
    }
  };

  const handleBackClick = () => {
    setSelectedResult(null);
  };

  const togglePopupVisibility = () => {
    setIsPopupVisible((prevVisibility) => !prevVisibility);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <DashboardContainer>
      <Header>
        <HeaderTitle>Dashboard</HeaderTitle>
        <SearchBar
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: "25px", paddingRight: "100px", border: "none" }}
        />
        {searchResults.length > 0 && (
          <SearchResultsDropdown ultsDropdown>
            {searchResults.map((result, index) => (
              <SearchResultList
                key={index}
                onClick={() => handleSearchResultClick(result)}
              >
                <SearchResultItem>
                  {result.column_name} : {result.eid}, type: {result.table_name}
                </SearchResultItem>
                <hr style={{ opacity: "30%" }} />
              </SearchResultList>
            ))}
          </SearchResultsDropdown>
        )}
        <ProfileSection onClick={togglePopupVisibility}>
          <ProfileImage />
          <ProfileName>
            {publicationCounts ? publicationCounts.name : " "}
            <br />
          </ProfileName>
        </ProfileSection>
        {isPopupVisible && (
          <PopupContainer>
            <Popup email={email} onLogout={handleLogout} />
          </PopupContainer>
        )}
      </Header>
      <Greeting>
        Hi {publicationCounts ? publicationCounts.name : " "}!
      </Greeting>
      <PublicationsTitle>
        TOTAL NUMBER OF PUBLICATIONS PUBLISHED
      </PublicationsTitle>
      <PublicationsSection>
        {publications.map((publication, index) => (
          <PublicationCard key={index}>
            <PublicationTitle>{publication.title}</PublicationTitle>
          </PublicationCard>
        ))}
      </PublicationsSection>
      {publicationCounts ? (
        <div>
          <PublicationCount style={{ marginLeft: "120px" }}>
            {publicationCounts.conferenceCount}
          </PublicationCount>
          <PublicationCount style={{ marginLeft: "200px" }}>
            {publicationCounts.journalCount}
          </PublicationCount>
          <PublicationCount style={{ marginLeft: "250px" }}>
            {publicationCounts.bookChapterCount}
          </PublicationCount>
          <PublicationCount style={{ marginLeft: "175px" }}>
            {publicationCounts.textbookCount}
          </PublicationCount>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {selectedResult && (
        <DetailedResultsContainer>
          <DetailedResults
            data={selectedResult}
            onBackClick={handleBackClick}
          />
        </DetailedResultsContainer>
      )}
    </DashboardContainer>
  );
}

const DashboardContainer = styled.main`
  border-radius: 25px;
  background-color: #f3f6fb;
  //   padding: 80px 58px;
  height: 93.5vh;
  width: 85vw;
  margin-left: 150px;
  margin-top: 25px;
  position: absolute;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 110px;
  right: 25px;
`;

const DetailedResultsContainer = styled.div`
  position: absolute;
  top: 0;
  margin-top: -25px;
  right: 0;
  // width: 100%;
  // height: 100vh;
  // background-color: rgba(0, 0, 0, 0.5);
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

const Header = styled.header`
  display: flex;
  margin-top: 50px;
  width: 100%;
  gap: 20px;
  color: #000;
  justify-content: space-between;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const SearchResultList = styled.div`
  &:hover {
    background-color: #f1f1f1;
  }
`;

const HeaderTitle = styled.h1`
  margin: auto 0 0 25px;
  font: 700 28px Montserrat, sans-serif;
`;

const SearchBar = styled.input`
  border-radius: 65px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  display: flex;
  // gap: 18px;
  font-size: 15px;
  font-weight: 400;
  // padding: 8px 0px;
  // border-color: #fff;

  &:focus {
    outline: none;
  }

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const SearchResultsDropdown = styled.div`
  position: absolute;
  left: 40%;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-top: 55px;
  width: 24%;
  max-height: 200px;
  overflow-y: auto;
  // z-index: 1000;
`;

const SearchResultItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ProfileSection = styled.div`
  cursor: pointer;
  margin-right: 25px;
  display: flex;
  gap: 11px;
  font-size: 20px;
  font-weight: 400;
`;

const ProfileImage = styled.div`
  background-color: #d9d9d9;
  border-radius: 50%;
  width: 58px;
  height: 51px;
`;

const ProfileName = styled.span`
  font-family: Montserrat, sans-serif;
  margin: auto 0;
`;

const Greeting = styled.h2`
  margin-left: 25px;
  color: #000;
  margin-top: 82px;
  font: 700 30px Montserrat, sans-serif;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const PublicationsTitle = styled.h3`
  color: #000;
  margin-top: 60px;
  margin-left: 25px;
  font: 700 25px Montserrat, sans-serif;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const PublicationsSection = styled.section`
  margin-top: 50px;
  margin-left: 25px;
  display: flex;
  gap: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
    margin-top: 40px;
    padding-right: 20px;
  }
`;

const PublicationCard = styled.article`
  display: flex;
  flex-direction: column;
  line-height: normal;
  flex: 1;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const PublicationTitle = styled.h4`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 25px;
  color: #000;
  margin-top: 19px;
  margin-left: 15px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const PublicationCount = styled.span`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  margin-right: 100px;
  font-size: 25px;
  align-self: center;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export default Dashboard;
