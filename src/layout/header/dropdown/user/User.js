import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../../../redux/store/services/auth/store";
import { clearProfile } from "../../../../redux/store/services/profile/store/profile-actions";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);


  useEffect(()=>{
  }, [profile])

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
    dispatch(clearToken())
    dispatch(clearProfile())
    navigate(`/login`);
  };

  return (
    <Link to={`${process.env.PUBLIC_URL}/profile`} className="p-0 m-0">
      <UserAvatar icon="user-alt"image={`${process.env.REACT_APP_S3_BUCKET}/${profile.avatar}` || User} className="sm" />
    </Link>
  );
};

export default User;
