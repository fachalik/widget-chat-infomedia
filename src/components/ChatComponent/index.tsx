import "./index.scss";

import { css } from "@emotion/css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { Box, Collapse, Fab, Input, Stack, Tooltip, Zoom } from "@mui/material";
import EmojiPicker, {
  Emoji,
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import React, { FC } from "react";

import useWidgetChat from "../../store/widget-chat";

const ChatComponent = () => {
  const { sendMessage, sendLocation, sendFiles } = useWidgetChat(
    (state) => state
  );
  const [value, setValue] = React.useState<string>("");
  const [attachement, setAttachment] = React.useState<boolean>(false);
  const [emojiPicker, setEmojiPicker] = React.useState<boolean>(false);
  const inputPhoto = React.useRef<any>(null);
  const inputFile = React.useRef<any>(null);

  const handleSendChat = async (e: string) => {
    if (!e) return;
    await sendMessage(e, "text", "success");
    await setValue("");
  };

  const handleOnEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setValue(value + emojiData.emoji);
  };

  const onFilechange = async (e: any) => {
    /*Selected files data can be collected here.*/
    await sendFiles(e.target.files[0]);
    setAttachment(false);
  };
  const getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        const result = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        await sendLocation(result);
      },
      (err) => console.log(err)
    );
    setAttachment(!attachement);
  };

  const onEnterPress = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSendChat(e.target.value);
    }
  };

  interface IAttachment {
    onClickLocation: () => void;
    onClickEmoji: () => void;
    onClickFile: () => void;
    onClickAttackment: () => void;
    open: boolean;
  }

  const Attachment: FC<IAttachment> = ({
    onClickAttackment,
    onClickEmoji,
    onClickFile,
    onClickLocation,
    open,
  }) => {
    // const [open, setOpen] = React.useState(false);
    const data: any = [
      {
        name: "Location",
        icon: <LocationOnIcon />,
        bg: "float_green_btn",
        onClick: () => onClickLocation(),
      },
      {
        name: "Ematicon",
        icon: <InsertEmoticonIcon />,
        bg: "float_yellow_btn",
        onClick: () => onClickEmoji(),
      },
      {
        name: "Document",
        icon: <DescriptionIcon />,
        bg: "float_green_btn",
        onClick: () => onClickFile(),
      },
    ];

    return (
      <div role="presentation" className="attachment-presentation">
        <Collapse in={open}>
          <Box marginBottom={3}>
            {data.map((val: any, key: number) => (
              <Box marginRight={1} marginBottom={1} key={key}>
                <Tooltip title={val.name} onClick={val.onClick}>
                  <Fab size="small" className={`float_btn ${val.bg}`}>
                    {val.icon}
                  </Fab>
                </Tooltip>
              </Box>
            ))}
          </Box>
        </Collapse>
        <Tooltip title="Attachment">
          <Box>
            {/* <Fab
              size="small"
              className="float_attach"
              onClick={() => {
                onClickAttackment();
              }}
            > */}
            <div
              onClick={() => onClickAttackment()}
              className={css`
                height: 100%;
                text-decoration: none;
                border: none;
                background-color: white;
                cursor: pointer;
                color: red;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 90px;
                width: 30px;
                transition: 0.3s;
                &:hover {
                  color: grey;
                }
              `}
            >
              <AttachFileIcon />
            </div>
          </Box>
        </Tooltip>
      </div>
    );
  };

  return (
    <>
      <Box sx={{ height: "10%", backgroundColor: "white", zIndex: 10 }}>
        <div className="wgChat-emojipicker">
          <Collapse in={emojiPicker}>
            <EmojiPicker
              width={"100%"}
              height={"300px"}
              onEmojiClick={handleOnEmojiClick}
              autoFocusSearch={false}
              theme={Theme.AUTO}
            />
          </Collapse>
        </div>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          spacing={2}
          alignItems={"center"}
          sx={{ paddingX: "20px", paddingY: "3px", height: "100%" }}
        >
          <div className="wgChat-messageinput">
            <input
              type="file"
              name="photo"
              id="upload-photo"
              onChange={onFilechange}
              accept="image/*"
              ref={inputPhoto}
            />
            <input
              type="file"
              name="file"
              id="upload-file"
              onChange={onFilechange}
              ref={inputFile}
            />
          </div>
          <div className="attach-sendchat">
            <Attachment
              open={attachement}
              onClickAttackment={() => setAttachment(!attachement)}
              onClickLocation={() => getLocation()}
              onClickFile={() => inputFile.current.click()}
              onClickEmoji={() => {
                setAttachment(!attachement);
                setEmojiPicker(!emojiPicker);
              }}
            />
          </div>
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              handleSendChat(e.target);
            }}
            style={{
              display: "flex",
              width: "90%",
              height: "80%",
              justifyContent: "space-between",
            }}
          >
            <Input
              multiline
              placeholder="Ketik disini..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              maxRows={5}
              sx={{ width: "90%" }}
              onKeyDown={onEnterPress}
            />
            {/* <Fab size="small"> */}
            <button
              type="submit"
              onClick={() => handleSendChat(value)}
              className={css`
                height: 100%;
                text-decoration: none;
                border: none;
                background-color: transparent;
                cursor: pointer;
                color: red;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 90px;
                // width: 30px;
                transition: 0.3s;
                &:hover {
                  color: grey;
                }
              `}
            >
              <Tooltip title="Kirim">
                <SendIcon fontSize="small" />
              </Tooltip>
            </button>
            {/* </Fab> */}
          </form>

          {/* <Tooltip title="Attach file">
          <div
            className={css`
              cursor: pointer;
              color: red;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 90px;
              width: 30px;
              height: 30px;
              transition: 0.3s;
              &:hover {
                color: grey;
              }
            `}
          >
            <AttachFileIcon fontSize="small" />
          </div>
        </Tooltip> */}
        </Stack>
      </Box>
    </>
  );
};

export default ChatComponent;
