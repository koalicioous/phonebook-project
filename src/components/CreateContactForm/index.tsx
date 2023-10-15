/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  checkSpecialCharacter,
  checkValidNumber,
  formatAddContactPayload,
} from "@/utils/helper";
import ConditionalRender from "../ConditionalRender";
import useCreateContactMutation from "@/services/contact/hooks/useCreateContactMutation";
import { toast } from "react-hot-toast";
import { ContactInput } from "@/services/contact/types";
import { ApolloError } from "@apollo/client";
import useGetContactAggregate from "@/services/contact/hooks/useGetContactAggregate";
import {
  inputStyle,
  nameTittleStyle,
  saveButtonStyle,
} from "@/styles/SharedCSS";
import Link from "next/link";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { searchQueryAtom } from "@/services/contact/atom";

const CreateContactForm = () => {
  const router = useRouter();
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const { refetch: refetchCount } = useGetContactAggregate();
  const { createContact, loading } = useCreateContactMutation({
    onCompleted: () => {
      refetchCount();
      setSearchQuery("");
      reset();
      router.push("/");
    },
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    defaultValues: {
      numbers: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "numbers",
    control,
  });

  const onSubmit = async (data: ContactInput) => {
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
        <h1 css={pageHeadingTittleStyle}>Create Contact Form</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div css={nameTittleStyle}>Numbers</div>
        <div css={numberListStyle}>
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
                        <ConditionalRender condition={fields.length > 1}>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            css={{
                              padding: "2px 4px",
                              color: "#64748b",
                            }}
                          >
                            ⓧ
                          </button>
                        </ConditionalRender>
                      </div>
                      {errors?.numbers?.[index]?.value && (
                        <span css={errorMessageText}>
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
          onClick={() => append({ value: "" })}
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
          <button type="submit" css={saveButtonStyle} disabled={loading}>
            {loading ? "Loading..." : "Save Contact"}
          </button>
        </div>
      </form>
    </div>
  );
};

const errorMessageText = css`
  color: #b91c1c;
  font-size: 12px;
`;

const pageHeadingTittleStyle = css`
  font-size: 16x;
  font-weight: 600;
  color: #1e293b;
`;

const numberListStyle = css`
  max-height: 250px;
  overflow-y: auto;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 8px;
  @media (min-width: 768px) {
    max-height: 400px;
  }
`;

export default CreateContactForm;
