
import React, { useState } from 'react';
import { Modal } from 'antd';
import UserForm from "../../Components/UserForm"
import { Button } from "tabler-react";


const EditUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button outline color="warning" onClick={showModal} size="sm">
        Edit
      </Button>
      <Modal title="Edit Role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <UserForm/>
      </Modal>
    </>
  );
};

export default EditUser