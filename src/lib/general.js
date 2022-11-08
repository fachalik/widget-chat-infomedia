export default {
  /* GENERAL */
  async INF_notifSound() {
    try {
      let src =
        "https://prod-storage.on5.co.id/public/audio/b237b0381d21dbd0044404b52bf60a67.mp3";
      let audio = new Audio(src);
      await audio.play();
    } catch (error) {
      console.log(error);
    }
  },
  INF_convertAttachment(data) {
    const separator = "&#x2F;";
    const INF_isJson = (str) => {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    };
    //CHECK IF JSON
    if (INF_isJson(data)) {
      data = JSON.parse(data);
    }

    //CHECK IF ARRAY
    if (Array.isArray(data)) {
      data = data[0];
    }

    const mimeTypeObject = data.mimeType.split(separator);
    let mimeType;
    if (mimeTypeObject.length == 1) {
      const separatorV2 = "/";
      const mimeTypeObjectV2 = data.mimeType.split(separatorV2);
      mimeType = mimeTypeObjectV2[0];
    } else {
      mimeType = mimeTypeObject[0];
    }

    // let newData;
    switch (mimeType) {
      case "image":
        return {
          type: "image",
          message: data.url,
        };
      case "audio":
        return {
          type: "audio",
          message: data.url,
          mimeType: `${mimeTypeObject[0]}/${mimeTypeObject[1]}`,
        };
      case "video":
        return {
          type: "video",
          message: data.url,
          mimeType: `${mimeTypeObject[0]}/${mimeTypeObject[1]}`,
        };
      default:
        return {
          type: "link",
          message: data.url,
          fileName: data.fileName,
        };
    }
  },
};
