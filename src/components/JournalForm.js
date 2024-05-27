import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function JournalForm({ email }) {
  const [selectedScholar, setSelectedScholar] = useState("");
  const navigate = useNavigate();
  const { table, title } = useParams();
  const { state } = useLocation();
  const handleScholarChange = (event) => {
    setSelectedScholar(event.target.value);
  };

  const [selectedQ, setSelectedQ] = useState("");

  const handleQChange = (event) => {
    setSelectedQ(event.target.value);
  };

  const [formData, setFormData] = useState({
    eid: "",
    Name: "",
    title: "",
    journalName: "",
    posting: "",
    authors: "",
    citationMLA: "",
    citationAPA: "",
    link: "",
    doi: "",
    volume: "",
    issue: "",
    monthAndYear: "",
    pageNo: "",
    ISBNOrISSN: "",
    scopus: "",
    googleScholar: "",
    others: "",
    Qrated: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      Qrated: selectedQ,
    }));
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
        await axios.post(`http://localhost:3001/journal`, {
          ...formData,
          email,
        });
      }
      navigate("/publications");
      alert("submitted Journal Successfully!");
    } catch (error) {
      alert("Error submitting form:", error);
    }
  };
  return (
    <MainContainer>
      <Header>
        <HeaderContent>
          <Column>
            <CenteredContent>
              <AddDetailsHeading>ADD DETAILS</AddDetailsHeading>
              <JournalCard>
                <JournalImage
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8e674b1a045445078e55f5e4c5944fa9b938300822dbd948323018aff1784e1?apiKey=ca523ab6667346798fc650e20b031f51&"
                  alt="Conference"
                />
                JOURNAL
              </JournalCard>
            </CenteredContent>
          </Column>
          <Column>
            <ConferenceHeading>CONFERENCE</ConferenceHeading>
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
              <JournalDetailsSection>
                <JournalDetailsWrapper>
                  <Column>
                    <JournalDetailsContent>
                      <JournalDetailHeading>Title</JournalDetailHeading>
                      <JournalDetailHeading>Journal Name</JournalDetailHeading>
                      <JournalDetailHeading>
                        Position as an author
                      </JournalDetailHeading>
                      <JournalDetailHeading>Authors</JournalDetailHeading>
                      <JournalDetailHeading>MLA</JournalDetailHeading>
                      <JournalDetailHeading>APA</JournalDetailHeading>
                      <JournalDetailHeading>Link</JournalDetailHeading>
                      <JournalDetailHeading>DOI</JournalDetailHeading>
                      <JournalDetailHeading>Volume</JournalDetailHeading>
                      <JournalDetailHeading>Issue</JournalDetailHeading>
                      <JournalDetailHeading>
                        Month and year
                      </JournalDetailHeading>
                    </JournalDetailsContent>
                  </Column>
                  <Column>
                    <JournalDetailsInputs>
                      <React.Fragment>
                        <InputField
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                        <InputField
                          type="text"
                          name="journalName"
                          value={formData.journalName}
                          onChange={handleChange}
                        />
                        <InputField
                          type="text"
                          name="posting"
                          value={formData.posting}
                          onChange={handleChange}
                        />
                        <InputField
                          type="text"
                          name="authors"
                          value={formData.authors}
                          onChange={handleChange}
                        />
                        <InputField
                          type="text"
                          name="citationMLA"
                          value={formData.citationMLA}
                          onChange={handleChange}
                        />
                        <InputField
                          type="text"
                          name="citationAPA"
                          value={formData.citationAPA}
                          onChange={handleChange}
                        />
                        <InputField
                          type="url"
                          name="link"
                          value={formData.link}
                          onChange={handleChange}
                        />
                        <InputField
                          type="text"
                          name="doi"
                          value={formData.doi}
                          onChange={handleChange}
                        />
                        <InputField
                          type="text"
                          name="volume"
                          value={formData.volume}
                          onChange={handleChange}
                        />
                        <InputField
                          type="text"
                          name="issue"
                          value={formData.issue}
                          onChange={handleChange}
                        />
                        <InputField
                          type="month"
                          name="monthAndYear"
                          value={formData.monthAndYear}
                          onChange={handleChange}
                        />
                      </React.Fragment>
                    </JournalDetailsInputs>
                  </Column>
                </JournalDetailsWrapper>
              </JournalDetailsSection>
            </Column>
            <Column>
              <AdditionalDetailsSection>
                <AdditionalDetailsWrapper>
                  <div>
                    <AdditionalDetailsContent>
                      <AdditionalDetailHeading>Page No</AdditionalDetailHeading>
                      <AdditionalDetailHeading>
                        ISBN/ ISSN
                      </AdditionalDetailHeading>
                      <AdditionalDetailHeading style={{ marginTop: "75px" }}>
                        Scholar with Link
                      </AdditionalDetailHeading>
                      <AdditionalDetailHeading style={{ marginTop: "150px" }}>
                        QRated
                      </AdditionalDetailHeading>
                    </AdditionalDetailsContent>
                  </div>
                  <Column>
                    <AdditionalDetailsInputs>
                      <InputField
                        type="text"
                        name="pageNo"
                        value={formData.pageNo}
                        onChange={handleChange}
                      />
                      <InputField
                        style={{ marginTop: "40px" }}
                        type="text"
                        name="ISBNOrISSN"
                        value={formData.ISBNOrISSN}
                        onChange={handleChange}
                      />
                      <ScholarCheckboxes>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="googleScholar"
                            checked={selectedScholar === "googleScholar"}
                            onChange={handleScholarChange}
                          />
                          <ScholarLabel>Google Scholar</ScholarLabel>
                        </ScholarCheckboxWrapper>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="scopus"
                            checked={selectedScholar === "scopus"}
                            onChange={handleScholarChange}
                          />
                          <ScholarLabel>Scopus</ScholarLabel>
                        </ScholarCheckboxWrapper>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="others"
                            checked={selectedScholar === "others"}
                            onChange={handleScholarChange}
                          />
                          <ScholarLabel>Others</ScholarLabel>
                        </ScholarCheckboxWrapper>
                        <InputField
                          type="text"
                          name={selectedScholar}
                          value={formData[selectedScholar]}
                          onChange={handleChange}
                        />
                      </ScholarCheckboxes>

                      <ScholarCheckboxes>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="Q1"
                            checked={selectedQ === "Q1"}
                            onChange={handleQChange}
                          />
                          <ScholarLabel>Q1</ScholarLabel>
                        </ScholarCheckboxWrapper>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="Q2"
                            checked={selectedQ === "Q2"}
                            onChange={handleQChange}
                          />
                          <ScholarLabel>Q2</ScholarLabel>
                        </ScholarCheckboxWrapper>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="Q3"
                            checked={selectedQ === "Q3"}
                            onChange={handleQChange}
                          />
                          <ScholarLabel>Q3</ScholarLabel>
                        </ScholarCheckboxWrapper>
                        <ScholarCheckboxWrapper>
                          <ScholarCheckbox
                            type="radio"
                            value="Q4"
                            checked={selectedQ === "Q4"}
                            onChange={handleQChange}
                          />
                          <ScholarLabel>Q4</ScholarLabel>
                        </ScholarCheckboxWrapper>
                      </ScholarCheckboxes>
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

const JournalCard = styled.div`
  display: flex;
  z-index: 0;
  flex-direction: column;
  position: absolute;
  fill: #f3f6fb;
  filter: drop-shadow(0px -4px 1px rgba(0, 0, 0, 0.25));
  overflow: hidden;
  border-radius: 15px 15px 0 0;
  padding-top: 10px;
  align-items: center;
  white-space: nowrap;
  height: 5vh;
  width: 15vw;
  top: 87px;
  left: 500px;
  font: 500 20px Montserrat, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`;

const JournalImage = styled.img`
  position: absolute;
  inset: 0;
  z-index: -1;
  height: 100%;
  //   width: 100%;
  // object-fit: cover;
  // object-position: center;
`;

const ConferenceHeading = styled.h3`
  position: absolute;
  left: 250px;
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

const JournalDetailsSection = styled.section`
  margin-top: 9px;
  flex-grow: 1;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const JournalDetailsWrapper = styled.div`
  display: flex;
  gap: 20px;
  // width: 20%;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 0;
  }
`;

const JournalDetailsContent = styled.div`
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

const JournalDetailHeading = styled.h4`
  font-family: Montserrat, sans-serif;
  margin-top: 15px;
  &:first-child {
    margin-top: 0;
  }
`;

const JournalDetailsInputs = styled.div`
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
  margin-top: 21px;
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
  margin-left: 50px;
  gap: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 0;
  }
`;

const AdditionalDetailsContent = styled.div`
  display: flex;
  margin-top: 10px;
  flex-grow: 1;
  flex-direction: column;
  font-size: 23px;
  color: #000;
  font-weight: 400;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const AdditionalDetailHeading = styled.h5`
  font-family: Montserrat, sans-serif;
  margin-bottom: 10px;
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
  margin-top: 10px;
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

const Form = styled.form`
  display: flex;
  // justify-content: center;
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

export default JournalForm;
