import React, { useEffect, useState } from "react";
import { Field } from "../../../../../components/fouladyar/field/field";
import { validateToken } from "../../../../auth";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorToaster } from "../../../../../shared/toaster";
import { setUser } from "../../../../../redux/store/services/user/store"; // Import the CSS file where you'll define your styles



export function DepartmentSelector  ({  OnCreateChat })  {


  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const [departments, setDepartments] = useState([
    {value: 10, label: '10'},
    {value: 25, label: "25"}
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [users, setUsers] = useState([]);

  async function onCreateChat(userid) {
    OnCreateChat({userId: userid, myId: profile.userId})

  }

  useEffect(() => {

    async function loadDeparments() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/group`, {
          headers: { "authorization": `bearer ${auth.token}` }
        });

        console.log('loadDeparments', res);
        if (res.status === 200 ) {
          console.log("departments is loaded", res.data);
          setDepartments(prevState => {
            return res.data.map(item => {
              // console.log({value: item.id, label: `${item.name}`})
              return {value: item.id, label: item.name.toString()}
            })
          })
        }
      }catch (e) {
        ErrorToaster(e)
      }

    }

    loadDeparments()
  }, [])


  useEffect(() => {

    async function loadUsers() {
      try {
        if(selectedDepartment){
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/group/users/${selectedDepartment}`, {
            headers: { "authorization": `bearer ${auth.token}` }
          });

          console.log('loadUsers', res);
          if (res.status === 200 ) {
            console.log("users is loaded", res.data.users);
            setUsers(res.data.users)
          }
        }
      }catch (e) {
        ErrorToaster(e)
      }

    }

    loadUsers()
  }, [selectedDepartment])
  function Divider(){
    return(
      <div className={'divider'}></div>
    )
  }
  return (
    <div className="department-selector">
      <h6 className="title">انتخاب همکار</h6>
      <Divider/>
      <span className="title">لطفا دپارتمان مورد نظر خود را انتخاب کنید</span>
      <div className="select-box">

        <Field
          // defaultValue={TotalItemPerPageOptions.filter(item => item.value === totalItemPerPage)[0]}
          name="department-selector"
          id="department-selector"
          // value={TotalItemPerPageOptions.filter(item => item.value === totalItemPerPage)[0]}
          options={departments}
          onChange={(e) => {
            console.log('deparment changed', e)
            setSelectedDepartment(e)
          }}
          type="select"
        />
      </div>
      <div className="department-list">
        {
          users?.length > 0 ?
            <span className="title">لطفا همکار مورد نظر خود را از دپارتمان انتخاب شده برگزینید</span> :
            <></>
        }
        {users.map(item => (
          <div key={item.userid} className={`department-item ${item.userid === profile.userId ? 'department-item-disable' : ''}`}>
            <span className={`operator-name ${item.userid === profile.userId ? 'operator-name-disable' : ''}`}>{item.fullname}</span>
            <div className="d-flex flex-row">
              <span className="this-is-mine">{item.userid === profile.userId ? "حساب من": ""}</span>
              <button className={`plus-button ${item.userid === profile.userId ? 'plus-button-disable' :''}`} onClick={async () => {
                if(item.userid !== profile.userId)
                  await onCreateChat(item.userid);
              }}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


