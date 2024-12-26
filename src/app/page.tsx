'use client';

import InputChat from "@/components/InputChat";
import Layout from "@/components/Layout";
import { setChats, setSelectedGroup, setSelectedTopic } from "@/redux/features/chatsSlice";
import { useAppSelector } from "@/redux/store";
import { withAuth } from "@/utils/withAuth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Home() {
  const user = useAppSelector((state) => state.user.user);
  const {chats, activeTopic, activeGroup} = useAppSelector((state) => state.chats);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!chats) {
      const newChats = {
        "Untitled Group": {
          "Untitled 1": [],
        },
      };
      dispatch(setChats(newChats));
      dispatch(setSelectedGroup(`Untitled Group`));
      dispatch(setSelectedTopic(`Untitled 1`));
      return;
    };

    const newChats = JSON.parse(JSON.stringify(chats));

    if (!newChats["Untitled Group"]) {
      newChats["Untitled Group"] = {
        "Untitled 1": [],
      };
      dispatch(setSelectedGroup(`Untitled Group`));
      dispatch(setSelectedTopic(`Untitled 1`));
    } else {
      const subtitles = Object.keys(newChats["Untitled Group"]);
      const nextIndex = subtitles.length + 1;

      newChats["Untitled Group"][`Untitled ${nextIndex}`] = [];
      dispatch(setSelectedGroup(`Untitled Group`));
      dispatch(setSelectedTopic(`Untitled ${nextIndex}`));
    }

    // Dispatch the updated chats object
    dispatch(setChats(newChats));
  }, []);

  const chatActive = activeGroup && activeTopic && chats ? chats[activeGroup] && chats[activeGroup][activeTopic]?.length > 0? true :false :false;

  return (
    <div>
      <Layout>
        <div className={chatActive? "chat-window" : "min-h-screen flex items-center justify-center flex-col w-full"}>
          {!chatActive ?<h1 className="text-xl mb-5 font-bold">Welcome {user?.email}</h1>: 
            <div className="flex flex-col gap-5">
              {chats && chats[activeGroup][activeTopic].map((chat, index) => (
                <div style={{display: "contents"}} key={index}>
                  <div className={`${chat.user_type === "user" ? "text-right" : "text-left"}`}>
                    {chat.text}
                  </div>
                </div>
              ))}
              {loading && <div style={{display: "contents"}}>
                  <div className="text-left">
                    Loading...
                  </div>
                </div>}
            </div>}
          {activeGroup && activeTopic && chats ? chats[activeGroup] && chats[activeGroup][activeTopic]? <div className={`${chatActive? "chat-input active": 'chat-input'}`}><InputChat loading={loading} setLoading={setLoading}/></div> :null : null}
        </div>
      </Layout>
    </div>
  );
}

export default withAuth(Home);
