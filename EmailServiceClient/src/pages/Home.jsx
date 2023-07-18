import { useState } from "react";
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', 10)
import { publicRequest, userRequest } from '../../requestMethods'
import { Spin } from "antd";
import Papa from 'papaparse';
const RealValidData = ['UID', 'Student_Name', 'Email_Id', 'CUCHD_Email', 'CUCHD_Password', 'LMS_User_Id', 'LMS_Password']

const Home = () => {
  const [selectedfile, SetSelectedFile] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dataHeaders, setDataHeaders] = useState([])
  const [isDataValid, setIsDataValid] = useState(false)

  const checkDataValid = (dataArray) => {
    const isEveryValuePresent = RealValidData.every((value) => dataArray.includes(value));
    if (isEveryValuePresent === false) {
      alert('Please upload a file which have headears with same naming convention')
      setIsDataValid(false)
      SetSelectedFile('')
      setData([])
      setUploading(false)
    } else {
      setIsDataValid(true)
    }
  }

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const InputChange = (e) => {
    setUploading(true)
    // --For Single File Input
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      SetSelectedFile({
        id: nanoid(5),
        filename: e.target.files[0].name,
        filetype: e.target.files[0].type,
        fileimage: reader.result,
        datetime: e.target.files[0].lastModifiedDate.toLocaleString('en-IN'),
        filesize: filesizes(e.target.files[0].size),
        realFile: e.target.files[0]
      });
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
      Papa.parse(e.target.files[0], {
        header: false,
        complete: (results) => {
          setDataHeaders(results.data[0]);
          checkDataValid(results.data[0])
        },
      });
      setUploading(false)
    }
  }



  const FileUploadSubmit = async (e) => {
    e.preventDefault();
    setUploading(true)
    if (selectedfile !== '') {
      const formData = new FormData()
      formData.append("uploadField", selectedfile.realFile)
      try {
        const res = await userRequest.post("/send/email/multiple", formData)
        if (res.data) {
          setUploading(false)
          SetSelectedFile('')
          alert('All messages are sent successfully')
        }
      } catch (error) {
        console.log(error.message)
        alert('There is some error, try again later')
      }
    } else {
      alert('Please select file')
    }
  }
  const handleClear = () => {
    SetSelectedFile('')
    setData([])
    setUploading(false)
  }
  console.log(dataHeaders)
  return (
    <>
      <Spin spinning={uploading}>
        <div className="fileupload-view">
          <div className="row justify-content-center m-0">
            <div className="col-md-6">
              <div className="card mt-5">
                <div className="card-body">
                  <div className="kb-data-box">
                    <div className="kb-modal-data-title">
                      <div className="kb-data-title">
                        <h6>Upload the csv file</h6>
                        <span className="text-danger">*only csv file supported</span>
                      </div>
                    </div>
                    <form onSubmit={FileUploadSubmit}>
                      <div className="kb-file-upload">
                        <div className="file-upload-box">
                          <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} accept=".csv"/>
                          <span>Drag and drop or <span className="file-link">Choose your file</span></span>
                        </div>
                      </div>
                      <div className="kb-attach-box mb-3">
                        {selectedfile !== '' ?
                          <div className="file-atc-box">
                            {
                              selectedfile.filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                <div className="file-image"> <img src={selectedfile.fileimage} alt="" /></div> :
                                <div className="file-image"><i className="far fa-file-alt"></i></div>
                            }
                            <div className="file-detail">
                              <h6>{selectedfile.filename}</h6>
                              <p><span>Size : {selectedfile.filesize}</span><span className="ml-2">Modified Time : {selectedfile.datetime}</span></p>
                            </div>
                            <div className="kb-buttons-box">
                              <button className="btn btn-danger" onClick={handleClear}>clear</button>
                            </div>
                          </div>
                          : ''}
                      </div>
                      {selectedfile !== '' ? <div className="kb-buttons-box">
                        <button type="submit" className="btn btn-primary form-submit" disabled={!isDataValid}>Send Emails</button>
                      </div> : ''}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
      <div className="pl-4 pt-4 pb-4">
        <div className="listWrapper">
          <ul className="list-group">
            <li className="list-group-item active py-1" aria-current="true"><span className="text-danger">*</span>Mandatory headers of file<span className="text-danger">*</span></li>
            {
              RealValidData.map(value=><li className="list-group-item py-1" key={value}>{value}</li>)
            }
          </ul>
        </div>
      </div>
    </>
  );
}


export default Home