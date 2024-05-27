import * as React from "react";
import styled from "styled-components";

function DetailedResults({ data, onBackClick }) {
  const result = data[0];

  return (
    <SearchResultsContainer>
      <SearchResultsHeader>
        <BackIcon
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d75be4bcd404b7d7ca57be4c88a6bb75f54bbc68d60d29adaec46e7324e3f5a4?apiKey=c7cb6aff308d468eaa8f6ae297335b14&"
          alt="back icon"
          onClick={onBackClick}
        />
        <SearchResultsTitle>Search Results</SearchResultsTitle>
      </SearchResultsHeader>
      <SearchResultsContent>
        <SearchResult>
          <SearchResultDetails>
            {Object.entries(result).map(([key, value], index) => (
              <SearchResultRow key={index}>
                <SearchResultKey>{key}: </SearchResultKey>
                <SearchResultValue>{value}</SearchResultValue>
              </SearchResultRow>
            ))}
          </SearchResultDetails>
        </SearchResult>
      </SearchResultsContent>
    </SearchResultsContainer>
  );
}

const SearchResultsContainer = styled.div`
  border-radius: 35px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-left: 50px;
  // padding: 80px 0 20px;
  width: 85vw;
  height: 90vh;
`;

const SearchResultsHeader = styled.header`
  align-self: start;
  display: flex;
  gap: 20px;
  font-size: 20px;
  color: #000;
  font-weight: 600;
  margin: 27px 0 0 53px;

  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

const BackIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 50px;
  margin-right: 15px;
  cursor: pointer;
`;

const SearchResultsTitle = styled.h1`
  font-family: Montserrat, sans-serif;
  //   align-self: start;
  margin-top: 10px;
  margin-bottom: 2px;
  flex-grow: 1;
  flex-basis: auto;
`;

const SearchResultsContent = styled.main`
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #f3f6fb;
  border-radius: 35px;
  margin-top: 6px;
  width: auto;
  height: 80vh;
  width: 85vw;
  overflow: hidden;
  column-count: 3;
  column-gap: 20px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const SearchResult = styled.article`
  //   gap: 20px;
  display: flex;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const SearchResultDetails = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  margin-left: 50px;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const SearchResultKey = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  margin-top: 15.5px;
  font-size: 20px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SearchResultValue = styled.p`
  font-family: Montserrat, sans-serif;
  margin-top: 15.5px;
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SearchResultRow = styled.div`
  //   max-height: 10%;
  display: flex;
  max-height: 50px;
  align-items: center;
  margin-top: 15px;
`;

export default DetailedResults;
