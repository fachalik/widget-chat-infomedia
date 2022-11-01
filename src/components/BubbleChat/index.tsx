import "./bubblechat.style.scss";

import PersonPinCircle from "@mui/icons-material/PersonPinCircle";
import { Box, Button, Paper } from "@mui/material";
import moment from "moment";
import React, { FC } from "react";
// import Carousel from "react-material-ui-carousel";

// import ChatContex from "../../context/ChatContext";

interface IProps {
  type: string;
  from: string;
  message: any;
  time: string;
  fileName: string;
}

const BubbleChat: FC<IProps> = ({ type, from, message, time, fileName }) => {
  // const context = React.useContext(ChatContex);
  // const classes = useStyles();

  const typeMessage = () => {
    switch (type) {
      case "image":
        if (message?.url) {
          message = message.url;
        }
        return <img src={message} alt="chat-img" />;
      case "video":
        return (
          <video controls>
            <source src={message} />
            Your browser does not support the video element.
          </video>
        );
      case "audio":
        return (
          <audio controls>
            <source src={message} />
            Your browser does not support the audio element.
          </audio>
        );
      case "location":
        return (
          <>
            <iframe
              // width="190px"
              // height="120px"
              // scrolling="no"
              // marginheight="0"
              // marginwidth="0"
              src={`https://maps.google.com/maps?q=${message.latitude},${message.longitude}&output=embed`}
            ></iframe>
          </>
        );
      case "link":
        return (
          <a
            style={{ color: "blue" }}
            target="_blank"
            href={message}
            rel="noreferrer"
          >
            {fileName}
          </a>
        );
      case "carousel":
        return (
          <>
            <p>asd</p>
          </>
          // <Carousel
          //   autoPlay={false}
          //   navButtonsAlwaysVisible
          //   indicators={false}
          //   animation="slide"
          //   stopAutoPlayOnHover
          //   navButtonsProps={{
          //     style: {
          //       margin: 0,
          //       height: "20px",
          //       width: "20px",
          //       opacity: "25%",
          //     },
          //   }}
          //   navButtonsWrapperProps={{
          //     style: {
          //       margin: 0,
          //     },
          //   }}
          // >
          //   {message.map((val, index) => (
          //     <Box
          //       key={index}
          //       width="200px"
          //       display="flex"
          //       flexDirection="column"
          //     >
          //       <Box width="100%" display="flex" justifyContent="center">
          //         <img
          //           src={val.picture}
          //           alt={val.title}
          //           style={{ width: "100%" }}
          //         />
          //       </Box>

          //       <Box fontWeight="bold">{val.title}</Box>
          //       <Box>{val.subtitle}</Box>
          //       {val.menu?.map((res, i) => (
          //         <Button
          //           variant="contained"
          //           color="primary"
          //           key={i}
          //           classes={{ root: classes.button }}
          //           onClick={() => {
          //             // context.sendMessageButton(val.value, "bot", val.label);
          //             context.sendMessageCarousel(res.value, "bot", res.label);
          //           }}
          //         >
          //           {res.label}
          //         </Button>
          //       ))}
          //     </Box>
          //   ))}
          // </Carousel>
        );
      case "button":
        let htmlString = message?.title.replaceAll("\n", "<br />");
        const urlRegex =
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        const regexResult = message?.title.match(urlRegex);
        if (regexResult?.length > 0) {
          regexResult.forEach((element: any) => {
            htmlString = htmlString.replaceAll(
              element,
              `<a style="color:#2b72e3;" target="_blank" href="${element}">${element}</a>`
            );
          });
        }
        return (
          <Box className="type-button">
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              {/* {message.title &&
                title.map((val) => (
                  <p style={{ margin: 0 }}>
                    {val}
                    <br />
                  </p>
                ))} */}
              <div dangerouslySetInnerHTML={{ __html: htmlString }} />
            </div>
            <Box display="flex" flexDirection="column">
              {message?.button?.map((val: any, index: number) => (
                <Button
                  variant="contained"
                  key={index}
                  color="primary"
                  classes={{ root: classes.button }}
                  onClick={() => {
                    console.log(val.value);
                    if (val.value === "selesai") return context.endSessionBot();
                    context.sendMessageButton(val.value, "bot", val.label);
                  }}
                >
                  {val.label}
                </Button>
              ))}
            </Box>
          </Box>
        );
      case "buttonList":
        let titleList = message?.title.split("\n");
        return (
          <Box className="type-button">
            {message?.title &&
              titleList.map((val: any) => (
                <p>
                  {val}
                  <br />
                </p>
              ))}

            <Box display="flex" flexDirection="column">
              {message?.map((val: any, index: number) => (
                <Button
                  variant="contained"
                  key={index}
                  color="primary"
                  classes={{ root: classes.button }}
                  onClick={() => {
                    console.log(e.value);
                    if (e.value === "selesai") return context.endSessionBot();
                    context.sendMessageButton(val.value, "bot", val.label);
                  }}
                >
                  {val.label}
                </Button>
              ))}
            </Box>
          </Box>
        );

      default:
        if (typeof message === "string") {
          let htmlStringText = message?.replaceAll("\n", "<br />");
          const urlRegexText =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
          const regexResultText = htmlStringText.match(urlRegexText);
          if (regexResultText?.length > 0) {
            regexResultText.forEach((element: any) => {
              htmlStringText = htmlStringText.replaceAll(
                element,
                `<a style="color:#2b72e3;" target="_blank" href="${element}">${element}</a>`
              );
            });
          }
          return <div dangerouslySetInnerHTML={{ __html: htmlStringText }} />;
        }
    }
  };

  return (
    <div className={`wgchat-wrapper-bubblechat  ${from === "me" && "me"}`}>
      <div className={`wgchat-profile-picture  ${from === "me" && "me"}`}>
        {from === "me" ? (
          <PersonPinCircle />
        ) : (
          <img
            src="https://i.ibb.co/cFGW2DW/customer-service-agent.png"
            alt="admin"
            width="22px"
            height="22px"
          />
        )}
      </div>
      <div
        className={`wgchat-bubblechat ${from === "me" && "me"}`}
        style={{ backgroundColor: from === "me" && BUBLLE_CHAT_COLOR }}
      >
        {typeMessage()}
      </div>
      <div className="wgchat-text-time">
        <span>{moment(time).format("HH:mm")}</span>
      </div>
    </div>
  );
};

export default BubbleChat;

// const useStyles = makeStyles((theme) => ({
//   button: {
//     width: "100%",
//     margin: "5px 0",
//     borderRadius: "15px",
//     backgroundColor: PRIMARY_COLOR,
//     "&:hover": {
//       backgroundColor: PRIMARY_COLOR,
//     },
//     "& .MuiButton-label": {
//       textAlign: "center !important",
//       color: "#fff !important",
//       margin: "0px !important",
//     },
//     "& .MuiTouchRipple-root": {
//       margin: "0px !important",
//     },
//   },
// }));
