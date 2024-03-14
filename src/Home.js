import Input from "./CommonComponent/Input";
import { BsStars } from "react-icons/bs";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineAudio } from "react-icons/ai";
import Drawer from "./CommonComponent/Drawer";
import { CardData } from "./Helper/CardData";
import Singlecard from "./CommonComponent/SingleCard";
import ImageWithText from "./CommonComponent/ImageGrid";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [leftIcon, setLeftIcon] = useState(<RxCross2 />);
  const [rightIcon, setRightIcon] = useState(<FaUserAlt />);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([{ sender: "", text: "" }]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setLeftIcon(<RxCross2 />);
    setRightIcon(<FaUserAlt />);
    setSelectedCard(null);
  };

  const handleCardClick = (index) => {
    setSelectedCard(CardData[index]);
    setLeftIcon(<IoMdArrowRoundBack />);
    setRightIcon(<AiOutlineAudio />);
    setIsDrawerOpen(true);
  };

  const handleUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);
    setTimeout(() => {
      handleBotResponse(message.toLowerCase());
    }, 2000);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUserMessage(inputValue);
      setInputValue("");
    }
  };

  const handleClick = () => {
    handleUserMessage(inputValue);
    setInputValue("");
  };

  const handleBotResponse = (message) => {
    let botMessage = "";
    switch (message) {
      case "hi":
      case "hello":
        botMessage = "Hi there! How can I help you?";
        break;
      case "how are you?":
        botMessage =
          "I'm just a static bot, so I don't have feelings, but thanks for asking!";
        break;
      default:
        botMessage = "I'm sorry, I didn't understand that.";
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: botMessage },
    ]);
  };

  return (
    <div className="main-container">
      <div className="icon-wrapper" onClick={toggleDrawer}>
        <BsStars />
      </div>
      <div className="centeredContainer">
        <div className="content">
          <p className="centeredText">
            Hey there, great to meet you. I’m Pi, your personal AI.
          </p>
          <p className="centeredText">
            My goal is to be useful, friendly and fun. Ask me for advice, for
            answers, or let’s talk about whatever’s on your mind.
          </p>
          <p className="centeredText">How's your day going?</p>
        </div>
        <div className="inputContainer"></div>
        <Input handleUserMessage={handleUserMessage} />
        <div className="footerText">
          By using Pi, you agree to our{" "}
          <span className="footer-link">Terms</span> and{" "}
          <span className="footer-link">Privacy Policy.</span>
        </div>
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        selectedCard={selectedCard}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onLeftIconClick={() => {
          if (selectedCard) {
            setSelectedCard(null);
            setLeftIcon(<RxCross2 />);
            setRightIcon(<FaUserAlt />);
          } else {
            toggleDrawer();
          }
        }}
        onRightIconClick={() => console.log("Right icon clicked")}
      >
        {selectedCard ? (
          <>
            <div className="signle-card-wrapper">
              <Singlecard data={selectedCard} />
              {messages && (
                <div className="chat-container">
                  <div className="chat-box">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`message ${
                          message.sender === "bot" ? "bot" : "user"
                        }`}
                      >
                        {message.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Input
              handleKeyDown={handleKeyDown}
              inputValue={inputValue}
              handleChange={handleChange}
              handleClick={handleClick}
            />
          </>
        ) : (
          <div className="imageGrid">
            {CardData.map((data, index) => (
              <>
                {(index % 3 === 0 || index % 3 === 1) && (
                  <div className="imageRow">
                    <ImageWithText
                      handleCardClick={() => handleCardClick(index)}
                      imageUrl={data?.image}
                      text={data?.content}
                      description={data?.description}
                    />
                  </div>
                )}
                {index % 3 === 2 && (
                  <ImageWithText
                    handleCardClick={() => handleCardClick(index)}
                    imageUrl={data?.image}
                    text={data?.content}
                    description={data?.description}
                  />
                )}
              </>
            ))}
          </div>
        )}
      </Drawer>
    </div>
  );
}
