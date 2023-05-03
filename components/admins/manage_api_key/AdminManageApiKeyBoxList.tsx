import React from "react";
import AdminManageApiKeySelectApiKeyComponentCustom from "./AdminManageApiKeySelectApiKey";
import { IConfigApiGroupsManagements } from "../../../interfaces/configs/IConfigTransaction.interface";

const AdminManageApiKeyBoxListComponent = ({
  listEndpoints,
  allApiGroupManagement,
  idEndpointGroupId,
  idApiKey,
  callbackUpdateListApiKeys
}: {
  listEndpoints: Array<string>;
  allApiGroupManagement: IConfigApiGroupsManagements;
  idEndpointGroupId: string;
  idApiKey: string;
  callbackUpdateListApiKeys:()=> void
}) => {
  return (
    <div className="bg-nsWhite1  border border-solid border-nsGray1 rounded-nsBase my-5 flex justify-between">
      <div className="opacity-50 ">
        <ul className="m-0 px-4  list-none">
          {listEndpoints.map((item, index) => (
            <li className="my-5" key={index}>
              <span>{index + 1}.</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <AdminManageApiKeySelectApiKeyComponentCustom
        callbackUpdateListApiKeys={callbackUpdateListApiKeys}
        idApiKey={idApiKey}
        idEndpointGroupId={idEndpointGroupId}
        allApiGroupManagement={allApiGroupManagement}
      />
    </div>
  );
};

export default AdminManageApiKeyBoxListComponent;
