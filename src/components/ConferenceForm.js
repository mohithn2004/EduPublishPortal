import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function ConferenceForm({ email }) {
  const navigate = useNavigate();
  const { table, title } = useParams();
  const { state } = useLocation();
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    eid: "",
    Name: "",
    title: "",
    authors: "",
    position: "",
    conferenceName: "",
    citationMLA: "",
    citationAPA: "",
    link: "",
    doi: "",
    conferenceHeldAt: "",
    ISBNOrISSN: "",
    year: "",
    scopus: "",
    googleScholar: "",
    others: "",
    modeOfConduction: "",
  });

  useEffect(() => {
    if (title) {
      const fetchPublication = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/user/publication/${table}/${title}`
          );
          setFormData(response.data || {});
        } catch (error) {
          console.error("Error fetching publication:", error);
        }
      };

      fetchPublication();
    }
  }, [table, title]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title) {
        const updatedData = {};
        for (const key in formData) {
          if (formData[key] !== state[key]) {
            updatedData[key] = formData[key];
          }
        }
        await axios.put(
          `http://localhost:3001/update/${table}/${title}`,
          updatedData
        );
      } else {
        await axios.post(`http://localhost:3001/conference`, {
          ...formData,
          email,
          modeOfConduction: selectedMode,
        });
      }
      navigate("/publications");
      alert("Submitted Conference Succesfully!");
    } catch (error) {
      alert("Error submitting form:", error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setModeDropdownOpen(false);
  };

  return (
    <MainContainer>
      <Header>
        <HeaderContent>
          <Column>
            <CenteredContent>
              <AddDetailsHeading>ADD DETAILS</AddDetailsHeading>
              <ConferenceCard>
                <ConferenceImage
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8e674b1a045445078e55f5e4c5944fa9b938300822dbd948323018aff1784e1?apiKey=ca523ab6667346798fc650e20b031f51&"
                  alt="Conference"
                />
                CONFERENCE
              </ConferenceCard>
            </CenteredContent>
          </Column>
          <Column>
            <JournalHeading>JOURNAL</JournalHeading>
          </Column>
          <Column>
            <BookChapterHeading>BOOK CHAPTER</BookChapterHeading>
          </Column>
          <Column>
            <TextBookHeading>TEXT BOOK</TextBookHeading>
          </Column>
        </HeaderContent>
      </Header>
      <MainContent>
        <ContentWrapper>
          <Form onSubmit={handleSubmit}>
            <Column>
              <ConferenceDetailsSection>
                <ConferenceDetailsWrapper>
                  <Column>
                    <ConferenceDetailsContent>
                      <ConferenceDetailHeading>Title</ConferenceDetailHeading>
                      <ConferenceDetailHeading>Authors</ConferenceDetailHeading>
                      <ConferenceDetailHeading>
                        Position as an author
                      </ConferenceDetailHeading>
                      <ConferenceDetailHeading>
                        Conference Name
                      </ConferenceDetailHeading>
                      <ConferenceDetailHeading>MLA</ConferenceDetailHeading>
                      <ConferenceDetailHeading>APA</ConferenceDetailHeading>
                      <ConferenceDetailHeading>Link</ConferenceDetailHeading>
                      <ConferenceDetailHeading>DOI</ConferenceDetailHeading>
                      <ConferenceDetailHeading>
                        Place held
                      </ConferenceDetailHeading>
                    </ConferenceDetailsContent>
                  </Column>
                  <Column>
                    <ConferenceDetailsInputs>
                      <React.Fragment>
                        <InputField
                          type="text"
                          name="title"
                          value={formData.title || ""}
                          onChange={handleInputChange}
                        />
                        <InputField
                          type="text"
                          name="authors"
                          value={formData.authors || ""}
                          onChange={handleInputChange}
                        />
                        <InputField
                          type="text"
                          name="position"
                          value={formData.position || ""}
                          onChange={handleInputChange}
                        />
                        <InputField
                          type="text"
                          name="conferenceName"
                          value={formData.conferenceName || ""}
                          onChange={handleInputChange}
                        />
                        <InputField
                          type="text"
                          name="citationMLA"
                          value={formData.citationMLA || ""}
                          onChange={handleInputChange}
                        />
                        <InputField
                          type="text"
                          name="citationAPA"
                          value={formData.citationAPA || ""}
                          onChange={handleInputChange}
                        />
                        <InputField
                          type="url"
                          name="link"
                          value={formData.link || ""}
                          onChange={handleInputChange}
                        />
                        <InputField
                          type="text"
                          name="doi"
                          value={formData.doi || ""}
                          onChange={handleInputChange}
                        />
                        <InputField
                          type="text"
                          name="conferenceHeldAt"
                          value={formData.conferenceHeldAt || ""}
                          onChange={handleInputChange}
                        />
                      </React.Fragment>
                    </ConferenceDetailsInputs>
                  </Column>
                </ConferenceDetailsWrapper>
              </ConferenceDetailsSection>
            </Column>
            <Column>
              <AdditionalDetailsSection style={{ marginLeft: "25px" }}>
                <AdditionalDetailsWrapper>
                  <div>
                    <AdditionalDetailsContent>
                      <AdditionalDetailHeading style={{ marginTop: "60px" }}>
                        Scholar with Link
                      </AdditionalDetailHeading>
                      <AdditionalDetailHeading style={{ marginTop: "75px" }}>
                        ISBN/ ISSN
                      </AdditionalDetailHeading>
                      <AdditionalDetailHeading style={{ marginTop: "0px" }}>
                        Year
                      </AdditionalDetailHeading>
                      <AdditionalDetailHeading style={{ marginTop: "-20px" }}>
                        Mode Of Conduction
                      </AdditionalDetailHeading>
                    </AdditionalDetailsContent>
                  </div>
                  <Column>
                    <AdditionalDetailsInputs>
                      <ScholarCheckboxes>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="scopus"
                            checked={selectedOption === "scopus"}
                            onChange={handleOptionChange}
                          />
                          <ScholarLabel>Scopus</ScholarLabel>
                        </ScholarCheckboxWrapper>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="googleScholar"
                            checked={selectedOption === "googleScholar"}
                            onChange={handleOptionChange}
                          />
                          <ScholarLabel>Google Scholar</ScholarLabel>
                        </ScholarCheckboxWrapper>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="others"
                            checked={selectedOption === "others"}
                            onChange={handleOptionChange}
                          />
                          <ScholarLabel>Others</ScholarLabel>
                        </ScholarCheckboxWrapper>
                        <InputField
                          type="text"
                          name={selectedOption}
                          value={formData[selectedOption] || ""}
                          onChange={handleInputChange}
                        />
                      </ScholarCheckboxes>
                      <InputField
                        type="text"
                        name="ISBNOrISSN"
                        value={formData.ISBNOrISSN || ""}
                        onChange={handleInputChange}
                        style={{ marginTop: "40px" }}
                      />
                      <InputField
                        type="number"
                        name="year"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={formData.year || ""}
                        onChange={handleInputChange}
                        style={{ marginTop: "40px" }}
                      />
                      <ModeOfConductionSelect
                        style={{ marginTop: "30px" }}
                        onClick={() => setModeDropdownOpen(!modeDropdownOpen)}
                      >
                        <div style={{ zIndex: "2", marginLeft: "25px" }}>
                          <ModeOfConductionLabel>
                            {selectedMode || "Select mode"}
                          </ModeOfConductionLabel>
                          <ModeOfConductionIcon
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2804f4ac7e60895792b589fda6b4b05d5056e96d3dc4a1e7daa9e87806a5017?apiKey=ca523ab6667346798fc650e20b031f51&"
                            alt="Mode of Conduction"
                            style={{ marginTop: "0px" }}
                          />
                        </div>
                        {modeDropdownOpen && (
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => handleModeSelect("Online")}
                            >
                              Online
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleModeSelect("Offline")}
                            >
                              Offline
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleModeSelect("Hybrid")}
                            >
                              Hybrid
                            </DropdownItem>
                          </DropdownMenu>
                        )}
                      </ModeOfConductionSelect>
                    </AdditionalDetailsInputs>
                  </Column>
                </AdditionalDetailsWrapper>
              </AdditionalDetailsSection>
            </Column>
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        </ContentWrapper>
      </MainContent>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  border-radius: 25px;
  margin-left: 50px;
  background-color: #fff;
  margin-top: 25px;
  height: 90vh;
  width: 85vw;
  display: flex;
  // padding-left: 25px;
  flex-direction: column;
  //   padding-top: 56px;
`;

const Header = styled.header`
  width: 100%;
  // margin-left: 250px;
  padding: 0 20px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  gap: 100px;
  // margin-left: 50px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 100%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const CenteredContent = styled.div`
  // display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  color: #000;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const AddDetailsHeading = styled.h2`
  font: 600 25px Montserrat, sans-serif;
`;

const ConferenceCard = styled.div`
  display: flex;
  z-index: 0;
  flex-direction: column;
  position: absolute;
  fill: #f3f6fb;
  filter: drop-shadow(0px -4px 1px rgba(0, 0, 0, 0.25));
  overflow: hidden;
  border-radius: 0 15px 0 0;
  padding-top: 10px;
  align-items: center;
  white-space: nowrap;
  height: 5vh;
  width: 15vw;
  top: 87px;
  left: 160px;
  font: 500 20px Montserrat, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`;

const ConferenceImage = styled.img`
  position: absolute;
  inset: 0;
  z-index: -1;
  height: 100%;
  //   width: 100%;
  // object-fit: cover;
  // object-position: center;
`;

const JournalHeading = styled.h3`
  color: rgba(0, 0, 0, 0.4);
  margin-top: 74px;
  font: 500 15px Montserrat, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const BookChapterHeading = styled.h3`
  color: rgba(0, 0, 0, 0.4);
  margin-top: 74px;
  font: 500 15px Montserrat, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const TextBookHeading = styled.h3`
  color: rgba(0, 0, 0, 0.4);
  margin-top: 74px;
  font: 500 15px Montserrat, sans-serif;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const MainContent = styled.section`
  // z-index: 2;
  background-color: rgba(243, 246, 251, 1);
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.25);
  // width: 100%;
  border-radius: 0 0 25px 25px;
  // margin-left: 25%;

  height: 70vh;
  padding: 32px 66px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  // margin-left: 150px;
  gap: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 0;
  }
`;

const ConferenceDetailsSection = styled.section`
  margin-top: 9px;
  flex-grow: 1;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ConferenceDetailsWrapper = styled.div`
  display: flex;
  gap: 20px;
  // width: 20%;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 0;
  }
`;

const ConferenceDetailsContent = styled.div`
  // display: flex;
  margin-top: 4px;
  flex-grow: 1;
  flex-direction: column;
  font-size: 20px;
  color: #000;
  //   font-weight: 400;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const ConferenceDetailHeading = styled.h4`
  font-family: Montserrat, sans-serif;
  margin-top: 35.5px;
  &:first-child {
    margin-top: 0;
  }
`;

const ConferenceDetailsInputs = styled.div`
  display: flex;
  height: 15vh;
  // margin-left: 150px;
  flex-grow: 1;
  flex-direction: column;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const InputField = styled.input`
  border-radius: 10px;
  // box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(75, 75, 74, 0.2);
  background-color: #fff;
  padding-left: 20px;
  width: 250px;
  height: 25px;
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
`;

const AdditionalDetailsSection = styled.section`
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const AdditionalDetailsWrapper = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 0;
  }
`;

const AdditionalDetailsContent = styled.div`
  display: flex;
  margin-top: 29px;
  flex-grow: 1;
  flex-direction: column;
  font-size: 25px;
  color: #000;
  font-weight: 400;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const AdditionalDetailHeading = styled.h5`
  font-family: Montserrat, sans-serif;
  margin-bottom: 45px;
  margin-left: 50px;
  &:first-child {
    margin-top: 0;
  }
`;

const AdditionalDetailsInputs = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  margin-left: 50px;
  margin-bottom: 50px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const ScholarCheckboxes = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #000;
  line-height: 10%;
  margin-top: 30px;
  justify-content: center;
  border-radius: 16px;
  // box-shadow: 0px 32px 32px -24px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  width: 100%;
  padding: 8px;
`;

const ScholarCheckboxWrapper = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
`;

const ScholarCheckbox = styled.input.attrs({ type: "radio" })`
  border-radius: 6px;
  border: 1px solid rgba(97, 97, 97, 1);
  background-color: var(--White, #fff);
  width: 15px;
  height: 15px;
`;

const ScholarLabel = styled.span`
  font-variant-numeric: lining-nums tabular-nums;
  font-family: Montserrat, sans-serif;
  flex: 1;
`;

const ModeOfConductionSelect = styled.div`
  border-radius: 10px;
  // box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(75, 75, 74, 0.2);
  background-color: #fff;
  display: flex;
  margin-top: 120px;
  gap: 9px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.4);
  padding: 4px 43px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const ModeOfConductionLabel = styled.span`
  font-family: Montserrat, sans-serif;
  flex-grow: 1;
`;

const ModeOfConductionIcon = styled.img`
  aspect-ratio: 1.47;
  object-fit: contain;
  width: 25px;
  align-self: start;
`;

const DropdownMenu = styled.div`
  position: absolute;
  z-index: -1;
  bottom: 3%;
  right: 11.5%;
  width: 19.42%;
  background-color: #fff;
  border: 1px solid rgba(75, 75, 74, 0.2);
  border-radius: 0 0 8px 8px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  // margin-top: 40px;
`;

const SubmitButton = styled.button`
  background-color: #4b4b4a;
  border: none;
  color: white;
  position: absolute;
  padding: 12px 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  bottom: 25px;
  right: 100px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5e5e5d;
  }
`;

export default ConferenceForm;
