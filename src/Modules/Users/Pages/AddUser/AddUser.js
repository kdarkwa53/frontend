
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import UserForm from "../../Components/UserForm"

const AddUser = () => {
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
      <Button type="primary" onClick={showModal}>
        Add User
      </Button>
      <Modal title="Add Role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <UserForm/>
      </Modal>
    </>
  );
};

export default AddUser