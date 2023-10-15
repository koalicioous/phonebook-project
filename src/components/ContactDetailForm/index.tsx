/** @jsxImportSource @emotion/react */
import useGetContactById from "@/services/contact/hooks/useGetContactById";
import { useParams, useRouter } from "next/navigation";
import LoadingAnimation from "../Spinner";
import { css } from "@emotion/react";
import Link from "next/link";
import {
  CaretLeftIcon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Contact, EditContactInput } from "@/services/contact/types";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import {
  checkSpecialCharacter,
  checkValidNumber,
  contactIsSaved,
  updateSavedContact,
} from "@/utils/helper";
import {
  inputStyle,
  nameTittleStyle,
  numberUpdateButtonStyle,
  saveButtonStyle,
} from "@/styles/SharedCSS";
import { useAtom, useSetAtom } from "jotai";
import {
  addPhoneToContactModalVisible,
  deleteConfirmationModalData,
  deleteConfirmationModalVisible,
  editContactModalDataAtom,
} from "@/services/contact/atom";
import useUpdatePhoneNumber from "@/services/contact/hooks/useUpdatePhoneNumber";
import { ApolloError } from "@apollo/client";
import useUpdateContactMutation from "@/services/contact/hooks/useUpdateContactMutation";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import AddPhoneToContactModal from "../AddPhoneToContactModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const ContactDetailForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditContactInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      numbers: [],
    },
  });
  const [deleteModalVisible, setDeleteModalVisible] = useAtom(
    deleteConfirmationModalVisible
  );
  const setDeleteContactData = useSetAtom(deleteConfirmationModalData);
  const { contact, loading, refetch } = useGetContactById({
    variables: {
      id,
    },
    onError: () => {
      toast.error("Failed to load contact");
      router.push("/");
    },
    onCompleted: ({ contact_by_pk }) => {
      if (contact_by_pk === null) {
        toast.error("Contact not found");
        router.push("/");
      }
    },
    skip: !id,
  });
  const [updateContactData, { loading: loadingUpdateContactData }] =
    useUpdateContactMutation();
  const [updatePhoneNumber, { loading: loadingUpdatePhoneNumber }] =
    useUpdatePhoneNumber();
  const setContactData = useSetAtom(editContactModalDataAtom);

  const setAddNumberModalVisible = useSetAtom(addPhoneToContactModalVisible);

  const { fields, append } = useFieldArray({
    name: "numbers",
    control,
  });

  const handleUpdateSavedContact = (id: number, contact: Contact) => {
    updateSavedContact(id, contact);
  };

  const handleUpdateContactInfo = async (data: EditContactInput) => {
    const submission = new Promise(async (resolve, reject) => {
      try {
        const res = await updateContactData({
          variables: {
            id: contact.id,
            _set: {
              first_name: data.firstName,
              last_name: data.lastName,
            },
          },
        });
        if (res) {
          if (contactIsSaved(contact.id)) {
            handleUpdateSavedContact(contact.id, {
              ...contact,
              firstName: data.firstName,
              lastName: data.lastName,
            });
          }
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
      loading: "Loading",
      success: "The contact is saved!",
      error: (err) => `Failed: ${err}`,
    });
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
              number: contact.phones[index].number,
              contact_id: contact.id,
            },
            new_phone_number: newNumber,
          },
        });
        if (res) {
          if (contactIsSaved(contact.id)) {
            handleUpdateSavedContact(contact.id, {
              ...contact,
              phones: contact.phones.map((item) => {
                if (item.id === contact.phones[index].id) {
                  return {
                    id: item.id,
                    number: newNumber,
                  };
                }
                return item;
              }),
            });
          }
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

  const handleNewNumberAdded = (id: number, number: string) => {
    append({ id, value: number });
    refetch();
    setAddNumberModalVisible(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleContactDeleted = (contact: Contact) => {
    setDeleteModalVisible(false);
    router.push("/");
  };

  useEffect(() => {
    if (contact) {
      setContactData(contact);
      setDeleteContactData(contact);
      setValue("firstName", contact.firstName);
      setValue("lastName", contact.lastName);
      setValue(
        "numbers",
        contact.phones.map((phone) => ({ id: phone.id, value: phone.number }))
      );
    }
  }, [contact, setValue, setContactData, setDeleteContactData]);

  if (loading) return <LoadingAnimation />;

  return (
    <>
      <DeleteConfirmationModal
        open={deleteModalVisible}
        onOpenChange={setDeleteModalVisible}
        onSuccess={handleContactDeleted}
      />
      <AddPhoneToContactModal onNewNumberAdded={handleNewNumberAdded} />
      <div>
        <div
          css={{
            marginBottom: "16px",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            css={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px 8px 0px",
            }}
          >
            <span>
              <CaretLeftIcon />
            </span>
            Contact List
          </Link>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              css={menuButtonStyle}
              onClick={() => {
                setDeleteModalVisible(true);
              }}
            >
              <TrashIcon />
              <span css={menuButtonTextStyle}>Delete</span>
            </button>
            <Link href="/create" css={menuButtonStyle}>
              <PlusCircledIcon />
              <span css={menuButtonTextStyle}>Add New Contact</span>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleUpdateContactInfo)}>
          <div>
            <div css={{ marginBottom: "8px" }}>
              <div css={nameTittleStyle}>First Name</div>
              <input
                css={inputStyle}
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
              {errors.firstName && (
                <span css={errorMessageText}>{errors.firstName.message}</span>
              )}
            </div>
            <div css={{ marginBottom: "8px" }}>
              <div css={nameTittleStyle}>Last Name</div>
              <input
                css={inputStyle}
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
              {errors.lastName && (
                <span css={errorMessageText}>{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div
            css={{
              marginBottom: "16px",
              marginTop: "16px",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "16px",
            }}
          >
            <button
              css={css`
                ${saveButtonStyle};
                width: 100%;
              `}
            >
              {loadingUpdateContactData ? "Loading.." : "Update Contact"}
            </button>
          </div>
        </form>
        <div>
          <div
            css={css`
              ${nameTittleStyle};
              ${phoneNumbersHeading};
            `}
          >
            Phone Numbers
          </div>
          <div css={numbersWrapperStyle}>
            <div
              css={{
                marginTop: "16px",
              }}
            >
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
                              css={inputStyle}
                              placeholder="Contact's Number"
                              {...field}
                            />
                            <button
                              css={numberUpdateButtonStyle}
                              onClick={() => {
                                handleEditPhoneNumber(index, field.value);
                              }}
                              disabled={loadingUpdatePhoneNumber}
                            >
                              UPDATE
                            </button>
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
        </div>
      </div>
    </>
  );
};

const menuButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const menuButtonTextStyle = css`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const numberErrorMessageText = css`
  color: #b91c1c;
  font-size: 12px;
`;

const numbersWrapperStyle = css`
  padding-left: 2px;
  max-height: 270px;
  overflow-y: auto;
  @media (min-width: 768px) {
    max-height: 420px;
  }
`;

const errorMessageText = css`
  color: #b91c1c;
  font-size: 12px;
`;

const phoneNumbersHeading = css`
  margin-bottom: 4px !important;
  @media (min-width: 768px) {
    margin-bottom: -8px !important;
  }
`;

export default ContactDetailForm;
