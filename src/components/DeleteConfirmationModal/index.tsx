/** @jsxImportSource @emotion/react */

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

const contentShowKeyframes = keyframes`
from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const overlayShowKeyframes = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const Overlay = styled(AlertDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  inset: 0;
  animation: ${overlayShowKeyframes} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const AlertDialogContent = styled(AlertDialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShowKeyframes} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const AlertDialogTitle = styled(AlertDialog.Title)`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const AlertDialogDescription = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  color: #374151;
  font-size: 15px;
  line-height: 1.5;
`;

const cancelButtonStyle = css`
  border: none;
  background-color: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const confirmDeleteButtonStyle = css`
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #fee2e2;
  font-size: 14px;
  font-weight: 600;
  color: #b91c1c;
  cursor: pointer;
  &:hover {
    background-color: #fecaca;
  }
`;

const DeleteConfirmationModal = ({
  children,
  open,
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>
        <button className="Button violet">{children}</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <Overlay />
        <AlertDialogContent>
          <AlertDialogTitle>Are you to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            contact you choose to delete
          </AlertDialogDescription>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button css={cancelButtonStyle}>Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button css={confirmDeleteButtonStyle}>
                Yes, delete contact
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteConfirmationModal;
