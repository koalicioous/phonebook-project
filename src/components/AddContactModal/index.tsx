/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { checkSpecialCharacter } from "@/utils/helper";

type ContactInput = {
  firstName: string;
  lastName: string;
  numbers: string[];
};

const AddContactModal = ({ children }: { children: React.ReactNode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ContactInput>();

  const onSubmit = (data: ContactInput) => {
    console.log(data);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>New Contact</DialogTitle>
          <DialogDescription>
            Insert detail to create new contact
          </DialogDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              css={{
                marginBottom: 16,
              }}
            >
              <fieldset css={fieldset}>
                <label css={label} htmlFor="firstName">
                  First Name
                </label>
                <input
                  css={input}
                  id="firstName"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "First Name is required",
                    validate: {
                      containsSpecialCharacter: (value) =>
                        checkSpecialCharacter(value) ||
                        "First Name cannot contain special character",
                    },
                  })}
                />
              </fieldset>
              {errors.firstName && (
                <span css={errorMessageText}>{errors.firstName.message}</span>
              )}
            </div>
            <div
              css={{
                marginBottom: 16,
              }}
            >
              <fieldset css={fieldset}>
                <label css={label} htmlFor="lastName">
                  Last Name
                </label>
                <input
                  css={input}
                  id="lastName"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                    validate: {
                      containsSpecialCharacter: (value) =>
                        checkSpecialCharacter(value) ||
                        "Last Name cannot contain special character",
                    },
                  })}
                />
              </fieldset>
              {errors.lastName && (
                <span css={errorMessageText}>{errors.lastName.message}</span>
              )}
            </div>
            <DialogTitle>Numbers</DialogTitle>
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <button type="submit" css={saveButton}>
                Save Contact
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button css={iconButton} aria-label="Close">
              ✖
            </button>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddContactModal;

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

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.45);
  position: fixed;
  inset: 0;
  animation: ${overlayShowKeyframes} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const DialogContent = styled(Dialog.Content)`
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

const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const DialogDescription = styled(Dialog.Description)`
  margin-bottom: 20px;
  color: #374151;
  font-size: 15px;
  line-height: 1.5;
`;
const fieldset = css`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 2px;
`;

const label = css`
  font-size: 15px;
  color: ;
  width: 90px;
  text-align: right;
`;

const input = css`
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: #334155;
  box-shadow: 0 0 0 1px #9ca3af;
  height: 35px;
  &focus {
    box-shadow: 0 0 0 2px #6b7280;
  }
`;

const iconButton = css`
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    background-color: #e2e8f0;
  }
  &:focus {
    box-shadow: 0 0 0 2px #64748b;
  }
`;

const saveButton = css`
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #1e293b;
  font-size: 14px;
  font-weight: 600;
  color: #f8fafc;
  cursor: pointer;
  &:hover {
    background-color: #0f172a;
  }
`;

const errorMessageText = css`
  color: #b91c1c;
  font-size: 12px;
  margin-left: 112px;
`;
