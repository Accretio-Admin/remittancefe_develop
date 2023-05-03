import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { setShowFullPage } from "../../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { ApiService } from "../../../services/ApiService";
import {
  IConfigApiGroupsManagementResult,
  IConfigApiGroupsManagements,
} from "../../../interfaces/configs/IConfigTransaction.interface";
import IconButtonCustomOne from "../../buttons/IconButtonCustomOne";
import {
  AddCircleOutlineOutlinedIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  MenuItem,
} from "../../mui";
import { fontSize } from "../../../utils/font_size";
import { IFormApiGroupManagementCreateEndpoints } from "../../../interfaces/formik/IFormik.interface";
import { Formik } from "formik";
import { FormConfigApiGroupsManagementCreateEndpointsSchema } from "../../../utils/yup";
import InputCustomOne from "../../inputs/InputCustomOne";
import CreateApiGroupBoxComponentCustom from "./CreateApiGroupBox";
import ModalCustomComponent from "../../customs/ModalCustom";
const CApiGroupsManagementComponent = () => {
  const [
    showContainerBoxCreateNameApiGroup,
    setShowContainerBoxCreateNameApiGroup,
  ] = useState<boolean>(false);
  const [
    idApiTokenContainerCreateEndpoint,
    setIdApiTokenContainerCreateEndpoint,
  ] = useState<string>("");
  const [showBtnSaveApiGroup, setShowBtnSaveApiGroup] = useState<string>("");
  const [editableNameApiGroupManagement, setEditableNameApiGroupManagement] =
    useState<string>();
  const [
    editableEndPointApiGroupManagement,
    setEditableEndPointApiGroupManagement,
  ] = useState<string>();
  const [idApiTokenDeleteModal, setIdApiTokenDeleteModal] =
    useState<string>("");
  const [nameEndPointDeleteModal, setNameEndPointDeleteModal] =
    useState<string>("");
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<IConfigApiGroupsManagementResult[]>([]);
  const [selectInputsValue, setSelectInputsValue] = useState<Array<string>>([]);
  useEffect(() => {
    (async () => await automaticLoadTableData({}))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const automaticLoadTableData = async ({
    page = 0,
    pageSize = 0,
    sortingValue = "",
    filterValue = "",
  }) => {
    dispatch(setShowFullPage({ active: true }));
    try {
      let allApiGroupsManagements = (await (
        await ApiService()
          .apiGroupsManagement()
          .getApiGroupsManagement(page + 1, pageSize, "createdAt:desc", filterValue)
      ).data) as IConfigApiGroupsManagements;
      setRows(allApiGroupsManagements.results);
      setShowContainerBoxCreateNameApiGroup(
        allApiGroupsManagements.results.length == 0 ? true : false
      );
      setSelectInputsValue(
        (await ApiService().apiGroupsManagement().getEndPointsApiGroups()).data
      );
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: false }));
  };
  const handleDeleteApiGroupManagement = async (idApiToken: string) => {
    dispatch(setShowFullPage({ active: true }));
    try {
      await ApiService()
        .apiGroupsManagement()
        .deleteApiGroupManagement(idApiToken);
      await automaticLoadTableData({
        filterValue: "",
        page: 0,
        pageSize: 0,
        sortingValue: "",
      });
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: false }));
  };
  const handleCheckHaveEndpoint = (endpoints: string[], idApiToken: string) => {
    if (endpoints.length == 0) {
      return NotHaveEndpointGroups();
    } else {
      return eachItemApiGroupsEndpoints(endpoints, idApiToken);
    }
  };
  const NotHaveEndpointGroups = () => {
    return (
      <div className="px-4">
        <p className="my-5 text-nsBlack1/80">No any API been added yet!</p>
      </div>
    );
  };
  const toolBarItemBox = (name: string, idApiToken: string) => {
    return (
      <div className="flex items-center w-full justify-between">
        {idApiToken == editableNameApiGroupManagement ? (
          <div className="w-1/2">
            <InputCustomOne
              colorInputCustom="nsBlack1"
              borderRadiusCustom="md"
              bgColorCustom="nsAlabaster1"
              fontSizeCustom="sm"
              fieldsetBorderColorCustom="nsGray4"
              placeholderColorCustom="nsGray4"
              focusedPlaceholderColorCustom="nsGray4"
              muiFocusedShadowCustom="nsOne"
              type="text"
              fullWidth
              name="name"
              onChange={(e) =>
                handleOnChangeEditNameApiGroupManagement(
                  e.target.value,
                  idApiToken
                )
              }
              className="select-all"
              value={name}
              placeholder="Enter your name here"
            />
          </div>
        ) : (
          <h1 className={`m-0 text-base api-groups-name-${name}`}>{name}</h1>
        )}
        <div>
          {idApiToken == editableNameApiGroupManagement ? (
            <IconButtonCustomOne
              onClick={() => {
                setShowBtnSaveApiGroup("");
                setEditableNameApiGroupManagement("");
              }}
            >
              <CloseIcon />
            </IconButtonCustomOne>
          ) : (
            <IconButtonCustomOne
              onClick={() => {
                setShowBtnSaveApiGroup(idApiToken);
                setEditableNameApiGroupManagement(idApiToken);
              }}
            >
              <EditIcon />
            </IconButtonCustomOne>
          )}
          {idApiToken !== editableNameApiGroupManagement && (
            <IconButtonCustomOne
              onClick={() => setIdApiTokenDeleteModal(idApiToken)}
            >
              <DeleteIcon />
            </IconButtonCustomOne>
          )}
        </div>
        <ModalCustomComponent
          classDescription="text-sm"
          onClickCancel={() => setIdApiTokenDeleteModal("")}
          handleOpenModalValue={idApiToken == idApiTokenDeleteModal}
          titleModal="API group removal"
          descriptionModal="Are you sure you want to delete this API Group?"
          nameBtnAccept="Delete"
          nameBtnCancel="Cancel"
          onClickAccept={async () =>
            await handleDeleteApiGroupManagement(idApiToken)
          }
        />
      </div>
    );
  };
  const eachItemApiGroupsEndpoints = (
    endpoints: string[],
    idApiToken: string
  ) => {
    return (
      <ul className="m-0 px-4 ">
        {endpoints.map((itemEndPoint, indexEndPoint) => (
          <li
            className="my-5 flex justify-between items-center"
            key={indexEndPoint}
          >
            {`${idApiToken}${indexEndPoint}` ==
            editableEndPointApiGroupManagement ? (
              <div className="w-1/2">
                {handleShowInputSelect(endpoints, itemEndPoint, (e) => {
                  handleOnChangeEditEndPointApiGroupManagement(
                    e.target.value,
                    itemEndPoint,
                    idApiToken
                  );
                })}
              </div>
            ) : (
              <p className="m-0 text-nsBlack1/80">{itemEndPoint}</p>
            )}
            <div className="w-1/3">
              {`${idApiToken}${indexEndPoint}` ==
              editableEndPointApiGroupManagement ? (
                <IconButtonCustomOne
                  onClick={() => {
                    setShowBtnSaveApiGroup("");
                    setEditableEndPointApiGroupManagement("");
                  }}
                >
                  <CloseIcon />
                </IconButtonCustomOne>
              ) : (
                <IconButtonCustomOne
                  onClick={() => {
                    setShowBtnSaveApiGroup(idApiToken);
                    setEditableEndPointApiGroupManagement(
                      `${idApiToken}${indexEndPoint}`
                    );
                  }}
                >
                  <EditIcon />
                </IconButtonCustomOne>
              )}

              {`${idApiToken}${indexEndPoint}` !==
                editableEndPointApiGroupManagement && (
                <IconButtonCustomOne
                  onClick={() => setNameEndPointDeleteModal(itemEndPoint)}
                >
                  <DeleteIcon />
                </IconButtonCustomOne>
              )}
            </div>
            <ModalCustomComponent
              classDescription="text-sm"
              onClickCancel={() => setNameEndPointDeleteModal("")}
              handleOpenModalValue={itemEndPoint == nameEndPointDeleteModal}
              titleModal="Remove Endpoint"
              descriptionModal="Are you sure you want to remove this endpoint from this group?"
              nameBtnAccept="Delete"
              nameBtnCancel="Cancel"
              onClickAccept={() =>
                handleOnDeleteEndPointApiGroupManagement(
                  itemEndPoint,
                  idApiToken
                )
              }
            />
          </li>
        ))}
      </ul>
    );
  };
  const showFormToBeAddNewApiGroupEndpoints = (
    idApiToken: string,
    itemEndpoints: string[]
  ) => {
    const initialState: IFormApiGroupManagementCreateEndpoints = {
      endpoints: "",
    };
    return (
      <>
        {idApiToken !== idApiTokenContainerCreateEndpoint && (
          <div className="w-full flex justify-end p-5">
            {handleButtonSaveOrAddNewEndPoint(idApiToken,itemEndpoints)}
          </div>
        )}
        {idApiToken == idApiTokenContainerCreateEndpoint && (
          <Formik
            enableReinitialize={true}
            validateOnMount
            initialValues={initialState}
            validationSchema={
              FormConfigApiGroupsManagementCreateEndpointsSchema
            }
            onSubmit={async ({ endpoints }, { setSubmitting }) => {
              try {
                dispatch(setShowFullPage({ active: true }));
                itemEndpoints.push(endpoints);
                await (
                  await ApiService()
                    .apiGroupsManagement()
                    .updateApiGroupManagement(idApiToken, {
                      endpoints: itemEndpoints,
                    })
                ).data;
                await automaticLoadTableData({
                  filterValue: "",
                  page: 0,
                  pageSize: 0,
                  sortingValue: "",
                });
              } catch (error) {
                return error;
              }
              setIdApiTokenContainerCreateEndpoint("");
              dispatch(setShowFullPage({ active: false }));
              setSubmitting(false);
            }}
          >
            {({ handleChange, handleSubmit, isSubmitting, isValid, dirty }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-row w-full  items-center my-5"
              >
                <div className="px-4 w-full">
                  <p className="m-0 text-sm py-1 w-full text-nsMineShaft1">
                    New API
                  </p>
                  {handleShowInputSelect(itemEndpoints, "", (e) =>
                    handleChange(e)
                  )}
                </div>
                <div className="w-full flex justify-end px-5">
                  <IconButtonCustomOne
                    sizeBorderRadius="md"
                    type="submit"
                    bgColorCustom="nsTurbo1"
                    colorIconCustom="nsBlack1"
                    sizeHeight="sm"
                    aria-label="Add the api endpoints"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    <AddCircleOutlineOutlinedIcon
                      sx={{ fontSize: fontSize["xl"] }}
                    />
                    <p className="m-0 px-2 text-sm font-semibold">Create</p>
                  </IconButtonCustomOne>
                </div>
              </form>
            )}
          </Formik>
        )}
      </>
    );
  };
  const handleShowCreateNameApiGroupOrEachItemApiGroup = () => {
    if (showContainerBoxCreateNameApiGroup) {
      return (
        <CreateApiGroupBoxComponentCustom
          callbackSuccessCreateName={async () => {
            await automaticLoadTableData({
              filterValue: "",
              page: 0,
              pageSize: 0,
              sortingValue: "",
            });
            setShowContainerBoxCreateNameApiGroup(false);
          }}
        />
      );
    } else {
      return rows.map((item, index) => {
        return (
          <div
            className="bg-nsWhite1 px-8 py-3 rounded-nsBase my-5 border-[1px]  border-solid border-nsSilverChalice2"
            key={index}
          >
            {toolBarItemBox(item.name, item.id)}
            <div className="bg-nsAlabaster1 border border-solid border-nsSilver2 rounded-nsBase my-5">
              {handleCheckHaveEndpoint(item.endpoints, item.id)}
              {showFormToBeAddNewApiGroupEndpoints(item.id, item.endpoints)}
            </div>
          </div>
        );
      });
    }
  };
  const handleShowOrCloseApiGroupCreateBox = () => {
    return (
      showContainerBoxCreateNameApiGroup && (
        <IconButtonCustomOne
          onClick={() => setShowContainerBoxCreateNameApiGroup(false)}
          colorIconCustom="nsWhite1"
          bgColorCustom="nsSin1"
          aria-label="Close Create Api Group Management"
        >
          <CloseIcon />
        </IconButtonCustomOne>
      )
    );
  };
  const handleOnChangeEditNameApiGroupManagement = (
    value: string,
    idApiToken: string
  ) => {
    const newRows = rows.map((item) => {
      if (item.id == idApiToken) {
        return {
          ...item,
          name: value,
        };
      } else {
        return item;
      }
    });
    setRows(newRows);
  };
  const handleOnChangeEditEndPointApiGroupManagement = (
    value: string,
    endPointSpecial: string,
    idApiToken: string
  ) => {
    const newRows = rows.map((item) => {
      if (item.id == idApiToken) {
        return {
          ...item,
          endpoints: item.endpoints.map((item) =>
            item == endPointSpecial ? (item = value) : item
          ),
        };
      } else {
        return item;
      }
    });
    setRows(newRows);
  };
  const handleUpdateSpecialApiGroupManagement = async (
    idApiToken: string,
    rowArg: IConfigApiGroupsManagementResult[]
  ) => {
    const tempRow = rows;
    const findApiGroupToSave = rowArg.find((item) => item.id == idApiToken);
    try {
      dispatch(setShowFullPage({ active: true }));
      await (
        await ApiService()
          .apiGroupsManagement()
          .updateApiGroupManagement(idApiToken, {
            ...findApiGroupToSave,
          })
      ).data;
      await automaticLoadTableData({
        filterValue: "",
        page: 0,
        pageSize: 0,
        sortingValue: "",
      });
    } catch (error) {
      setRows(tempRow);
      return error;
    }
    setEditableNameApiGroupManagement("");
    setEditableEndPointApiGroupManagement("");
    setShowBtnSaveApiGroup("");
    dispatch(setShowFullPage({ active: false }));
  };
  const handleOnDeleteEndPointApiGroupManagement = (
    endPointSpecial: string,
    idApiToken: string
  ) => {
    const newRows = rows.map((item) => {
      if (item.id == idApiToken) {
        return {
          ...item,
          endpoints: item.endpoints.filter((item) => item !== endPointSpecial),
        };
      } else {
        return item;
      }
    });
    setRows(newRows);
    setNameEndPointDeleteModal("");
    handleUpdateSpecialApiGroupManagement(idApiToken, newRows);
  };
  const handleShowInputSelect = (
    allEndPoint: Array<string>,
    defValue: string,
    onChange: (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void
  ) => {
    return (
      <InputCustomOne
        colorInputCustom="nsBlack1"
        borderRadiusCustom="md"
        bgColorCustom="nsAlabaster1"
        fontSizeCustom="sm"
        fieldsetBorderColorCustom="nsGray4"
        placeholderColorCustom="nsGray4"
        focusedPlaceholderColorCustom="nsGray4"
        muiFocusedShadowCustom="nsOne"
        fullWidth
        select
        SelectProps={{ MenuProps: { disableScrollLock: true } }}
        type="text"
        name="endpoints"
        onChange={onChange}
        className="select-all"
        value={selectInputsValue.find((item)=> item == defValue)}
      >
        {handleToCleanValueSelectInputList(allEndPoint,defValue).data.map((item, index) => {
          return (
            <MenuItem key={index} value={item as string}>
              {item}
            </MenuItem>
          );
        })}
      </InputCustomOne>
    );
  };
  const handleToCleanValueSelectInputList = (allEndPoint: Array<string>,defValue:string) => {
    const list1 = selectInputsValue;
    const list2 = allEndPoint;
    const selectedItems = new Set(list2);
    const list = list1.filter((item) => !selectedItems.has(item));
    const defTempValueOne = selectInputsValue.find((item) => item == defValue) 
    const defTempValueFinlay = defTempValueOne ? defTempValueOne : defValue
    return {
      data:list.length >= 1 ? list : [defTempValueFinlay],
      showComponent:list.length >= 1 ? true : false,
    }
  };
  const handleButtonSaveOrAddNewEndPoint = (idApiToken: string,allEndPoint:Array<string>) => {
    // Save And Update
    if (showBtnSaveApiGroup == idApiToken) {
      return handleLoadComponentStaticYellow(
        () => handleUpdateSpecialApiGroupManagement(idApiToken, rows),
        "Save"
      );
    } else {
      // Add New EndPoint Special
      return handleToCleanValueSelectInputList(allEndPoint,"").showComponent ? handleLoadComponentStaticYellow(
        () => setIdApiTokenContainerCreateEndpoint(idApiToken),
        "New Endpoint"
      ) : <></>;
    }
  };
  const handleLoadComponentStaticYellow = (
    onClick: () => void,
    nameBtn: string
  ) => {
    return (
      <IconButtonCustomOne
        onClick={onClick}
        sizeBorderRadius="md"
        bgColorCustom="nsTurbo1"
        colorIconCustom="nsBlack1"
        sizeHeight="sm"
        aria-label="Add the api for group"
      >
        <AddCircleOutlineOutlinedIcon sx={{ fontSize: fontSize["xl"] }} />
        <p className="m-0 px-2 text-sm font-semibold">{nameBtn}</p>
      </IconButtonCustomOne>
    );
  };
  return (
    <div className="py-5 relative">
      {handleShowOrCloseApiGroupCreateBox()}
      {handleShowCreateNameApiGroupOrEachItemApiGroup()}
      <div className="fixed right-5 bottom-5">
        <IconButtonCustomOne
          onClick={() => setShowContainerBoxCreateNameApiGroup(true)}
          sizeBorderRadius="md"
          bgColorCustom="nsTurbo1"
          colorIconCustom="nsBlack1"
          sizeHeight="md"
          aria-label="Create New Api Group"
          disabled={showContainerBoxCreateNameApiGroup}
        >
          <p className="m-0 px-2 text-sm font-semibold">Create New Api Group</p>
        </IconButtonCustomOne>
      </div>
    </div>
  );
};

export default CApiGroupsManagementComponent;
