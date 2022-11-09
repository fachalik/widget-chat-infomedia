/* eslint-disable jsx-a11y/iframe-has-title */
import "./index.scss";

import { Box, Button } from "@mui/material";
import moment from "moment";
import React, { FC } from "react";

import useWidgetChat from "../../store/widget-chat";
import useWidgetStore from "../../store/widget-store";
import Carousel from "../Carousel";

interface IProps {
  type: string;
  from: string;
  message: any;
  time: string;
  fileName: string;
}

const BubbleChat: FC<IProps> = ({ type, from, message, time, fileName }) => {
  const { sendMessageButton, endSessionBot } = useWidgetChat((state) => state);
  const { color } = useWidgetStore((state) => state);
  const typeMessage = () => {
    switch (type) {
      case "image":
        if (message?.url) {
          message = message.url;
        }
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img className="chat-img" src={message} alt="chat-img" />
          </Box>
        );
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
              style={{ width: "280px", height: "190px" }}
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
        return <Carousel data={message} />;
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
              <div dangerouslySetInnerHTML={{ __html: htmlString }} />
            </div>
            <Box display="flex" flexDirection="column">
              {message?.button?.map((val: any, index: number) => (
                <Button
                  variant="outlined"
                  key={index}
                  color="primary"
                  sx={{ marginBottom: "5px", width: "100%" }}
                  onClick={() => {
                    console.log(val.value);
                    if (val.value === "selesai") return endSessionBot();
                    sendMessageButton(val.value, "bot", val.label);
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
                  // classes={{ root: classes.button }}
                  onClick={(e: any) => {
                    console.log(e.target.value);
                    if (e.value === "selesai") return endSessionBot();
                    sendMessageButton(val.value, "bot", val.label);
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
          if (
            regexResultText?.length !== undefined &&
            regexResultText?.length > 0
          ) {
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
    <div
      className={`wgchat-wrapper-bubblechat  ${from === "me" && "me"}`}
      style={{ backgroundColor: color?.primary_color }}
    >
      <div
        className={`${
          type !== "image" &&
          type !== "video" &&
          type !== "audio" &&
          type !== "location" &&
          "wgchat-bubblechat"
        } ${from === "me" && "me"}`}
        style={{
          backgroundColor:
            type !== "image" &&
            type !== "video" &&
            type !== "audio" &&
            type !== "location"
              ? from === "me"
                ? `#${color.primary_color}`
                : "white"
              : "transparent",

          color: from === "me" ? "white" : "black",
        }}
      >
        {typeMessage()}
      </div>
      <div className={`wgchat-text-time ${from === "me" && "me"}`}>
        <span>{moment(time).format("HH:mm A")}</span>
      </div>
    </div>
  );
};

export default BubbleChat;
