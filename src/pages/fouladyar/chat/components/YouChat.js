import {toFarsiNumber} from "../../../../shared/toFarsiNumber";
import React from "react";
import {getHoursAndMinutesFromDate, parseCustomFormat} from "../../chatMessages/components/MeChat";

export const YouChat = ({item, chat, isSelected, onContextMenu, menuWidth, menuHeight, className}) => {

    const handleRightClick = (event) => {
        console.log('menuHeight', menuHeight, isSelected);
        event.preventDefault(); // Prevent the default context menu
        const gap = 10;
        const {clientX, clientY, target} = event;
        // Get the bounding rectangle of the target element
        const rect = target.getBoundingClientRect();

        // Calculate the bottom position relative to the screen
        const bottomPosition = rect.bottom + window.scrollY;
        const topPosition = rect.top + window.scrollY;
        const leftPosition = rect.left;

        // Calculate half of the screen height
        const halfScreenHeight = window.innerHeight / 2;

        // Check if the bottom position is less than half of the screen height
        const isBottomHalf = bottomPosition < halfScreenHeight;

        console.log('handleRightClick',item, {x: clientX, y: clientY})
        onContextMenu(
            {x: (leftPosition), y: isBottomHalf ? (bottomPosition + gap) : (topPosition - gap - menuHeight)},
            item
        ); // Pass the position to the parent
    };


    function message_proper(msg) {
        if (msg.includes('<^>')) {
            const parts = msg.split('<^>');

            return parts[2]
        }
        return msg
    }

    function action_proper(msg) {
        const value = parseCustomFormat(msg);

        if (value.length > 0) {
            return (
                <div className="msg-reply">
                    <div
                        className="msg-reply-name">{value[0]?.type === 'forward' ? `ارسال شده از: ${value[0].name}` : value[0].name}</div>
                    <div className="msg-reply-message">{value[0].message}</div>
                </div>
            )
        }
    }

    return (
        <div className="chat is-you">
            {/*<div className="chat-avatar">*/}
            {/*  {chat.group ? (*/}
            {/*    <UserAvatar image={item.user.image} theme={item.user.theme} text={findUpper(item.user.name)}>*/}
            {/*      {" "}*/}
            {/*      {chat.active === true ? (*/}
            {/*        <span className="status dot dot-lg dot-success"></span>*/}
            {/*      ) : (*/}
            {/*        <span className="status dot dot-lg dot-gray"></span>*/}
            {/*      )}*/}
            {/*    </UserAvatar>*/}
            {/*  ) : (*/}
            {/*    <UserAvatar image={chat.image} theme={chat.theme} text={findUpper(chat.name)}>*/}
            {/*      {" "}*/}
            {/*      {chat.active === true ? (*/}
            {/*        <span className="status dot dot-lg dot-success"></span>*/}
            {/*      ) : (*/}
            {/*        <span className="status dot dot-lg dot-gray"></span>*/}
            {/*      )}*/}
            {/*    </UserAvatar>*/}
            {/*  )}*/}
            {/*</div>*/}
            <div className="chat-content">
                <div className="chat-bubbles">
                    <div className="chat-bubble" key={`message-id-${item.id}`}>
                        <React.Fragment>
                            <div style={{position: 'relative', width: '100%', height: '100%'}}>
                                <div onContextMenu={(e) => {
                                    handleRightClick(e)
                                }}
                                     className={`chat-msg bg-${chat.chatTheme} ${className} ${isSelected ? 'mechat-selected' : ''}`}>
                                    {action_proper(item.text)}
                                    <ul className="chat-meta">
                                        <li>{item.user ? item.user.userfirstname : ""}</li>
                                        <li>{!item.createdAt ? "-" : toFarsiNumber(getHoursAndMinutesFromDate(new Date(item.createdAt)))}</li>
                                        {message_proper(item.text)}
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    );
};
