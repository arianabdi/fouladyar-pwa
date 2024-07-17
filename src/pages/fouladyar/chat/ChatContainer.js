import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { ChatContextProvider } from "./ChatContext";

function ChatContainer (){
  return (
    <>
      <Chat />
    </>
  );
};
export default ChatContainer;
