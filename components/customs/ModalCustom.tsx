import React from "react";
import { IModalCustom } from "../../interfaces/customs/ICustoms.interface";
import { fontSize } from "../../utils/font_size";
import ButtonCustomOne from "../buttons/ButtonCustomOne";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import { CloseIcon, Modal } from "../mui";
const ModalCustomComponent = ({
  onClickCancel,
  onClickAccept,
  nameBtnCancel,
  nameBtnAccept,
  titleModal,
  descriptionModal,
  handleOpenModalValue = false,
  bgColorBtnAccept = "nsRoman1",
  bgColorBtnCancel = "nsSilverChalice1",
  classDescription = "text-lg font-normal",
  classTitle = "text-xl font-bold",
}: IModalCustom) => {
  return (
    <Modal
      open={handleOpenModalValue}
      component="div"
      disableScrollLock={true}
      onClose={() => onClickCancel(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center "
    >
      <div className="bg-nsWhite1 w-[630px] h-[250px] rounded-nsMd  relative">
        <div className=" absolute right-2 top-2">
          <IconButtonCustomOne
            onClick={() => onClickCancel(false)}
            colorIconCustom="nsBlack1"
            aria-label="Close modal"
          >
            <CloseIcon sx={{ fontSize: fontSize["3xl"] }} />
          </IconButtonCustomOne>
        </div>
        <div className="flex h-[inherit] flex-col items-center justify-center p-2">
          <p className={`${classTitle}`}>{titleModal}</p>
          <p className={`${classDescription}`}>{descriptionModal}</p>
          <div className="flex w-full justify-around my-3">
            <ButtonCustomOne
              onClick={() => onClickCancel(false)}
              sizeBorderRadius="base"
              sizeHeight="sm"
              bgColorCustom={bgColorBtnCancel}
              dropShadowCustom="nsOne"
              colorTextCustom="nsWhite1"
              variant="contained"
              type="button"
              size="medium"
              boxShadowCustom="nsTwo"
              className="w-[200px]"
            >
              {nameBtnCancel}
            </ButtonCustomOne>
            <ButtonCustomOne
              onClick={() => onClickAccept(true)}
              sizeBorderRadius="base"
              sizeHeight="sm"
              bgColorCustom={bgColorBtnAccept}
              dropShadowCustom="nsOne"
              boxShadowCustom="nsTwo"
              colorTextCustom="nsWhite1"
              variant="contained"
              type="button"
              size="medium"
              className="w-[200px]"
            >
              {nameBtnAccept}
            </ButtonCustomOne>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCustomComponent;
