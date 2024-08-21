import React, {useState} from "react";

// import { ChatContext } from "./ChatContext";
import {toFarsiNumber} from "../../../../shared/toFarsiNumber";

export function getHoursAndMinutesFromDate(d) {
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

export function parseCustomFormat(customString) {
    // Regular expression to match the custom format
    const regex = /<\^>(.*?)<\^>/gs;
    let match;
    const jsonData = [];

    // Loop through matches and extract JSON-like data
    while ((match = regex.exec(customString)) !== null) {
        try {
            const jsonStr = match[1];
            const jsonObj = JSON.parse(jsonStr);
            jsonData.push(jsonObj);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }

    return jsonData;
}

export function parseMessageFromStructuralMessage(customString) {
    // Regular expression to match the custom format
    if (customString) {
        const elements = customString.split('<^>');
        if (elements.length > 1)
            return elements[2];

        return customString
    }
    return '';
}

export const MeChat = ({item, chat, isSelected, onContextMenu, menuWidth, menuHeight, className}) => {

    const [menuPosition, setMenuPosition] = useState({x: '0px', y: '0px'});
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        const rightPosition = rect.left + rect.width + window.scrollX;

        // Calculate half of the screen height
        const halfScreenHeight = window.innerHeight / 2;

        // Check if the bottom position is less than half of the screen height
        const isBottomHalf = bottomPosition < halfScreenHeight;

        console.log('handleRightClick', {x: clientX, y: clientY})
        onContextMenu(
            {
                x: (rightPosition - menuWidth),
                y: isBottomHalf ? (bottomPosition + gap) : (topPosition - gap - menuHeight)
            },
            item
        ); // Pass the position to the parent
    };

    // useEffect(() => {
    //   const handleContextMenu = (e) => {
    //     e.preventDefault();
    //     const position = { x: `${e.pageX}px`, y: `${e.pageY}px` };
    //     setMenuPosition(position);
    //     setIsMenuOpen(true);
    //   };
    //
    //   const handleClick = (e) => {
    //     if (menuRef.current && !menuRef.current.contains(e.target)) {
    //       setIsMenuOpen(false);
    //     }
    //   };
    //
    //   document.addEventListener('contextmenu', handleContextMenu);
    //   document.addEventListener('click', handleClick);
    //
    //   return () => {
    //     document.removeEventListener('contextmenu', handleContextMenu);
    //     document.removeEventListener('click', handleClick);
    //   };
    // }, []);
    //
    // const handleMenuItemClick = (action) => {
    //   // Handle menu item click actions
    //   console.log('Clicked:', action);
    //   setIsMenuOpen(false);
    // };

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

// Example usage
    const customString = `
<^>
{"type":"reply","name":"نوید اباذری","message":"زنگ زدی؟"}
<^>
اینو منظورم بود که گفتم درستش کنی
<^>
`;


    return (
        <div className="chat is-me">
            <div className="chat-content">
                <div className="chat-bubbles">
                    <div className="chat-bubble" key={`message-id-${item.id}`}>
                        {item.text === "deleted" ? (
                            <div className={`chat-msg border bg-white text-muted `}>پیام با موفقیت حذف شد</div>
                        ) : (
                            <React.Fragment>
                                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                                    <div onContextMenu={(e) => {
                                        handleRightClick(e)
                                    }}
                                         className={`chat-msg bg-${chat.chatTheme} ${className} ${isSelected ? 'mechat-selected' : ''}`}>

                                        {/*{action_proper(item.text)}*/}
                                        <ul className="chat-meta">
                                            {message_proper(item.text)}
                                            <li>{item.user ? item.user.userfirstname : ''}</li>
                                            <li>{!item.createdAt ? '-' : toFarsiNumber(getHoursAndMinutesFromDate(new Date(item.createdAt)))}</li>
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                    {/*End chat-bubble*/}
                </div>
                {/*End chat-bubbles*/}

            </div>
        </div>
    );
};
