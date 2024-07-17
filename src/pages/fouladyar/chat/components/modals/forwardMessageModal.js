import React, { useEffect, useState } from "react";
import { Field } from "../../../../../components/fouladyar/field/field";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorToaster } from "../../../../../shared/toaster";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlinePersonOff } from "react-icons/md"; // Import the CSS file where you'll define your styles


export function ForwardMessageModal  ({  onSendMessageUsingForward, onSendMessageUsingForwardCustomer })  {


  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const [departments, setDepartments] = useState([
    {value: 10, label: '10'},
    {value: 25, label: "25"}
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedChatId, setSelectedChatId] = useState()
  const [selectedCustomerChatId, setSelectedCustomerChatId] = useState()
  const [selectedUserId, setSelectedUserId] = useState()
  const [searchCustomerName, setSearchCustomerName] = useState()
  const [customers, setCustomers] = useState([]);
  const [partners, setPartners] = useState([]);

  async function onSubmitForwardMessage(){
    onSendMessageUsingForward(selectedChatId)
  }
  async function onSubmitForwardMessageCustomer(){
    onSendMessageUsingForwardCustomer(selectedCustomerChatId)
  }

  async function onSelectPartnerForForwardingMessage(item) {

    const userId = item.userid;

    try {
      // http://185.10.72.167:5055/conversation?order=DESC&page=1&take=5
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/conversation/suppConverstations`, {
        "user2Id": userId
      }, {
        headers: { authorization: `bearer ${auth.token}` }
      });


      if (res.status === 201) {
        setSelectedUserId(userId);
        setSelectedChatId(res.data.id)

      }


    }catch (e) {
      ErrorToaster(e);
    }

    // onSendMessageUsingForward({userId: userid, myId: profile.userId})

  }


  async function onSelectCustomerForForwardingMessage(item) {
    setSelectedCustomerChatId(item.value)
  }

  useEffect(() => {

    async function loadDeparments() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/group`, {
          headers: { "authorization": `bearer ${auth.token}` }
        });

        if (res.status === 200 ) {
          setDepartments(prevState => {
            return res.data.map(item => {
              return {value: item.id, label: item.name.toString()}
            })
          })
        }
      }catch (e) {
        ErrorToaster(e)
      }

    }
    async function loadCustomers() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/conversation/users`, {
          headers: { "authorization": `bearer ${auth.token}` }
        });

        if (res.status === 200 ) {
          setCustomers(prevState => {
            return res.data.items.map(item => {
              return {value: item.id, label: item.fullname, userid: item.userid}
            })
          })
        }
      }catch (e) {
        ErrorToaster(e)
      }

    }

    loadDeparments()
    loadCustomers()
  }, [])


  useEffect(() => {

    async function loadUsers() {
      try {
        if(selectedDepartment){
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/group/users/${selectedDepartment}`, {
            headers: { "authorization": `bearer ${auth.token}` }
          });

          if (res.status === 200 ) {
            setPartners(res.data.users)
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


  function EmptyState({icon, title, content}){

    return(
      <div>
        <div className={`forward-message-no-component`}>
          {/*<Icon className={`${classes.icon} ${classes.gray}`} name={icon} />*/}
          <div className={'modal-empty-state-icon'}>
            {icon || ''}
          </div>
          <div className={'modal-empty-state-title'}>{title}</div>
          <p className={'modal-empty-state-content'}>
            {content}
          </p>
        </div>
      </div>
    )
  }



  const [activeTab, setActiveTab] = useState('tab1');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="department-selector">

      <h6 className="forward-message-modal-title">انتخاب چت</h6>
      <Divider/>
      <div className="tab-buttons forward-message-tab-buttons">
        <div className="tab-buttons-container">
          <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>مشتریان</button>
          <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>همکاران</button>
        </div>
      </div>



      <div className="tab-content forward-message-tab-buttons">
        {activeTab === 'tab1' &&
          <div>
            <h5 className="modal-sub-title">مشتریان</h5>
            <span className="modal-sub-contnet">لطفا نام مشتری مورد نظر خود را تایپ کنید.</span>
            <div className="select-box">

              <Field
                className={'customer-name-text-input'}
                name="customer-name"
                id="customer-name"
                placeholder={"نام مشتری مورد نظر را وارد کنید"}
                onChange={(e) => {
                  setSearchCustomerName(e);
                }}
                type="text"
              />
            </div>
            <div className={`department-list  ${ customers.length === 0 ?'empty-department-list' : ''}`}>
              {
                customers?.length > 0 ?
                  <span className="modal-sub-contnet">در زیر لیست مشتریان ای که با پشتیبانی فولادیار چت دارند را مشاهده میکنید. لذا اگر کاربری عضو مشتریان فولادیار است و قبلا چت ای با پشتیبانی نداشته است را نمیتوانید جستجو کنید. </span> :
                  <></>
              }

              {

                customers.length > 0 ? (
                  !searchCustomerName ?
                    customers.map(item => {

                      return(

                        <div key={item.userid} className={`department-item ${item.value === selectedCustomerChatId ? 'selected-department-item' : ''}  ${item.userid === profile.userId ? 'department-item-disable' : ''}`} onClick={async ()=>{
                          if(item.userid !== profile.userId)
                            await onSelectCustomerForForwardingMessage(item);
                        }}>
                          <span className={`operator-name`}>{item.label}</span>
                          <div className="d-flex flex-row">
                            {
                              item.value === selectedCustomerChatId ?
                                <div>
                                  <IoMdCheckmark  size={20} color={"#175b15"} />
                                </div> : <></>
                            }
                          </div>
                        </div>

                      )
                    }) :
                    customers.filter(item => item.label.includes(searchCustomerName))?.map(item => {

                      return(

                        <div key={item.userid} className={`department-item ${item.value === selectedCustomerChatId ? 'selected-department-item' : ''}  ${item.userid === profile.userId ? 'department-item-disable' : ''}`} onClick={async ()=>{
                          if(item.userid !== profile.userId)
                            await onSelectCustomerForForwardingMessage(item);
                        }}>
                          <span className={`operator-name`}>{item.label}</span>
                          <div className="d-flex flex-row">
                            {
                              item.value === selectedCustomerChatId ?
                                <div>
                                  <IoMdCheckmark  size={20} color={"#175b15"} />
                                </div> : <></>
                            }
                          </div>
                        </div>

                      )
                    })
                  ) :
                  <EmptyState
                    title={"مشتری یافت نشد"}
                    content={"لطفا از ورودی بالا اقدام به وارد کردن یک اسم از مشتریان خود کنید تا نتایج نمایان شود"}
                    icon={<MdOutlinePersonOff  size={60} color={"#ACC4E5"} />}
                  />
              }


            </div>
            <div  className='forward-messages-modal-submit-container'>
              <button className={`btn btn-primary w-100 submit-forward-message ${!selectedCustomerChatId ? 'disabled' : ''}`} onClick={async () => {
                if(selectedCustomerChatId)
                  await onSubmitForwardMessageCustomer();
              }}>
                ارسال پیام
              </button>
            </div>


            {/*<ChatAsideBody*/}
            {/*  onInputChange={onInputChange}*/}
            {/*  // chatData={chatData}*/}
            {/*  filteredChatList={filteredChatList}*/}
            {/*  favState={favState}*/}
            {/*  favFilter={favFilter}*/}
            {/*  setFavFilter={setFavFilter}*/}
            {/*  setFavState={setFavState}*/}
            {/*  selectedId={selectedId}*/}
            {/*  setSelectedId={selectedId}*/}
            {/*  favInputSearchChange={favInputSearchChange}*/}
            {/*  favFilterText={favFilterText}*/}
            {/*  filterTab={filterTab}*/}
            {/*  group={profile?.group}*/}
            {/*  conversations={customerConversations}*/}
            {/*  chatItemClick={chatItemClick}*/}
            {/*/>*/}
        </div>
        }
        {activeTab === 'tab2' &&
          <div>
            <h5 className="modal-sub-title">همکاران</h5>
            <span className="modal-sub-contnet">لطفا دپارتمان مورد نظر خود را انتخاب کنید</span>
            <div className="select-box">

              <Field
                // defaultValue={TotalItemPerPageOptions.filter(item => item.value === totalItemPerPage)[0]}
                name="department-selector"
                id="department-selector"
                // value={TotalItemPerPageOptions.filter(item => item.value === totalItemPerPage)[0]}
                options={departments}
                placeholder={"دپارتمان مورد نظر را انتخاب کنید"}
                onChange={(e) => {
                  setSelectedChatId(undefined)
                  setSelectedUserId(undefined)
                  setSelectedDepartment(e)
                }}
                type="select"
              />
            </div>
            <div className={`department-list ${ partners.length === 0 ?'empty-department-list' : ''}`}>
              {
                partners?.length > 0 ?
                  <span className="modal-sub-contnet">در لیست زیر اعضای دپارتمانی که در بالا انتخاب کرده اید را مشاهده میکنید، شما قادر خواهید بود با انتخاب یکی از این افراد اقدام به ارسال پیام کنید. </span> :
                  <></>
              }

              {
                partners.length > 0 ? partners.map(item => (
                  <div key={item.userid} className={`department-item ${item.userid === selectedUserId ? 'selected-department-item' : ''}  ${item.userid === profile.userId ? 'department-item-disable' : ''}`} onClick={async ()=>{
                    if(item.userid !== profile.userId)
                      await onSelectPartnerForForwardingMessage(item);
                  }}>
                    <span className={`operator-name ${item.userid === profile.userId ? 'operator-name-disable' : ''}`}>{item.fullname}</span>
                    <div className="d-flex flex-row">
                      <span className={`this-is-mine ${item.userid === profile.userId ? 'operator-name-disable' : ''}`}>{item.userid === profile.userId ? "حساب من": ""}</span>
                      {
                        item.userid === selectedUserId ?
                          <div>
                            <IoMdCheckmark  size={20} color={"#175b15"} />
                          </div> : <></>
                      }
                    </div>
                  </div>
                )) :
                  <EmptyState
                    title={"همکار یافت نشد"}
                    content={"لطفا از ورودی بالا اقدام به انتخاب یک دپارتمان مورد نظر خود کنید تا لیست همکاران آن دپارتمان به شما نمایش داده شود"}
                    icon={<MdOutlinePersonOff  size={60} color={"#ACC4E5"} />}
                  />
              }


            </div>
            <div className='forward-messages-modal-submit-container'>
              <button className={`btn btn-primary w-100 submit-forward-message ${!selectedChatId ? 'disabled' : ''}`} onClick={async () => {
                if(selectedChatId)
                  await onSubmitForwardMessage();
              }}>
                ارسال پیام
              </button>
            </div>
            {/*<FloatingButton onClick={onOperatorSearchPress}/>*/}
            {/*<ChatAsideBody*/}
            {/*  onInputChange={onInputChange}*/}
            {/*  // chatData={chatData}*/}
            {/*  filteredChatList={filteredChatList}*/}
            {/*  favState={favState}*/}
            {/*  favFilter={favFilter}*/}
            {/*  setFavFilter={setFavFilter}*/}
            {/*  setFavState={setFavState}*/}
            {/*  selectedId={selectedId}*/}
            {/*  setSelectedId={selectedId}*/}
            {/*  favInputSearchChange={favInputSearchChange}*/}
            {/*  favFilterText={favFilterText}*/}
            {/*  filterTab={filterTab}*/}
            {/*  group={profile?.group}*/}
            {/*  conversations={supportConversations.filter(item => {*/}
            {/*    if(item.lastMessage && item.lastMessageAt){*/}
            {/*      return item*/}
            {/*    }*/}
            {/*  })}*/}
            {/*  chatItemClick={suppChatItemClick}*/}
            {/*/>*/}
        </div>}
      </div>




    </div>
  );
}


