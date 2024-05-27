import React, { useState } from "react";
import RevaLogo from "./MainLogo.png"
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import ConferenceForm from "./ConferenceForm";
import JournalForm from "./JournalForm";
import BookChapterForm from "./BookChapterForm";
import TextBookForm from "./TextBookForm";
import YourPublications from "./YourPublications";

const images = [
  {
    id: 1,
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e63ba1c725625a1710dfad82c80171c171531224bd09573a973053e825488930?apiKey=ca523ab6667346798fc650e20b031f51&",
    alt: "Image 1",
    link: "/",
  },
  {
    id: 2,
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b3d09f79aa985406929d16cab3b6e649a3f529ce98cbef14c6ce39354eceef17?apiKey=ca523ab6667346798fc650e20b031f51&",
    alt: "Image 2",
    link: "/conference-form",
  },
  {
    id: 3,
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c243fb179d81da82e4072ae0a46bc9d45f07fe476e9a219440cb4129edd78c92?apiKey=ca523ab6667346798fc650e20b031f51&",
    alt: "Image 3",
    link: "/journal-form",
  },
  {
    id: 4,
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/568e541f27a0db21c8d41453e457305b60b9c8a76bc85126e9de99d5b872301a?apiKey=ca523ab6667346798fc650e20b031f51&",
    alt: "Image 4",
    link: "/book-chapter-form",
  },
  {
    id: 5,
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6c3e64f8a0d3e5febae9adcbbffe12b8b2792574f6500d8e07a4a467ecee5cd8?apiKey=ca523ab6667346798fc650e20b031f51&",
    alt: "Image 5",
    link: "/text-book-form",
  },
];

function HomeScreen({ email, onLogout }) {
  const [circleMargin, setCircleMargin] = useState(100);

  const handleImageClick = (index) => {
    switch (index) {
      case 1:
        setCircleMargin(100);
        break;
      case 2:
        setCircleMargin(200);
        break;
      case 3:
        setCircleMargin(295);
        break;
      case 4:
        setCircleMargin(395);
        break;
      case 5:
        setCircleMargin(490);
        break;
      default:
        setCircleMargin(120);
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <Router>
      <MainContainer>
        <HomeContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Logo
              src={RevaLogo}
              alt="Logo"
            />
            <CircleContainer
              style={{ top: `${circleMargin}px`, transition: "top 0.5s ease" }}
            />
            {images.map((image) => (
              <Link
                key={image.id}
                to={image.link}
                style={{ marginTop: "75px", zIndex: "3" }}
                onClick={() => handleImageClick(image.id)}
              >
                <ImageItem src={image.src} alt={image.alt} />
              </Link>
            ))}
          </div>

          <Routes>
            <Route
              path="/"
              element=<Dashboard email={email} onLogout={handleLogout} />
            />
            <Route
              path="/conference-form"
              element=<ConferenceForm email={email} />
            />
            <Route
              path="/journal-form"
              element={<JournalForm email={email} />}
            ></Route>
            <Route
              path="/book-chapter-form"
              element=<BookChapterForm email={email} />
            />
            <Route
              path="/text-book-form"
              element=<TextBookForm email={email} />
            />
            <Route
              path="/publications"
              element=<YourPublications onLogout={onLogout} email={email} />
            />
            <Route
              path="/edit/:table/:title"
              element={<EditForm email={email} />}
            />
            <Route
              path="/userProfile"
              element=<UserProfile email={email} onLogout={handleLogout} />
            />
          </Routes>
        </HomeContainer>
      </MainContainer>
    </Router>
  );
}

const EditForm = ({email}) => {
  const { table } = useParams();
  switch (table) {
    case 'conference':
      return <ConferenceForm email={email} />;
    case 'journal':
      return <JournalForm email={email} />;
    case 'bookchapter':
      return <BookChapterForm email={email} />;
    case 'textbook':
      return <TextBookForm email={email} />;
    default:
      return <div>Invalid form type</div>;
  }
};

const MainContainer = styled.main`
  height: 100vh;
  width: 100vw;
  z-index: -1;
  background-color: #ff6f00;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: -5px;
  // padding: 77px 41px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const HomeContainer = styled.div`
  display: flex;
`;

const Logo = styled.img`
  width: 75px;
  margin-left: 35px;
  margin-top: 25px;
`;

const CircleContainer = styled.div`
  position: absolute;
  z-index: 0;
  background-color: #4b4b4a;
  border-radius: 50%;
  margin-top: 37px;
  margin-left: 35px;
  width: 70px;
  height: 70px;
`;

const ImageItem = styled.img`
  cursor: pointer;
  z-index: 1;
  width: 40px;
  margin-top: 75px;
  // margin: 68px 0 0 50px;

  &:first-of-type {
    z-index: 10;
    margin: -65px 0 0 50px;
  }

  @media (max-width: 991px) {
    margin: 40px 0 0 10px;

    &:first-of-type {
      margin-left: 10px;
    }
  }
`;

export default HomeScreen;
