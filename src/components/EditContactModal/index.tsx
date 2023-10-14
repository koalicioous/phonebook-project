/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

import * as Dialog from "@radix-ui/react-dialog";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  checkSpecialCharacter,
  checkValidNumber,
  formatAddContactPayload,
} from "@/utils/helper";
import ConditionalRender from "../ConditionalRender";
import useCreateContactMutation from "@/services/contact/hooks/useCreateContactMutation";
import { useAtom, useSetAtom } from "jotai";
import {
  addPhoneToContactModalVisible,
  editContactModalDataAtom,
  editContactModalVisible,
} from "@/services/contact/atom";
import { toast } from "react-hot-toast";
import { ContactInput } from "@/services/contact/types";
import { ApolloError, gql } from "@apollo/client";
import { useEffect } from "react";
import AddPhoneToContactModal from "../AddPhoneToContactModal";
import useUpdatePhoneNumber from "@/services/contact/hooks/useUpdatePhoneNumber";
import { cache } from "@/lib/ApolloClient";
import { contactToRawFormat } from "@/utils/formatter";

type EditContactInput = Omit<ContactInput, "numbers"> & {
  numbers: {
    id?: number;
    value: string;
  }[];
};

const EditContactModal = () => {
  const [editContactVisible, setEditContactModalVisible] = useAtom(
    editContactModalVisible
  );
  const setAddNumberModalVisible = useSetAtom(addPhoneToContactModalVisible);
  const [contactData, setContactData] = useAtom(editContactModalDataAtom);

  const { createContact, loading } = useCreateContactMutation({
    onCompleted: () => {
      reset();
      setEditContactModalVisible(false);
    },
  });

  const [updatePhoneNumber, { loading: loadingUpdatePhoneNumber }] =
    useUpdatePhoneNumber();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EditContactInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      numbers: [],
    },
  });

  const { fields } = useFieldArray({
    name: "numbers",
    control,
  });

  useEffect(() => {
    if (!editContactVisible) {
      reset();
    }
    if (editContactVisible) {
      setValue("firstName", contactData?.firstName);
      setValue("lastName", contactData?.lastName);
      setValue(
        "numbers",
        contactData?.phones?.map((item) => {
          return {
            id: item.id,
            value: item.number,
          };
        })
      );
    }
  }, [editContactVisible, contactData, setValue, reset]);

  const handleNewNumberAdded = (id: number, number: string) => {
    const contactCacheId = cache.identify(contactToRawFormat(contactData));
    cache.modify({
      id: contactCacheId,
      fields: {
        phones(existingPhones = []) {
          const newPhoneRef = cache.writeFragment({
            data: {
              __typename: "phone",
              id,
              number,
            },
            fragment: gql`
              fragment NewPhone on Query {
                id
                number
              }
            `,
          });
          return [...existingPhones, newPhoneRef];
        },
      },
    });
    setContactData((prev) => {
      return {
        ...prev,
        phones: [
          ...prev.phones,
          {
            id,
            number,
          },
        ],
      };
    });
    setAddNumberModalVisible(false);
  };

  const handleEditPhoneNumber = async (index: number, newNumber: string) => {
    if (!checkValidNumber(newNumber)) {
      toast.error("Invalid number format");
      return;
    }
    const submission = new Promise(async (resolve, reject) => {
      try {
        const res = await updatePhoneNumber({
          variables: {
            pk_columns: {
              number: contactData.phones[index].number,
              contact_id: contactData.id,
            },
            new_phone_number: newNumber,
          },
        });
        if (res) {
          setContactData((prev) => {
            const newPhones = prev.phones.map((item, idx) => {
              if (idx === index) {
                return {
                  id: item.id,
                  number: newNumber,
                };
              }
              return item;
            });
            return {
              ...prev,
              phones: newPhones,
            };
          });
        }
        resolve(res);
      } catch (err) {
        if (err instanceof ApolloError) {
          const errorMessage = err.message;
          reject(errorMessage);
        } else {
          reject("Failed to save contact");
        }
      }
    });
    toast.promise(submission, {
      loading: "Updating Number",
      success: "The number is updated!",
      error: (err) => `Failed: ${err}`,
    });
  };

  const handleSubmitEditContact = async (data: ContactInput) => {
    // Logic check if previously existing phone number is edited
    const updatedNumbers =
      contactData.phones.length === 0
        ? []
        : contactData.phones.map((oldNumber, idx) => {
            if (oldNumber.number !== data.numbers[idx].value) {
              return {
                id: oldNumber.id,
                number: data.numbers[idx].value,
              };
            }
          });
    if (updatedNumbers.length > 0) {
    }

    return;
    const submission = new Promise(async (resolve, reject) => {
      try {
        const res = await createContact({
          variables: {
            ...formatAddContactPayload(data),
          },
        });
        resolve(res);
      } catch (err) {
        if (err instanceof ApolloError) {
          const errorMessage = err.message;
          reject(errorMessage);
        } else {
          reject("Failed to save contact");
        }
      }
    });
    toast.promise(submission, {
      loading: "Loading",
      success: "The contact is saved!",
      error: (err) => `Failed: ${err}`,
    });
  };

  return (
    <Dialog.Root
      open={editContactVisible}
      onOpenChange={setEditContactModalVisible}
    >
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <AddPhoneToContactModal onNewNumberAdded={handleNewNumberAdded} />
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>
            Insert detail to create new contact
          </DialogDescription>
          <form onSubmit={handleSubmit(handleSubmitEditContact)}>
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
            <DialogTitle>Existing Numbers</DialogTitle>
            <div>
              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    css={{
                      marginBottom: "12px",
                    }}
                  >
                    <Controller
                      control={control}
                      name={`numbers.${index}.value`}
                      defaultValue={field.value}
                      rules={{
                        required: "Contact's Number is required",
                        validate: {
                          validNumber: (value) =>
                            checkValidNumber(value) ||
                            "Contact's Number must be a number",
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <div
                            css={{
                              display: "flex",
                              gap: "8px",
                            }}
                          >
                            <input
                              css={input}
                              placeholder="Contact's Number"
                              {...field}
                            />
                            <ConditionalRender
                              condition={
                                index < contactData.phones.length &&
                                !!contactData.phones[index].id
                              }
                            >
                              <button
                                css={updateButton}
                                onClick={() => {
                                  handleEditPhoneNumber(index, field.value);
                                }}
                                disabled={loadingUpdatePhoneNumber}
                              >
                                UPDATE
                              </button>
                            </ConditionalRender>
                          </div>
                          {errors?.numbers?.[index]?.value && (
                            <span css={numberErrorMessageText}>
                              {errors?.numbers?.[index]?.value?.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              css={{
                fontSize: "12px",
                backgroundColor: "#f1f5f9",
                padding: "8px 8px",
                width: "100%",
                borderRadius: "8px",
                marginTop: 8,
              }}
              onClick={() => setAddNumberModalVisible(true)}
            >
              Add Number
            </button>
            <div
              style={{
                display: "flex",
                marginTop: 32,
                justifyContent: "flex-end",
              }}
            >
              <button type="submit" css={saveButton} disabled={loading}>
                {loading ? "Loading..." : "Update Contact"}
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

export default EditContactModal;

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

const numberErrorMessageText = css`
  color: #b91c1c;
  font-size: 12px;
`;

const updateButton = css`
  border: none;
  padding: 8px 8px;
  border-radius: 8px;
  background-color: #e2e8f0;
  font-size: 10px;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  &:hover {
    background-color: #cbd5e1;
  }
`;
