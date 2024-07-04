import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Col, Progress, Row } from "reactstrap";
import './styles.css'


import { FileUploadType } from "../field/filed.model";
import { MdClose } from "react-icons/md";




export const DropdownFileUploader = ({className, multiple, placeholder, fileUploadType, fileUploadAcceptedFiles, onChange, onCancel, ...props}) =>{
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState([]);



  function onUpload(){
    alert('onUpload')
  }

  useEffect(()=>{
    onChange(files);
  }, [files])

  function formatBytes(bytes) {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  }


  const onDrop = (acceptedFiles) => {
    console.log('accepted', acceptedFiles)
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0
    }));
    setFiles([...files, ...newFiles]);
  };


  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onCancel()
  };




  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections} = useDropzone({onDrop, multiple: true,  accept: fileUploadAcceptedFiles})


  //File Upload style
  const selectedFilesOfFileUpload = files?.map((fileItem, index)=>(
    <Row className="upload-item">
      <Col md="2" className="uploader-image">
        <img src={fileItem.preview} alt={""}/>
      </Col>
      <Col md="8" className="uploader-content" style={{margin: "auto"}}>
        <Row className="uploader-filename"><p className="no-padding">{fileItem.file.name}</p></Row>
        <Row className="uploader-progress"><Progress className="progress-sm progress-upload" value={fileItem.progress} max="100"  /></Row>
        <Row className="uploader-filesize"><Col md="6" className="no-padding"><p>{formatBytes(fileItem.file.size)}</p></Col><Col md="6" className="percentage no-padding"><p>{fileItem.progress}%</p></Col></Row>
      </Col>
      <Col md="2" >
        <Row className="uploader-close" style={{height: "100%"}}>
          <Col md="6" className="action-btn" onClick={() => removeFile(index)}>
            <MdClose  size={18} color={"#555555"} />
          </Col>
        </Row>
      </Col>
    </Row>
  ))

  //Post style
  const selectedFilesOfPost = files?.map((fileItem, index)=>(
    <div className="style-2">
      <Row  className="uploader-image-container">
        <div className="uploader-image">
          <div className="image">
            <img src={fileItem.preview} alt={""}/>
          </div>
        </div>
        <div className="action-btn" onClick={() => removeFile(index)}>
          <MdClose  size={18} color={"#555555"} />
        </div>
      </Row>
      <Row>
        <Col md="12" className="uploader-content" style={{margin: "auto"}}>
          <Row className="uploader-filename"><p className="no-padding">{fileItem.file.name}</p></Row>
          <Row className="uploader-progress"><Progress className="progress-sm progress-upload" value={fileItem.progress} max="100"  /></Row>
          <Row className="uploader-filesize"><Col md="6" className="no-padding"><p>{formatBytes(fileItem.file.size)}</p></Col><Col md="6" className="percentage no-padding"><p>{fileItem.progress}%</p></Col></Row>
        </Col>
      </Row>
    </div>

  ))


   //Profile style
   const selectedFilesOfProfile = files?.map((fileItem, index)=>(
    <div className="style-3">
        <div >
          <Row  className="uploader-image-container">
            <div className="uploader-image">
              <div className="image">
                <img src={fileItem.preview} alt={""}/>
              </div>
            </div>
            <div className="action-btn" onClick={() => removeFile(index)}>
              <MdClose  size={18} color={"#555555"} />
            </div>
          </Row>

          <Row>
            <Col md="12" className="uploader-content" style={{margin: "auto"}}>
              <Row className="uploader-filename"><p className="no-padding">{fileItem.file.name}</p></Row>
              <Row className="uploader-progress"><Progress className="progress-sm progress-upload" value={fileItem.progress} max="100"  /></Row>
              <Row className="uploader-filesize"><Col md="6" className="no-padding"><p>{formatBytes(fileItem.file.size)}</p></Col><Col md="6" className="percentage no-padding"><p>{fileItem.progress}%</p></Col></Row>
            </Col>
          </Row>
      </div>
    </div>

  ))


  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const uploadPost = async () => {
    // const docRef = await addDoc(col)
  }

  function UploadZone({inputProps, getRootProps}){
    return(
      <div {...getRootProps()}>
        <div className="drop-zone">
          <input {...inputProps()} />
          <p>Taille maximale du fichier 50 Mo</p>
        </div>
        {/* <input {...getInputProps()} />
        {
          <p>Drop the files here ...</p>
        } */}
      </div>
    )
  }

  return(
   <di className={className}>
      {
        (multiple || (!multiple && selectedFilesOfFileUpload.length === 0 && selectedFilesOfPost.length === 0 && selectedFilesOfProfile.length === 0)) ?
        <div {...getRootProps()}>
          <div className="drop-zone">
            <input {...getInputProps()} />
            <p>{placeholder ? placeholder : "Taille maximale du fichier 50 Mo"}</p>
          </div>
          {/* <input {...getInputProps()} />
          {
            <p>Drop the files here ...</p>
          } */}
        </div> : ''
      }
     {
        fileUploadType === FileUploadType.FILE_UPLOAD ? selectedFilesOfFileUpload :
        (fileUploadType === FileUploadType.POST ? selectedFilesOfPost : (
          (fileUploadType === FileUploadType.PROFILE ? selectedFilesOfProfile : '')
        ))
     }
     {
      // (
      //   selectedFilesOfFileUpload.length > 0 ||
      //   selectedFilesOfPost.length > 0 ||
      //   selectedFilesOfProfile.length > 0
      //   ) ?
      //   <button
      //     className="btn btn-success  w-100 add_plan_button"
      //     onClick={()=> {uploadFiles()}}
      //   >
      //     <span>آپلود فایل</span>
      //     {/* <span >{isLoading ? <Spinner size="sm"></Spinner> : ''}آپلود</span> */}
      //   </button>
      // : ''
     }

   </di>
  )
}


