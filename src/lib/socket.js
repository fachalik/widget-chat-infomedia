import io from "socket.io-client";
import moment from "moment";
import { timeout } from "./utilitys";

// import general from "../utils/general";

const initializeSocket = (
  token,
  clearSession,
  statusChat,
  addChat,
  open,
  addCountNotRead,
  loader,
  reset
) => {
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
      // console.log("Unauthorized:", reason);
      if (token !== null) {
        if (reason.message == "USER_NOT_FOUND") {
          // dispatch({ type: CLEAR_SESSION });
          clearSession();
          reset();
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
        // console.log(`Disconnected: ${error || reason}`);
      } else {
        statusChat("You are disconnected");
        // console.log(`Disconnected: ${error || reason}`);
      }
    });

    socket.on("agent:message:text", async (data) => {
      if (open === false) addCountNotRead();
      await loader();
      await console.log(data);
      // await timeout(1000);
      // await console.log("masok");
      if (data.messageType === "carousel") {
        await addChat({
          message: data.slider,
          from: "bot",
          type: data.messageType,
          time: moment().format("LLL"),
        });
      } else if (data.messageType === "button") {
        await addChat({
          message: data.menu,
          from: "bot",
          type: data.messageType,
          title: data.title,
          time: moment().format("LLL"),
        });
      } else {
        await addChat({
          message: data.message,
          from: data.from,
          type: "text",
          time: moment().format("LLL"),
        });
      }
      // general.INF_notifSound();
    });

    socket.on("agent:message:carousel", async (data) => {
      if (open === false) addCountNotRead();
      await loader();
      await console.log(data);
      // await timeout(2000);
      // await console.log("masok");
      await addChat({
        message: data.message.slider,
        from: "bot",
        type: data.message.messageType,
        time: moment().format("LLL"),
      });
      // general.INF_notifSound();
    });

    socket.on("agent:message:button", async (data) => {
      if (open === false) addCountNotRead();
      await loader();
      await console.log("agent:message:button", data);
      // await timeout(1000);
      // await console.log("masok");
      addChat({
        message: data.message,
        from: "bot",
        type: "button",
        title: data.title ?? null,
        time: moment().format("LLL"),
      });
      // general.INF_notifSound();
    });

    socket.on("agent:message:media", async (data) => {
      if (open === false) addCountNotRead();
      await loader();
      // console.log("agent:message:media", data);
      // general.INF_notifSound();
      let message;
      // if (typeof data.message !== "undefined") {
      //   message = general.INF_convertAttachment(data.message);
      // }
      // console.log(data.message, message);
      await addChat({
        message: message?.message,
        from: data?.from,
        type: message?.type,
        time: moment().format("LLL"),
        mimeType: message?.mimeType,
        fileName: message?.fileName,
      });

      // INF_ready();
      // INF_addMessage("in", data.from, data.message, "media", new Date());
    });

    socket.on("agent:event:endSession", (data) => {
      // console.log("agent:event:endSession", data);
      // general.INF_notifSound();
      statusChat("Chat live berakhir", false);
      // INF_end();'
    });

    socket.open();
  } catch (err) {
    console.log(`Error: ${err}`);
    statusChat("You are disconnected", false);
  }
};
export default initializeSocket;
