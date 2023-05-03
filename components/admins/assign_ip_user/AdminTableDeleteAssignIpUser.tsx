import React, { useState } from "react";
import { setListenerUpdateTableAssignIpUser } from "../../../redux/features/admin_assign_ip_user/AdminAssignIpUser-Slice";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { useAppDispatch } from "../../../redux/hook";
import { ApiService } from "../../../services/ApiService";
import IconButtonCustomOne from "../../buttons/IconButtonCustomOne";
import ModalCustomComponent from "../../customs/ModalCustom";
import { DeleteIcon } from "../../mui";

const AdminTableDeleteAssignIpUserComponent = ({
  idIpUser,
}: {
  idIpUser: string;
}) => {
  const [showOrOffModal, setShowOrOffModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleDeleteIpUser = async () => {
    try {
      dispatch(setShowFullPage({ active: true }));
      await ApiService().users().deleteAssignIpUser(idIpUser);
      dispatch(setListenerUpdateTableAssignIpUser(true));
    } catch (error) {
      return error;
    }
  };
  return (
    <div>
      <IconButtonCustomOne
        onClick={() => setShowOrOffModal(true)}
        aria-label="user ip delete"
      >
        <DeleteIcon />
      </IconButtonCustomOne>
      <ModalCustomComponent
        onClickCancel={setShowOrOffModal}
        handleOpenModalValue={showOrOffModal}
        titleModal="You are about to delete an IP"
        descriptionModal="The information regarding to IP will be deleted and unusable in future!"
        nameBtnAccept="Delete"
        nameBtnCancel="Cancel"
        onClickAccept={() => handleDeleteIpUser()}
      />
    </div>
  );
};

export default AdminTableDeleteAssignIpUserComponent;
