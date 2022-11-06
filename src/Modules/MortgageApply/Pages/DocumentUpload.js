
import ImageUpload from "../../../Shared/Components/Layouts/Components/ImageUpload/ImageUpload";

const DocumentUpload = ({ state, setFormState }) => {
  // const normFile = (e) => {
  //   console.log("Upload event:", e);

  //   if (Array.isArray(e)) {
  //     return e;
  //   }

  //   return e && e.fileList;
  // };


  const handleChange = (name, url) => {
  
      setFormState({
        ...state,
        documents: {
          ...state.documents,
          [name]: url
        }
      })
console.log(state?.documents)
  }

   


  return (
    // <>
    // <ImageUpload/>
    //   <ImageUpload />

    // </>
    <div>
      <ImageUpload name="idDoc" handleChange={handleChange} msg="Copies of passport or Govt issued ID card"/>
      <ImageUpload name="utilityBillDoc" handleChange={handleChange}  msg="Copies of your utility bill (electricity  or water bill or any other utility bill)" />
      <ImageUpload name="bankStatementDoc" handleChange={handleChange}  msg="Copies of your complete bank statements for the most recent 3 months" />
      <ImageUpload name="paycheckDoc" handleChange={handleChange}  msg="Copies of the most recent 2 months job paychecks" />
      <ImageUpload name="taxDoc" handleChange={handleChange}  msg="Copies of the most recent 2 years W2s,
         or most recent 2 years tax returns or any IRS/GRA documents proving your income for the last 2 years" />
    </div>
        

    // <>
    //   <Divider orientation="left" plain>
    //     <Header.H3>Document Upload</Header.H3>
    //   </Divider>
    //   <Form.Item label="Copies of passport or Govt issued ID card">
    //     <Form.Item rules={[{ required: true }]} noStyle >
    //       <Form.Item
    //         name="dragger"
    //         noStyle
    //         defaultFileList={[{
    //           uid: 1,
    //           url: state.documents["idDoc"] ? state.documents["idDoc"] : "",
    //           name: state.documents["idDoc"] ? 'National ID file' : "",
    //           status: 'done',
    //         }]}
    //       >
    //         <Dragger name="idDoc" onChange={handleChange("idDoc")} {...props}>
    //           <p className="ant-upload-drag-icon">
    //             <InboxOutlined />
    //           </p>
    //           <p className="ant-upload-text">
    //             Click or drag file to this area to upload
    //           </p>
    //           <p className="ant-upload-hint">
    //             Support for a single upload
    //           </p>
    //         </Dragger>
    //       </Form.Item>
    //     </Form.Item>
    //   </Form.Item>
    //   <Form.Item label="Copies of your utility bill (electricity  or water bill or any other utility bill)">
    //     <Form.Item
    //       rules={[{ required: true }]}
    //       noStyle
    //     >
    //       <Dragger name="utilityBillDoc"
    //         defaultFileList={[{
    //           uid: 1,
    //           url: state.documents["utilityBillDoc"] ? state.documents["utilityBillDoc"] : "",
    //           name: state.documents["utilityBillDoc"] ? 'Utility Bill file' : "",
    //           status: 'done',
    //         }]}
    //         onChange={handleChange("utilityBillDoc")} {...props}>
    //         <p className="ant-upload-drag-icon">
    //           <InboxOutlined />
    //         </p>
    //         <p className="ant-upload-text">
    //           Click or drag file to this area to upload
    //           </p>
    //         <p className="ant-upload-hint">
    //           Support for a single upload
    //           </p>
    //       </Dragger>
    //     </Form.Item>
    //   </Form.Item>
    //   <Form.Item label="Copies of your complete bank statements for the most recent 3 months">
    //     <Form.Item
    //       rules={[{ required: true }]}
    //       noStyle
    //     >
    //       <Dragger
    //         name="bankStatementDoc"
    //         onChange={handleChange("bankStatementDoc")}
    //         defaultFileList={[{
    //           uid: 1,
    //           url: state.documents["bankStatementDoc"] ? state.documents["bankStatementDoc"] : "",
    //           name: state.documents["bankStatementDoc"] ? 'Bank Statement file' : "",
    //           status: 'done',
    //         }]}
    //         {...props}>
    //         <p className="ant-upload-drag-icon">
    //           <InboxOutlined />
    //         </p>
    //         <p className="ant-upload-text">
    //           Click or drag file to this area to upload
    //           </p>
    //         <p className="ant-upload-hint">
    //           Support for a single upload
    //           </p>
    //       </Dragger>
    //     </Form.Item>
    //   </Form.Item>
    //   <Form.Item label="Copies of the most recent 2 months job paychecks">
    //     <Form.Item
    //       noStyle
    //       rules={[{ required: true }]}

    //     >
    //       <Dragger
    //         defaultFileList={[{
    //           uid: 1,
    //           url: state.documents["paycheckDoc"] ? state.documents["paycheckDoc"] : "",
    //           name: state.documents["paycheckDoc"] ? 'Paycheck file' : "",
    //           status: 'done',
    //         }]}
    //         name="paycheckDoc" onChange={handleChange("paycheckDoc")} {...props}>
    //         <p className="ant-upload-drag-icon">
    //           <InboxOutlined />
    //         </p>
    //         <p className="ant-upload-text">
    //           Click or drag file to this area to upload
    //           </p>
    //         <p className="ant-upload-hint">
    //           Support for a single upload
    //           </p>
    //       </Dragger>
    //     </Form.Item>
    //   </Form.Item>
    //   <Form.Item
    //     label="Copies of the most recent 2 years W2s,
    //      or most recent 2 years tax returns or any IRS/GRA documents proving your income for the last 2 years"
    //   >
    //     <Form.Item
    //       noStyle
    //       rules={[{ required: true }]}

    //     >
    //       <Dragger
    //         defaultFileList={[{
    //           uid: 1,
    //           url: state.documents["taxDoc"] ? state.documents["taxDoc"] : "",
    //           name: state.documents["taxDoc"] ? 'Tax return file' : "",
    //           status: 'done',
    //         }]}
    //         name="taxDoc" onChange={handleChange("taxDoc")} {...props}>
    //         <p className="ant-upload-drag-icon">
    //           <InboxOutlined />
    //         </p>
    //         <p className="ant-upload-text">
    //           Click or drag file to this area to upload
    //           </p>
    //         <p className="ant-upload-hint">
    //           Support for a single upload
    //           </p>
    //       </Dragger>
    //     </Form.Item>
    //   </Form.Item>

    // </>
  );
};

export default DocumentUpload;
