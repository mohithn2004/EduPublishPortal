import React, { useState } from "react";
import styled from "styled-components";

const LoginPage = ({ onLogin, onLogout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "Login successful") {
        onLogin(email);
      } else {
        alert("Login failed, check your credentials!", data.message);
      }
    } catch (error) {
      alert("Error logging in!", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    onLogout();
  };

  return (
    <PageWrapper>
      <Header>
        <LoginFormWrapper>
          <LoginForm onSubmit={handleSubmit}>
            <LoginTitle>LOGIN</LoginTitle>
            <InputGroup>
              <InputField
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Line />
            </InputGroup>
            <InputGroup>
              <InputField
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Line />
            </InputGroup>
            <SubmitButton type="submit">SIGN IN</SubmitButton>
          </LoginForm>
            <ImageWrapper>
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0448e8d786d30f2408b93cf3d84f68254bf521fa9e09fac50a579203174adb13?apiKey=ca523ab6667346798fc650e20b031f51&"
                alt="Login page image"
              />
            <InfoHeading>EduPublishPortal</InfoHeading>
            <Info>A platform to Upload and View works in Conferences, Journals, Book Chapters and Text Books </Info>
            </ImageWrapper>
        </LoginFormWrapper>
      </Header>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  background-color: #ff6f00;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const InfoHeading = styled.div`
  font-size: 30px;
  margin-top: 50px;
  margin-left: 100px;
  // align-items: center;
  font-weight: 500;
`;

const Info = styled.div`
text-align: justify;
margin-top: 25px;
  font-size: 25px;
`;

const Header = styled.header`
  background-color: #ff6f00;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 37px 60px;
  width: 100%;

  @media (max-width: 991px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const LoginFormWrapper = styled.div`
  display: flex;
  background-color: #f3f6fb;
  border-radius: 35px;
  padding-top: 35px;
  height: 85vh;
  width: 90vw;

  @media (max-width: 991px) {
    width: 100%;
    padding: 40px 20px;
  }
`;

const LoginForm = styled.form`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);
  color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 500;
  width: 30vw;
  height: 73vh;
  margin-top: 30px;
  margin-left: 100px;

  @media (max-width: 991px) {
    padding: 40px 20px;
  }
`;

const LoginTitle = styled.h2`
  margin-top: 75px;
  color: #000;
  font: 30px Montserrat, sans-serif;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-top: 40px;
`;

const InputField = styled.input`
  border: 1px solid #ffff;
  font-size: 20px;
  margin-top: 4px;
  margin-left: 40px;
  padding: 0 10px 0 10px;
  width: 80%;
  outline: none;
`;

const Line = styled.hr`
  width: 25vw;
`;

const SubmitButton = styled.button`
  background-color: #4b4b4a;
  border: none;
  border-radius: 10px;
  margin-left: 75px;
  color: #fff;
  cursor: pointer;
  width: 300px;
  font-family: Montserrat, sans-serif;
  margin-top: 75px;
  padding: 20px 0;

  &:hover {
    background-color: #000;
  }

  @media (max-width: 991px) {
    padding: 20px;
  }
`;

const ImageWrapper = styled.div`
  width: 30%;
  padding-left: 20px;
  margin-top: 50px;
  margin-left: 200px;

  @media (max-width: 991px) {
    width: 100%;
    padding-left: 0;
    margin-top: 40px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

export default LoginPage;
