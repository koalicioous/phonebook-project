/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { checkValidNumber } from "@/utils/helper";
import { useAtom, useAtomValue } from "jotai";
import {
  addPhoneToContactModalVisible,
  editContactModalDataAtom,
} from "@/services/contact/atom";
import { toast } from "react-hot-toast";
import { ApolloError } from "@apollo/client";
import { useEffect } from "react";
import useAddPhoneToContactMutation from "@/services/contact/hooks/useAddPhoneToContactMutation";

const AddPhoneToContactModal = ({
  onNewNumberAdded,
}: {
  // eslint-disable-next-line no-unused-vars
  onNewNumberAdded: (id: number, number: string) => void;
}) => {
  const [modalVisible, setModalVisible] = useAtom(
    addPhoneToContactModalVisible
  );
  const contactData = useAtomValue(editContactModalDataAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    number: string;
  }>({
    defaultValues: {
      number: "",
    },
  });

  const [addPhoneToContact, { loading }] = useAddPhoneToContactMutation({
    onCompleted: (data) => {
      const { id, number } = data.insert_phone.returning[0];
      reset();
      onNewNumberAdded(id, number);
    },
  });

  useEffect(() => {
    reset();
  }, [modalVisible, reset]);

  const onSubmit = async (data: { number: string }) => {
    const submission = new Promise(async (resolve, reject) => {
      try {
        const res = await addPhoneToContact({
          variables: {
            contact_id: contactData.id,
            phone_number: data.number,
          },
        });
        resolve(res);
      } catch (err) {
        if (err instanceof ApolloError) {
          const errorMessage = err.message;
          reject(errorMessage);
        } else {
          console.log(err);
          reject("Failed to add number");
        }
      }
    });
    toast.promise(submission, {
      loading: "Loading",
      success: "The number is added!",
      error: (err) => `Failed: ${err}`,
    });
  };

  return (
    <Dialog.Root open={modalVisible} onOpenChange={setModalVisible}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Add New Phone Number</DialogTitle>
          <DialogDescription>
            Add new phone number to {contactData?.firstName ?? "This Contact"}
          </DialogDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              css={{
                marginBottom: 16,
              }}
            >
              <fieldset css={fieldset}>
                <input
                  css={input}
                  id="number"
                  placeholder="New Number"
                  {...register("number", {
                    required: "Number is required",
                    validate: {
                      validNumber: (value) =>
                        checkValidNumber(value) ||
                        "Contact's Number must be a number",
                    },
                  })}
                />
              </fieldset>
              {errors.number && (
                <span css={errorMessageText}>{errors.number.message}</span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 32,
                justifyContent: "flex-end",
              }}
            >
              <button type="submit" css={saveButton} disabled={loading}>
                {loading ? "Loading..." : "Insert Phone"}
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

export default AddPhoneToContactModal;

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
  max-height: 85dvh;
  padding: 25px;
  overflow: auto;
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
`;
