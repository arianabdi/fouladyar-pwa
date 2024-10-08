import React, {useEffect} from "react";
import menu from "./MenuData";
import {NavLink, useNavigate} from "react-router-dom";
import classNames from "classnames";
import {clearToken} from "../../redux/store/services/auth/store";
import {useDispatch, useSelector} from "react-redux";
import {clearProfile} from "../../redux/store/services/profile/store/profile-actions";
import {clearSocket} from "../../redux/store/services/socket/store/socket-actions";

const MenuHeading = ({heading}) => {
    return (
        <li className="nk-menu-heading">
            <h6 className="overline-title text-primary-alt">{heading}</h6>
        </li>
    );
};

const MenuItem = ({
      icon,
      link,
      text,
      isDivider,
      authGuard,
      sub,
      newTab,
      mobileView,
      sidebarToggle,
      badge,
    onClick,
      ...props
  }) => {
    let currentUrl;

    const auth = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toggleActionSidebar = (e) => {
        if (!sub && !newTab && mobileView) {
            sidebarToggle(e);
        }
    };

    if (window.location.pathname !== undefined) {
        currentUrl = window.location.pathname;
    } else {
        currentUrl = null;
    }
    const handleSignOut = () => {
        console.log('ssssssssssssssss', auth.token);
        localStorage.removeItem("accessToken");
        dispatch(clearToken())
        dispatch(clearProfile())
        dispatch(clearSocket())
        navigate(`/login`);
    };
    const menuHeight = (el) => {
        var totalHeight = [];
        for (var i = 0; i < el.length; i++) {
            var margin =
                parseInt(window.getComputedStyle(el[i]).marginTop.slice(0, -2)) +
                parseInt(window.getComputedStyle(el[i]).marginBottom.slice(0, -2));
            var padding =
                parseInt(window.getComputedStyle(el[i]).paddingTop.slice(0, -2)) +
                parseInt(window.getComputedStyle(el[i]).paddingBottom.slice(0, -2));
            var height = el[i].clientHeight + margin + padding;
            totalHeight.push(height);
        }

        totalHeight = totalHeight.reduce((sum, value) => (sum += value));
        return totalHeight;
    };

    const makeParentActive = (el, childHeight) => {
        let element = el.parentElement.parentElement.parentElement;
        let wrap = el.parentElement.parentElement;
        if (element.classList[0] === "nk-menu-item") {
            element.classList.add("active");
            const subMenuHeight = menuHeight(el.parentNode.children);
            wrap.style.height = subMenuHeight + childHeight - 50 + "px";
            makeParentActive(element);
        }
    };

    useEffect(() => {
        var element = document.getElementsByClassName("nk-menu-item active current-page");
        var arrayElement = [...element];

        arrayElement.forEach((dom) => {
            if (dom.parentElement.parentElement.parentElement.classList[0] === "nk-menu-item") {
                dom.parentElement.parentElement.parentElement.classList.add("active");
                const subMenuHeight = menuHeight(dom.parentNode.children);
                dom.parentElement.parentElement.style.height = subMenuHeight + "px";
                makeParentActive(dom.parentElement.parentElement.parentElement, subMenuHeight);
            }
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const menuToggle = (e) => {
        e.preventDefault();
        var self = e.target.closest(".nk-menu-toggle");
        var parent = self.parentElement;
        var subMenu = self.nextSibling;
        var subMenuItem = subMenu.childNodes;
        var parentSiblings = parent.parentElement.childNodes;
        var parentMenu = parent.closest(".nk-menu-wrap");
        //For Sub Menu Height
        var subMenuHeight = menuHeight(subMenuItem);

        // Get parent elements
        const getParents = (el) => {
            let parentSelector = document.querySelector(".nk-menu-md");
            if (parentSelector === undefined) {
                parentSelector = document;
            }
            var parents = [];
            var p = el.parentNode;
            while (p !== parentSelector) {
                var o = p;
                parents.push(o);
                p = o.parentNode;
            }
            parents.push(parentSelector);
            return parents;
        };

        var parentMenus = getParents(self);
        if (!parent.classList.contains("active")) {
            // For Parent Siblings
            for (var j = 0; j < parentSiblings.length; j++) {
                parentSiblings[j].classList.remove("active");
                if (typeof parentSiblings[j].childNodes[1] !== "undefined") {
                    parentSiblings[j].childNodes[1].style.height = 0;
                }
            }
            if (parentMenu !== null) {
                if (!parentMenu.classList.contains("sub-opened")) {
                    parentMenu.classList.add("sub-opened");

                    for (var l = 0; l < parentMenus.length; l++) {
                        if (typeof parentMenus !== "undefined") {
                            if (parentMenus[l].classList.contains("nk-menu-wrap")) {
                                parentMenus[l].style.height = subMenuHeight + parentMenus[l].clientHeight + "px";
                            }
                        }
                    }
                }
            }
            // For Current Element
            parent.classList.add("active");
            subMenu.style.height = subMenuHeight + "px";
        } else {
            parent.classList.remove("active");
            if (parentMenu !== null) {
                parentMenu.classList.remove("sub-opened");
                for (var k = 0; k < parentMenus.length; k++) {
                    if (typeof parentMenus !== "undefined") {
                        if (parentMenus[k].classList.contains("nk-menu-wrap")) {
                            parentMenus[k].style.height = parentMenus[k].clientHeight - subMenuHeight + "px";
                        }
                    }
                }
            }
            subMenu.style.height = 0;
        }
    };

    const menuItemClass = classNames({
        "nk-menu-item": true,
        "has-sub": sub,
        "active current-page": currentUrl === process.env.PUBLIC_URL + link
    });
    return (
        <>
            {
                !authGuard || (authGuard && auth.token) ?
                    <li className={menuItemClass} onClick={(e) => {
                        toggleActionSidebar(e)
                        onClick()
                    }}>

                        {
                            authGuard && auth.token ?
                                <div
                                    style={{padding: "0.325rem 0rem", display: "flex", textAlign: 'right'}}
                                    className={`btn nk-menu-link${sub ? " nk-menu-toggle" : ""}`}
                                    onClick={handleSignOut}
                                >
                                    {
                                        isDivider ? <div className="divider list-menu-font-divider"></div> :
                                            <>
                                                <div className="pe-1">{icon ? icon : null}</div>
                                                <span className="nk-menu-text menu-item-text">{text}</span>
                                                {badge && <span className="nk-menu-badge">{badge}</span>}
                                            </>
                                    }
                                </div> :
                                <NavLink
                                    to={`${process.env.PUBLIC_URL + link}`}
                                    className={`nk-menu-link${sub ? " nk-menu-toggle" : ""}`}
                                    onClick={sub ? menuToggle : null}
                                >
                                    {
                                        isDivider ? <div className="divider list-menu-font-divider"></div> :
                                            <>
                                                <div className="pe-1">{icon ? icon : null}</div>
                                                <span className="nk-menu-text menu-item-text">{text}</span>
                                                {badge && <span className="nk-menu-badge">{badge}</span>}
                                            </>
                                    }
                                </NavLink>
                        }

                        {sub ? (
                            <div className="nk-menu-wrap">
                                <MenuSub sub={sub} sidebarToggle={sidebarToggle} mobileView={mobileView}/>
                            </div>
                        ) : null}
                    </li> :
                    ''
            }
        </>


    );
};

const MenuSub = ({icon, link, text, sub, sidebarToggle, mobileView, ...props}) => {
    return (
        <ul className="nk-menu-sub" style={props.style}>
            {sub.map((item) => (
                <MenuItem
                    link={item.link}
                    icon={item.icon}
                    text={item.text}
                    sub={item.subMenu}
                    authGuard={item.authGuard}
                    isDivider={item.isDivider}
                    key={item.text}
                    badge={item.badge}
                    newTab={item.newTab}
                    sidebarToggle={sidebarToggle}
                    mobileView={mobileView}
                />
            ))}
        </ul>
    );
};

const Menu = ({sidebarToggle, mobileView, onClick}) => {


    return (
        <ul className="nk-menu nk-menu-md">
            {menu.map((item) =>
                item.heading ? (
                    <MenuHeading heading={item.heading} key={item.heading}/>
                ) : (
                    item.text !== "Applications" && (
                        <MenuItem
                            key={item.text}
                            link={item.link}
                            icon={item.icon}
                            text={item.text}
                            authGuard={item.authGuard}
                            isDivider={item.isDivider}
                            badge={item.badge}
                            sub={item.subMenu}
                            sidebarToggle={sidebarToggle}
                            mobileView={mobileView}
                            onClick={onClick}
                        />
                    )
                )
            )}

        </ul>
    );
};


export default Menu;
