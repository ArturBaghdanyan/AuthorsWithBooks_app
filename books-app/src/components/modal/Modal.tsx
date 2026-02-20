import React from "react";
import style from "./style.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  text1: string;
  text2: string;
}

const Modal = ({ children, onClose, onConfirm, text1, text2 }: ModalProps) => {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <span className={style.close} onClick={onClose}>
          &times;
        </span>
        {children}
        <div className={style.buttons}>
          <button onClick={onConfirm} className={style.primaryBtn}>
            {text1}
          </button>
          <button onClick={onClose} className={style.secondaryBtn}>
            {text2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
