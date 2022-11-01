import io from "socket.io-client";
import { ADD_CHAT, CLEAR_SESSION, STATUS_CHAT } from "../context/ChatTypes";
import moment from "moment";

import general from "../utils/general";

export default function initializeSocket(dispatch, token) {
  try {
    const socketUrl = process.env.API_URL;
    const tenant = process.env.TENANT;
    let error = null;
    const socket = io(socketUrl, {
      transports: ["websocket"],
      autoConnect: false,
      path: tenant ? `/${process.env.TENANT}/socket.io` : "",
    });

    socket.on("connect", () => {
      // console.log("Connected");
      socket.emit("authentication", {
        token: token,
      });
    });

    socket.on("unauthorized", (reason) => {
      console.log("Unauthorized:", reason);
      if (reason.message == "USER_NOT_FOUND") {
        dispatch({ type: CLEAR_SESSION });
      }

      if (reason.message == "ALREADY_LOGGED_IN") {
        dispatch({
          type: STATUS_CHAT,
          payload: {
            status: "Already have another active chat",
          },
        });
      }

      error = reason.message;

      // socket.disconnect();
      // dispatch({
      //   type: STATUS_CHAT,
      //   payload: {
      //     status: "Already have another active chat",
      //   },
      // });
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect" || reason === "transport close") {
        socket.connect();
        console.log(`Disconnected: ${error || reason}`);
      } else {
        dispatch({
          type: STATUS_CHAT,
          payload: {
            status: "You are disconnected",
          },
        });
        console.log(`Disconnected: ${error || reason}`);
      }
    });

    socket.on("agent:message:text", (data) => {
      if (data.messageType === "carousel") {
        dispatch({
          type: ADD_CHAT,
          payload: {
            message: data.slider,
            from: "bot",
            type: data.messageType,
            time: moment().format("LLL"),
          },
        });
      } else if (data.messageType === "button") {
        dispatch({
          type: ADD_CHAT,
          payload: {
            message: data.menu,
            from: "bot",
            type: data.messageType,
            title: data.title,
            time: moment().format("LLL"),
          },
        });
      } else {
        dispatch({
          type: ADD_CHAT,
          payload: {
            message: data.message,
            from: data.from,
            type: "text",
            time: moment().format("LLL"),
          },
        });
      }
      general.INF_notifSound();
    });

    socket.on("agent:message:carousel", (data) => {
      dispatch({
        type: ADD_CHAT,
        payload: {
          message: data.message.slider,
          from: "bot",
          type: data.message.messageType,
          time: moment().format("LLL"),
        },
      });
      general.INF_notifSound();
    });

    socket.on("agent:message:button", (data) => {
      console.log("agent:message:button", data);
      dispatch({
        type: ADD_CHAT,
        payload: {
          message: data.message,
          from: "bot",
          type: "button",
          title: data.title ?? null,
          time: moment().format("LLL"),
        },
      });
      // if (data.messageType === "carousel") {
      //   dispatch({
      //     type: ADD_CHAT,
      //     payload: {
      //       message: data.slider,
      //       from: "bot",
      //       type: data.messageType,
      //       time: moment().format("LLL"),
      //     },
      //   });
      // } else if (data.messageType === "button") {
      //   dispatch({
      //     type: ADD_CHAT,
      //     payload: {
      //       message: data.menu,
      //       from: "bot",
      //       type: data.messageType,
      //       title: data.title,
      //       time: moment().format("LLL"),
      //     },
      //   });
      // } else {
      //   dispatch({
      //     type: ADD_CHAT,
      //     payload: {
      //       message: data.message,
      //       from: data.from,
      //       type: "text",
      //       time: moment().format("LLL"),
      //     },
      //   });
      // }
      general.INF_notifSound();
    });

    socket.on("agent:message:media", (data) => {
      // console.log("agent:message:media", data);
      general.INF_notifSound();
      let message;
      if (typeof data.message !== "undefined") {
        message = general.INF_convertAttachment(data.message);
      }
      // console.log(data.message, message);
      dispatch({
        type: ADD_CHAT,
        payload: {
          message: message?.message,
          from: data?.from,
          type: message?.type,
          time: moment().format("LLL"),
          mimeType: message?.mimeType,
          fileName: message?.fileName,
        },
      });
      // INF_ready();
      // INF_addMessage("in", data.from, data.message, "media", new Date());
    });

    socket.on("agent:event:endSession", (data) => {
      // console.log("agent:event:endSession", data);
      general.INF_notifSound();
      dispatch({
        type: STATUS_CHAT,
        payload: {
          chatOn: false,
          status: "Chat live berakhir",
        },
      });
      // INF_end();'
    });

    socket.open();
  } catch (err) {
    // console.log(`Error: ${err}`);
    dispatch({
      type: STATUS_CHAT,
      payload: {
        status: "You are disconnected",
      },
    });
  }
}
