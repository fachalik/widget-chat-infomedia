import io from "socket.io-client";
import moment from "moment";

// import general from "../utils/general";

import useWidgetChat from "../store/widget-chat";

export default function initializeSocket(token) {
  const { clearSession, statusChat, addChat } = useWidgetChat((state) => state);
  try {
    const socketUrl = import.meta.env.VITE_API_URL;
    const tenant = import.meta.env.VITE_TENANT;
    let error = null;
    const socket = io(socketUrl, {
      transports: ["websocket"],
      autoConnect: false,
      path: tenant ? `/${import.meta.env.VITE_TENANT}/socket.io` : "",
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
        // dispatch({ type: CLEAR_SESSION });
        clearSession();
      }

      if (reason.message == "ALREADY_LOGGED_IN") {
        statusChat("Already have another active chat");
        // dispatch({
        //   type: STATUS_CHAT,
        //   payload: {
        //     status:
        //   },
        // });
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
        statusChat("You are disconnected");
        // dispatch({
        //   type: STATUS_CHAT,
        //   payload: {
        //     status: "You are disconnected",
        //   },
        // });
        console.log(`Disconnected: ${error || reason}`);
      }
    });

    socket.on("agent:message:text", (data) => {
      if (data.messageType === "carousel") {
        addChat({
          message: data.slider,
          from: "bot",
          type: data.messageType,
          time: moment().format("LLL"),
        });
        // dispatch({
        //   type: ADD_CHAT,
        //   payload: {},
        // });
      } else if (data.messageType === "button") {
        addChat({
          message: data.menu,
          from: "bot",
          type: data.messageType,
          title: data.title,
          time: moment().format("LLL"),
        });
        // dispatch({
        //   type: ADD_CHAT,
        //   payload: {},
        // });
      } else {
        addChat({
          message: data.message,
          from: data.from,
          type: "text",
          time: moment().format("LLL"),
        });
        // dispatch({
        //   type: ADD_CHAT,
        //   payload: {},
        // });
      }
      // general.INF_notifSound();
    });

    socket.on("agent:message:carousel", (data) => {
      addChat({
        message: data.message.slider,
        from: "bot",
        type: data.message.messageType,
        time: moment().format("LLL"),
      });
      // dispatch({
      //   type: ADD_CHAT,
      //   payload: {},
      // });
      // general.INF_notifSound();
    });

    socket.on("agent:message:button", (data) => {
      console.log("agent:message:button", data);
      addChat({
        message: data.message,
        from: "bot",
        type: "button",
        title: data.title ?? null,
        time: moment().format("LLL"),
      });
      // dispatch({
      //   type: ADD_CHAT,
      //   payload: {},
      // });
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
      // general.INF_notifSound();
    });

    socket.on("agent:message:media", (data) => {
      // console.log("agent:message:media", data);
      // general.INF_notifSound();
      let message;
      // if (typeof data.message !== "undefined") {
      //   message = general.INF_convertAttachment(data.message);
      // }
      // console.log(data.message, message);
      addChat({
        message: message?.message,
        from: data?.from,
        type: message?.type,
        time: moment().format("LLL"),
        mimeType: message?.mimeType,
        fileName: message?.fileName,
      });
      // dispatch({
      //   type: ADD_CHAT,
      //   payload: {
      //     message: message?.message,
      //     from: data?.from,
      //     type: message?.type,
      //     time: moment().format("LLL"),
      //     mimeType: message?.mimeType,
      //     fileName: message?.fileName,
      //   },
      // });
      // INF_ready();
      // INF_addMessage("in", data.from, data.message, "media", new Date());
    });

    socket.on("agent:event:endSession", (data) => {
      // console.log("agent:event:endSession", data);
      // general.INF_notifSound();
      statusChat("Chat live berakhir", false);
      // dispatch({
      //   type: STATUS_CHAT,
      //   payload: {
      //     chatOn: false,
      //     status: "Chat live berakhir",
      //   },
      // });
      // INF_end();'
    });

    socket.open();
  } catch (err) {
    // console.log(`Error: ${err}`);
    statusChat("You are disconnected", false);
    // dispatch({
    //   type: STATUS_CHAT,
    //   payload: {
    //     status: "You are disconnected",
    //   },
    // });
  }
}
