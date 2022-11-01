/* eslint-disable no-unused-vars */
import moment from "moment";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import general from "../lib/general";
import http from "../lib/https";
// import socket from "../lib/socket";

type Store = {
  chat: any[];
  INF_token: string | null | any;
  loading: boolean;
  message: any[];
  chatOn: boolean;
  status: string | null;
  error: string | null;

  createSession: (postData: any) => void;
  clearSession: () => void;
  getHistoryChat: (token: any) => void;
  setSession: (token: any) => void;
  sendMessage: (message: string, type: string, label: string) => void;
  sendMessageButton: (message: string, type: string, label: string) => void;
  sendFiles: (files: any) => void;
  sendLocation: (message: string) => void;
  endSession: () => void;
  endSessionBot: () => void;
  sendRating: (value: any) => void;
  statusChat: (value: any, chatOn: boolean) => void;
  setError: (val: any) => void;
  addChat: (chat: any) => void;
  reset: () => void;
};

const initialState = {
  chat: [],
  INF_token: null,
  loading: false,
  message: [],
  chatOn: false,
  status: "",
  error: null,
};

const useWidgetChat = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        async createSession(postData: any) {
          const { setError } = get();
          try {
            set(() => ({ loading: true }));

            const response = await http().post("/createSession", postData);
            if (!response.data?.error) {
              localStorage.setItem("INF_token", response.data?.session);
              // change code in socket with zustand
              // socket(dispatch, response.data?.session);
              set(() => ({
                INF_token: response.data?.session,
                chatOn: true,
                status: "you are connected",
              }));
            }
            set(() => ({ loading: false }));
          } catch (error: any) {
            if (error.response?.data.message) {
              setError(error.response.data.message);
            } else {
              setError("Something wrong");
            }
            set(() => ({ loading: false }));
          }
        },

        setSession(token: any) {
          set(() => ({
            INF_token: token,
            chatOn: true,
            status: "You are connected",
          }));
        },

        setError(val: any) {
          set(() => ({ error: `Error : ${val}` }));

          setTimeout(() => {
            set(() => ({ error: null }));
          }, 2000);
        },

        clearSession() {
          set(() => ({
            message: [],
            chatOn: false,
            status: "Silahkan isi form untuk memulai chat",
            INF_token: null,
          }));
        },

        async getHistoryChat(token: any) {
          const { setError } = get();
          try {
            const postData = {
              token: token,
            };
            const response = await http().post(
              "/client/getChatHistory",
              postData
            );

            if (!response.data?.error && response.data.data) {
              response.data.data
                ?.filter(
                  (val: { message: string }) =>
                    val?.message !==
                    "Pelanggan telah mengakhiri sesi percakapan."
                )
                .forEach(
                  (val: {
                    direction: string;
                    messageType: string;
                    message: { slider: any; messageType: any };
                    dateSend: moment.MomentInput;
                    from: any;
                    title: any;
                  }) => {
                    if (val.direction === "customer") {
                      if (
                        val.messageType !== "text" &&
                        val.messageType !== "location"
                      ) {
                        const message = general.INF_convertAttachment(
                          val.message
                        );
                        set((state) => ({
                          message: [
                            ...state.message,
                            {
                              message: val.message,
                              from: "me",
                              type: message.type,
                              time: moment(val.dateSend).format("LLL"),
                              mimeType: message?.mimeType,
                              fileName: message?.fileName,
                            },
                          ],
                        }));
                      } else {
                        set((state) => ({
                          message: [
                            ...state.message,
                            {
                              message: val.message,
                              from: "me",
                              type: val.messageType,
                              time: moment(val.dateSend).format("LLL"),
                            },
                          ],
                        }));
                      }
                    } else {
                      // masih dipertanyakan
                      if (
                        val.messageType !== "text" &&
                        val.messageType !== "location" &&
                        val.messageType !== "carousel" &&
                        val.messageType === "button"
                      ) {
                        const message = general.INF_convertAttachment(
                          val.message
                        );
                        set((state) => ({
                          message: [
                            ...state.message,
                            {
                              message: message.message,
                              from: val.from,
                              type: message.type,
                              time: moment(val.dateSend).format("LLL"),
                              mimeType: message?.mimeType,
                              fileName: message?.fileName,
                            },
                          ],
                        }));
                      } else if (val.messageType === "carousel") {
                        set((state) => ({
                          message: [
                            ...state.message,
                            {
                              message: val.message.slider,
                              from: "bot",
                              type: val.message.messageType,
                              time: moment().format("LLL"),
                            },
                          ],
                        }));
                      } else if (val.messageType === "button") {
                        set((state) => ({
                          message: [
                            ...state.message,
                            {
                              message: val.message,
                              from: "bot",
                              type: val.messageType,
                              title: val.title,
                              time: moment().format("LLL"),
                            },
                          ],
                        }));
                      } else if (val.messageType === "buttonList") {
                        set((state) => ({
                          message: [
                            ...state.message,
                            {
                              message: val.message,
                              from: "bot",
                              type: val.messageType,
                              title: val.title,
                              time: moment().format("LLL"),
                            },
                          ],
                        }));
                      } else {
                        set((state) => ({
                          message: [
                            ...state.message,
                            {
                              message: val.message,
                              from: val.from,
                              type: val.messageType,
                              time: moment(val.dateSend).format("LLL"),
                            },
                          ],
                        }));
                      }
                    }
                  }
                );
            }
          } catch (error: any) {
            console.log(error);
            if (error.response?.data.message) {
              setError(error.response.data.message);
            } else {
              setError("Something wrong");
            }
            set(() => ({ loading: false }));
          }
        },

        addChat(chat: any) {
          set((state) => ({
            message: [...state.message, chat],
          }));
        },

        async sendMessage(
          message: any,
          type: string = "text",
          label: string = "success"
        ) {
          const { INF_token, setError } = get();
          try {
            const postData = {
              message,
              token: INF_token,
            };
            const response = await http().post("/client/reply/text", postData);
            if (!response.data?.error) {
              set((state) => ({
                message: [
                  ...state.message,
                  {
                    message: type !== "bot" ? message : label,
                    from: "me",
                    type: "text",
                    time: moment().format("LLL"),
                  },
                ],
              }));
            }
          } catch (error: any) {
            if (error.response?.data.message) {
              setError(error.response.data.message);
            } else {
              setError("Something wrong");
            }
            set(() => ({ loading: false }));
          }
        },

        async sendMessageButton(
          message: string,
          type: string = "text",
          label: string = "success"
        ) {
          const { INF_token, setError } = get();
          try {
            const postData = {
              message,
              token: INF_token,
            };
            set((state) => ({
              message: [
                ...state.message,
                {
                  message: type !== "bot" ? message : label,
                  from: "me",
                  type: "text",
                  time: moment().format("LLL"),
                },
              ],
            }));
            const response = await http().post(
              "/client/reply/button",
              postData
            );
            console.log(response);
            // if (!response.data?.error) {
            //   // INF_addMessage("out", null, message, "text", new Date());
            // } else {
            //   // INF_notifView(response.message, "warning");
            // }
          } catch (error: any) {
            if (error.response?.data.message) {
              setError(error.response.data.message);
            } else {
              setError("Something wrong");
            }
            set(() => ({ loading: false }));
          }
        },

        async sendFiles(files: any) {
          const { INF_token, setError } = get();
          try {
            const postData = new FormData();
            postData.append("files", files);
            postData.append("token", INF_token);
            const response = await http().post(
              "/client/upload/media",
              postData
            );
            if (!response.data?.isError) {
              const dataFIle = response.data?.data[0];
              const postReplyData = {
                token: INF_token,
                message: {
                  url: dataFIle.url,
                  fileName: dataFIle.fileName,
                  mimeType: dataFIle.mimeType,
                  fileSize: dataFIle.size,
                },
              };
              const responseReplay = await http().post(
                "/client/reply/media",
                postReplyData
              );
              if (!responseReplay.data.error) {
                let message: any;
                if (typeof responseReplay.data.message !== "undefined") {
                  message = general.INF_convertAttachment(
                    responseReplay.data.message
                  );
                }
                set((state) => ({
                  message: [
                    ...state.message,
                    {
                      message: message?.message,
                      from: "me",
                      type: message?.type,
                      time: moment().format("LLL"),
                      mimeType: message?.mimeType,
                      fileName: message?.fileName,
                    },
                  ],
                }));
              }
            }
          } catch (error: any) {
            if (error.response?.data.message) {
              setError(error.response.data.message);
            } else {
              setError("Something wrong");
            }
          }
        },

        async sendLocation(message: string) {
          const { INF_token, setError } = get();
          try {
            const postData = {
              message: message,
              token: INF_token,
            };
            const response = await http().post(
              "/client/reply/location",
              postData
            );
            // masih aneh
            if (!response.data?.error) {
              set((state) => ({
                message: [
                  ...state.message,
                  {
                    message: message,
                    from: "me",
                    type: "location",
                    time: moment().format("LLL"),
                  },
                ],
              }));
              // INF_addMessage("out", null, message, "text", new Date());
            }
            // else {
            //   // INF_notifView(response.message, "warning");
            // }
          } catch (error: any) {
            if (error.response?.data.message) {
              setError(error.response.data.message);
            } else {
              setError("Something wrong");
            }
            set(() => ({ loading: false }));
          }
        },

        async endSession() {
          const { INF_token, setError } = get();
          try {
            const postData = {
              token: INF_token,
            };

            set(() => ({ chatOn: false, status: "Chat live berakhir" }));
            await http().post("/endSession", postData);
            if (process.env.VITE_ACCOUNT_ID) {
              await http().post(
                `https://midlibra.onx.co.id/octopushchat/livechat/end/botpress/onx/${process.env.VITE_TENANT}`,
                {
                  unique_id: INF_token,
                  account_id: process.env.VITE_ACCOUNT_ID,
                }
              );
            }
          } catch (error: any) {
            if (error.response?.data.message) {
              setError(error.response.data.message);
            } else {
              setError("Something wrong");
            }
          }
        },

        async endSessionBot() {
          const { INF_token, setError } = get();
          try {
            set(() => ({ chatOn: false, status: "Chat live berakhir" }));

            if (process.env.VITE_ACCOUNT_ID) {
              await http().post(
                `https://midlibra.onx.co.id/octopushchat/livechat/end/botpress/onx/${process.env.VITE_TENANT}`,
                {
                  unique_id: INF_token,
                  account_id: process.env.VITE_ACCOUNT_ID,
                }
              );
            }
          } catch (error: any) {
            if (error.response?.data.message) {
              setError(error.response.data.message);
            } else {
              setError("Something wrong");
            }
          }
        },

        async sendRating(value: any) {
          const { INF_token } = get();
          try {
            const postData = {
              rating: value,
              token: INF_token,
            };
            const response = await http().post("/client/rating", postData);
            console.log(response);
          } catch (error: any) {
            console.log(error);
          }
        },

        statusChat(value: any, chatOn: boolean) {
          if (chatOn && value) set(() => ({ status: value, chatOn }));
          if (chatOn) set(() => ({ chatOn }));
          if (value) set(() => ({ status: value }));
        },

        reset() {
          set(() => initialState);
        },
      }),
      {
        name: "widget-chat",
      }
    )
  )
);

export default useWidgetChat;
