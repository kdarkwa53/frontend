
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import RoleForm from "../../Components/RoleForm"

const AddRole = () => {
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
        Add Role
      </Button>
      <Modal title="Add Role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <RoleForm/>
      </Modal>
    </>
  );
};

export default AddRole