import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  Row
} from "../../../components/Component";
import {
  Badge,
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  UncontrolledDropdown
} from "reactstrap";

import SimpleBar from "simplebar-react";
import { useForm } from "react-hook-form";
import ProductH from "../../../images/product/h.png";
import Dropzone from "react-dropzone";
import ModalHelper from "../modal-helper/modalHelper";
import CopyToClipboard from "react-copy-to-clipboard";
import exportFromJSON from "export-from-json";
import tab from "bootstrap/js/src/tab";
import { ConvertGregorianToJalali } from "../../../shared/convertGregorianToJalali";
import { useTranslation } from "react-i18next";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import Filter from "../filter/filter";
import { useNavigate } from "react-router-dom";
import { YesOrNoModal } from "../modal-helper/pages/yesOrNo";


const Export = ({ data }) => {
  const [modal, setModal] = useState(false);


  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const copyToClipboard = () => {
    setModal(true);
  };

  const print = () => {
    // setModal(true);
    console.log('print!')
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-buttons btn-group flex-wrap">
          <button className="btn btn-secondary buttons-copy buttons-html5" type="button" onClick={() => copyToClipboard()}>
            <CopyToClipboard text={JSON.stringify(data)}>
              <span>Copy</span>
            </CopyToClipboard>
          </button>
          <button className="btn btn-secondary buttons-csv buttons-html5" type="button" onClick={() => exportCSV()}>
            <span>CSV</span>
          </button>
          <button className="btn btn-secondary buttons-excel buttons-html5" type="button" onClick={() => exportExcel()}>
            <span>Excel</span>
          </button>
          <button className="btn btn-secondary buttons-print buttons-html5" type="button" onClick={() => print()}>
            <span>Print</span>
          </button>
        </div>
      </div>
      <Modal isOpen={modal} className="modal-dialog-centered text-center" size="sm">
        <ModalBody className="text-center m-2">
          <h5>Copied to clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">Copied {data.length} rows to clipboard</div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const Pagination = ({itemPerPage, currentPage, totalItems, setRowsPerPage, paginate }) => {

  return (
    <Row className={`justify-between g-2 with-export`}>
      <Col className="col-7 text-start" sm="4">
        <div className="card-inner">
          <PaginationComponent
            itemPerPage={itemPerPage}
            totalItems={totalItems}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </Col>
      <Col className="col-5 text-end" sm="8">
        <div className="card-inner d-flex align-center justify-end">
          <div className="dataTables_info" id="DataTables_Table_2_info" role="status" aria-live="polite">
            {itemPerPage * (currentPage - 1) + 1} - {(totalItems > itemPerPage * currentPage) ? itemPerPage * currentPage : totalItems} از {totalItems}
          </div>
          {/*<span className="d-none d-sm-inline-block">Show</span>*/}
          <div className="form-control-select">
            {" "}
            <select
              name="DataTables_Table_0_length"
              className="custom-select custom-select-sm form-control form-control-sm"
              onChange={(e) => {
                setRowsPerPage(e.target.value);
              }}
              value={itemPerPage}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
          </div>
        </div>
      </Col>
    </Row>
  );
};

const Table = ({ tableHeading, tableStructure, filterStructure, tableData, pagination, filter, onItemPerPageChange, onCurrentPageChange, onFilterSubmit }) => {
  const { t, i18n } = useTranslation();
  // const [data, setData] = useState([]);
  const [smOption, setSmOption] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(<div>empty</div>);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    img: null,
    sku: "",
    price: 0,
    salePrice: 0,
    stock: 0,
    category: [],
    fav: false,
    check: false
  });
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false
  });
  const [onSearchText, setSearchText] = useState("");
  const [totalItems, setTotalItems] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const [files, setFiles] = useState([]);

  //modal
  const [yesOrNoModalIsOpen, setYesOrNoModalIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    modalCancelText: '',
    modalSubmitText: '',
    modalTitle: '',
    modalContent: ''
  });

  //scroll off when sidebar shows
  useEffect(() => {
    view.add ? document.body.classList.add("toggle-shown") : document.body.classList.remove("toggle-shown");
  }, [view.add]);

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = tableData.filter((item) => {
        return item.sku.toLowerCase().includes(onSearchText.toLowerCase());
      });
      // setData([...filteredObject]);
    } else {
      // setData([...tableData]);
    }
  }, [onSearchText]);

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      img: null,
      sku: "",
      price: 0,
      salePrice: 0,
      stock: 0,
      category: [],
      favorite: false,
      check: false
    });
    reset({});
  };

  const onFormSubmit = (form) => {
    const { title, price, salePrice, sku, stock } = form;

    let submittedData = {
      id: tableData.length + 1,
      name: title,
      img: files.length > 0 ? files[0].preview : ProductH,
      sku: sku,
      price: price,
      salePrice: salePrice,
      stock: stock,
      category: formData.category,
      fav: false,
      check: false
    };
    // setData([submittedData, ...data]);
    setView({ open: false });
    setFiles([]);
    resetForm();
  };

  const onEditSubmit = () => {
    let submittedData;
    let newItems = data;
    let index = newItems.findIndex((item) => item.id === editId);

    newItems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: editId,
          name: formData.name,
          img: files.length > 0 ? files[0].preview : item.img,
          sku: formData.sku,
          price: formData.price,
          salePrice: formData.salePrice,
          stock: formData.stock,
          category: formData.category,
          fav: false,
          check: false
        };
      }
    });
    newItems[index] = submittedData;
    //setData(newItems);
    resetForm();
    setView({ edit: false, add: false });
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    tableData.forEach((item) => {
      if (item.id === id) {
        setFormData({
          name: item.name,
          img: item.img,
          sku: item.sku,
          price: item.price,
          salePrice: item.salePrice,
          stock: item.stock,
          category: item.category,
          favorite: false,
          check: false
        });
      }
    });
    setEditedId(id);
    setFiles([]);
    setView({ add: false, edit: true });
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  // selects all the products
  const selectorCheck = (e) => {
    let newData;
    newData = tableData.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    // setData([...newData]);
  };

  // selects one product
  const onSelectChange = (e, id) => {
    let newData = tableData;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    // setData([...newData]);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to delete a product
  const deleteProduct = (id) => {
    let defaultData = tab;
    defaultData = defaultData.filter((item) => item.id !== id);
    // setData([...defaultData]);
  };

  // function to delete the seletected item
  const selectorDeleteProduct = () => {
    let newData;
    newData = tableData.filter((item) => item.check !== true);
    // setData([...newData]);
  };

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false
    });
  };

  // handles ondrop function of dropzone
  const handleDropChange = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  function onFilterPress() {
    setModalComponent(
      <Filter
        filterStructure={filterStructure}
        filter={filter}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(e) => {
          onFilterSubmit(e);
          setIsModalOpen(false);
        }}

      />
    )
    setIsModalOpen(true)
  }

  function TableHeader() {
    return (
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle>{tableHeading.title}</BlockTitle>
          </BlockHeadContent>
          <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <a
                href="#more"
                className="btn btn-icon btn-trigger toggle-expand me-n1"
                onClick={(ev) => {
                  ev.preventDefault();
                  setSmOption(!smOption);
                }}
              >
                <Icon name="more-v"></Icon>
              </a>
              <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>

                <ul className="nk-block-tools g-3 dt-buttons">
                  {
                    !tableHeading.addNewItemButtonLink ? "" :
                      <li>
                        <button className="btn btn-secondary  buttons-html5 " type="button" onClick={() => {
                          navigate(`${process.env.PUBLIC_URL}${tableHeading.addNewItemButtonLink}`)
                        }}>
                          <Icon name="property-add" />
                        </button>
                      </li>
                  }


                  <li>
                    <button className="btn btn-secondary  buttons-html5 " type="button" onClick={() => onFilterPress()}>
                      <Icon name="filter" />
                    </button>
                  </li>
                  <Export data={tableData || []} />

                </ul>
              </div>
            </div>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
    );
  }

  function ActionsDropdownButton() {
    return (
        <ul className="nk-tb-actions gx-1 my-n1">
          <li className="me-n1">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"
                href="#toggle"
                onClick={(ev) => ev.preventDefault()}
                className="dropdown-toggle btn btn-icon btn-trigger"
              >
                <Icon name="more-h"></Icon>
              </DropdownToggle>

            </UncontrolledDropdown>
          </li>
        </ul>
    );
  }

  function TableHead() {
    return (
      <>
        <DataTableHead>
          <DataTableRow className="nk-tb-col-check">
            <div className="custom-control custom-control-sm custom-checkbox notext">
              <input
                type="checkbox"
                className="custom-control-input"
                id="uid_1"
                onChange={(e) => selectorCheck(e)}
              />
              <label className="custom-control-label" htmlFor="uid_1"></label>
            </div>
          </DataTableRow>
          {
            tableStructure.map(item => {
              if(item.useActionsButton){
                return (

                  <DataTableRow key={`${item.slug}-head`} className="nk-tb-col-tools">
                    <ActionsDropdownButton />
                  </DataTableRow>
                )
              }
              return (
                <DataTableRow key={`${item.slug}-head`} size="sm">
                  <span>{item.title}</span>
                </DataTableRow>
              )
            })
          }
        </DataTableHead>
      </>
    );
  }

  function getNestedValue(data, key){
    return  (key.split('.')).length === 1  ? data[key] : (key.split('.').reduce((obj, key) => obj && obj[key], data) || '')

  }
  function replacePlaceholders(str, data) {
    return str.replace(/:(\w+(\.\w+)?)/g, (match, key) => {
      const keys = key.split('.');
      let value = data;
      for (const k of keys) {
        value = value[k];
        if (value === undefined) {
          return match; // Return the original placeholder if the nested key doesn't exist
        }
      }
      return value;
    });
  }

  function DataGenerator({ index, item, itemConfig, itemValue }) {



    //این داده قطعا تاریخ است. با فرمت جلالی نشون بده
    if (itemConfig.useJalaliFormat) {
      if (itemConfig.useFarsiNumber) {

        return (
          <span className="title" key={`${itemConfig.slug}-${index}-${itemValue}`}
                style={{ direction: "ltr" }}>{toFarsiNumber(ConvertGregorianToJalali(itemValue, itemConfig.showDateTime ? itemConfig.showDateTime : false))}</span>
        )


      }
      return (
        <span key={`${itemConfig.slug}-${index}-${itemValue}`} className="title">{ConvertGregorianToJalali(itemValue, itemConfig.showDateTime ? itemConfig.showDateTime : false)}</span>
      );
    }

    //ترجمه این داده رو نشون بده
    if (itemConfig.useTranslate) {
      return (
        <span key={`${itemConfig.slug}-${index}-${itemValue}`} className="title">{t(itemValue)}</span>
      );
    }

    if(itemConfig.useActionsButton){
      return (
        <UncontrolledDropdown key={`${itemConfig.slug}-${index}-${itemValue}`}>
          <DropdownToggle
            tag="a"
            href="#more"
            onClick={(ev) => ev.preventDefault()}
            className="dropdown-toggle btn btn-icon btn-trigger "
          >
            <Icon name="more-h"></Icon>
          </DropdownToggle>
          <DropdownMenu end>
            <ul className="link-list-opt no-bdr">
              {
                itemConfig.actions.map(j => {
                  return(
                    <li key={`action-btn-${j.slug}-${index}`}>
                      <DropdownItem
                        tag="a"
                        href="#edit"
                        onClick={(ev) => {
                          ev.preventDefault();

                          if(j.useRoute){
                            // if((j.route.split(':')).length > 1) {
                            //   console.log('xxxxxxxx', item[(j.route.split(':'))[0]])
                            // }
                            navigate(`${process.env.PUBLIC_URL}${replacePlaceholders(j.route, item) || ''}`);
                          }

                          if(j.useYesOrNoModal) {
                            setYesOrNoModalIsOpen(true)
                            setModalProps({
                              modalCancelText: j.modalCancelText || 'بستن',
                              modalSubmitText: j.modalSubmitText || 'تایید',
                              modalTitle: j.modalTitle || 'عنوان پنجره یافت نشد',
                              modalContent: j.modalContent || 'متن پنجره یافت نشد'
                            })
                          }
                          // onEditClick(item.id);
                          // toggle("edit");
                        }}
                      >
                        <Icon name={j.icon}></Icon>
                        <span>{j.title}</span>
                      </DropdownItem>
                    </li>
                  )
                })
              }
            </ul>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }

    return (
      <span  key={`${itemConfig.slug}-${index}-${itemValue}`} className="title">{itemValue}</span>
    );
  }

  function TableRow({ item }) {
    return (
      <DataTableItem key={item._id ? item._id : item.id}>
        <DataTableRow className="nk-tb-col-check">
          <div className="custom-control custom-control-sm custom-checkbox notext">
            <input
              type="checkbox"
              className="custom-control-input"
              defaultChecked={item.check}
              id={item.id + "uid1"}
              key={Math.random()}
              onChange={(e) => onSelectChange(e, item.id)}
            />
            <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
          </div>
        </DataTableRow>
        {
          tableStructure.map((i, index) => {
            return (
              <DataTableRow key={`${item.slug}-${index}`} size="sm">
                  <span  className={`tb-product ${i.useActionsButton ? "d-flex justify-end align-end" : ""}`}>
                    {/*<img src={item.img ? item.img : ProductH} alt="product" className="thumb" />*/}
                    <DataGenerator index={index} item={item} itemConfig={i} itemValue={(i.slug.split('.')).length === 1  ? item[i.slug] : (i.slug.split('.').reduce((obj, key) => obj && obj[key], item) || '')}/>

                  </span>
              </DataTableRow>
            );
          })
        }
      </DataTableItem>
    );
  }

  function TableItems() {

    return (
      <>
        {

          tableData.length > 0 ?
            tableData.map(( item, index ) => {
              return (
                <TableRow key={`data-${index}`} item={item} />
              );
            }) : null
        }
      </>
    );
  }

  function TableBody() {
    return (
      <Block>
        <Card className="card-bordered">
          <div className="card-inner-group">
            <div className="card-inner p-0">

              <DataTableBody>
                <TableHead key={'tableHead'} />
                <TableItems  key={'tableItems'} />
              </DataTableBody>
              {

                tableData.length > 0 ?
                  null : (
                    <Col className="col-12 text-start no-data-found">
                      <div className="text-center">
                        <span className="text-silent">داده مورد نظر یافت نشد</span>
                      </div>
                    </Col>

                  )
              }
              <Pagination
                itemPerPage={pagination.itemPerPage}
                totalItems={pagination.totalItems}
                currentPage={pagination.currentPage}
                paginate={(pageNumber) => {
                  onCurrentPageChange(pageNumber);
                }}
                setRowsPerPage={(e) => {
                  onItemPerPageChange(parseInt(e), 1);
                }}
              />

            </div>
          </div>
        </Card>
      </Block>
    );
  }

  return (
    <>
      <Head title={tableHeading.title}></Head>

      <ModalHelper
        open={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
        component={modalComponent}
      />

      <ModalHelper
        open={yesOrNoModalIsOpen}
        onOpen={() => setYesOrNoModalIsOpen(true)}
        onClose={() => setYesOrNoModalIsOpen(false)}
        component={
          <YesOrNoModal
            cancelText={modalProps.modalCancelText}
            submitText={modalProps.modalSubmitText}
            onClose={() => {

              setYesOrNoModalIsOpen(false);
            }}
            title={modalProps.modalTitle}
            content={modalProps.modalContent}
          />
        }
      />


      <Content>
        <TableHeader />
        <TableBody />

        <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Product</h5>
              <div className="mt-4">
                <form noValidate onSubmit={handleSubmit(onEditSubmit)}>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Product Title
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            {...register("name", {
                              required: "This field is required"
                            })}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                          {errors.name && <span className="invalid">{errors.name.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="regular-price">
                          Regular Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            {...register("price", { required: "This is required" })}
                            className="form-control"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                          {errors.price && <span className="invalid">{errors.price.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="sale-price">
                          Sale Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            {...register("salePrice")}
                            value={formData.salePrice}
                            onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })} />
                          {errors.salePrice && <span className="invalid">{errors.salePrice.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="stock">
                          Stock
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            {...register("stock", { required: "This is required" })}
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                          {errors.stock && <span className="invalid">{errors.stock.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="SKU">
                          SKU
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            {...register("sku", { required: "This is required" })}
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })} />
                          {errors.sku && <span className="invalid">{errors.sku.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="category">
                          Category
                        </label>
                        <div className="form-control-wrap">
                          {/*<RSelect*/}
                          {/*  isMulti*/}
                          {/*  options={categoryOptions}*/}
                          {/*  value={formData.category}*/}
                          {/*  onChange={(value) => setFormData({ ...formData, category: value })}*/}
                          {/*  //ref={register({ required: "This is required" })}*/}
                          {/*/>*/}
                          {errors.category && <span className="invalid">{errors.category.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="category">
                          Product Image
                        </label>
                        <div className="form-control-wrap">
                          <img src={formData.img} alt=""></img>
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div
                              {...getRootProps()}
                              className="dropzone upload-zone small bg-lighter my-2 dz-clickable"
                            >
                              <input {...getInputProps()} />
                              {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                              {files.map((file) => (
                                <div
                                  key={file.name}
                                  className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                >
                                  <div className="dz-image">
                                    <img src={file.preview} alt="preview" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Update Product</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-modal-head">
              <h4 className="nk-modal-title title">
                Product <small className="text-primary">#{formData.sku}</small>
              </h4>
              <img src={formData.img} alt="" />
            </div>
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Product Name</span>
                  <span className="caption-text">{formData.name}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Product Price</span>
                  <span className="caption-text">$ {formData.price}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Product Category</span>
                  <span className="caption-text">
                    {formData.category.map((item) => (
                      <Badge className="me-1" color="secondary">
                        {item.value}
                      </Badge>
                    ))}
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Stock</span>
                  <span className="caption-text"> {formData.stock}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
            view.add ? "content-active" : ""
          }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Product</BlockTitle>
              <BlockDes>
                <p>Add information or update product.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Product Title
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        {...register("name", {
                          required: "This field is required"
                        })}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="regular-price">
                      Regular Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        {...register("price", { required: "This is required" })}
                        className="form-control"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                      {errors.price && <span className="invalid">{errors.price.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sale-price">
                      Sale Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        className="form-control"
                        {...register("salePrice")}
                        value={formData.salePrice}
                        onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })} />
                      {errors.salePrice && <span className="invalid">{errors.salePrice.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="stock">
                      Stock
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        className="form-control"
                        {...register("stock", { required: "This is required" })}
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                      {errors.stock && <span className="invalid">{errors.stock.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="SKU">
                      SKU
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        {...register("sku", { required: "This is required" })}
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })} />
                      {errors.sku && <span className="invalid">{errors.sku.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                    <div className="form-control-wrap">
                      {/*<RSelect*/}
                      {/*  name="category"*/}
                      {/*  isMulti*/}
                      {/*  options={categoryOptions}*/}
                      {/*  onChange={(value) => setFormData({ ...formData, category: value })}*/}
                      {/*  value={formData.category}*/}
                      {/*  //ref={register({ required: "This is required" })}*/}
                      {/*/>*/}
                      {errors.category && <span className="invalid">{errors.category.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone upload-zone small bg-lighter my-2 dz-clickable">
                          <input {...getInputProps()} />
                          {files.length === 0 && <p>Drag 'n' drop some files here, or click to select files</p>}
                          {files.map((file) => (
                            <div
                              key={file.name}
                              className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                            >
                              <div className="dz-image">
                                <img src={file.preview} alt="preview" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Product</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>


        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </>
  );
};

export default Table;
