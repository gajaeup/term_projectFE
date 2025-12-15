import React from 'react';
import '../styles/joinModal.css'; // 모달 스타일을 위한 CSS 파일 (아래에서 설명)

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // isOpen이 false면 아무것도 렌더링하지 않음

    return (
        <div className="modal-overlay" onClick={onClose}> {/* 오버레이 클릭 시 닫기 */}
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children} 
            </div>
        </div>
    );
};

export default Modal;