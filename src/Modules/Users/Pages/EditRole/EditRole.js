
import React, { useState } from 'react';
import { Modal } from 'antd';
import RoleForm from "../../Components/RoleForm"
import { Button } from "tabler-react";


const EditRole = () => {
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
        <RoleForm/>
      </Modal>
    </>
  );
};

export default EditRole