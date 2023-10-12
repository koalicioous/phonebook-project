/** @jsxImportSource @emotion/react */

import { Contact } from "@/services/contact/types";
import { css } from "@emotion/react";
import ConditionalRender from "../ConditionalRender";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  deleteConfirmationModalData,
  deleteConfirmationModalVisible,
} from "@/services/contact/atom";

type ContactListItemProps = {
  contact: Contact;
};

const ContactNameFallback = ({ text }: { text: string }) => {
  return <span css={contactFallbackTextStyle}>{`Contact has no ${text}`}</span>;
};

const ContactListItem = ({ contact }: ContactListItemProps) => {
  const { firstName, lastName, phones } = contact;
  const hasPhoneNumber = phones?.length > 0;
  const setDeleteModalOpen = useSetAtom(deleteConfirmationModalVisible);
  const setDeleteModalData = useSetAtom(deleteConfirmationModalData);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    setDeleteModalData({
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
    });
  };

  return (
    <div css={contactListItemStyle}>
      <div>
        <div css={nameWrapperStyle}>
          <ConditionalRender condition={!!firstName}>
            <span>{firstName}</span>
          </ConditionalRender>
          <ConditionalRender condition={!!lastName}>
            <span>{lastName}</span>
          </ConditionalRender>
          <ConditionalRender condition={!firstName && !lastName}>
            <ContactNameFallback text="name" />
          </ConditionalRender>
        </div>
        <div>
          <div css={phoneNumberWrapper}>
            <ConditionalRender
              condition={!!hasPhoneNumber}
              fallback={<ContactNameFallback text="phone number" />}
            >
              {hasPhoneNumber && (
                <span>
                  {phones?.[0].number.length > 17
                    ? `${phones?.[0].number.substring(0, 17)}...`
                    : phones?.[0].number}
                </span>
              )}
            </ConditionalRender>
            <ConditionalRender condition={phones?.length > 1}>
              <span css={hasMorePhoneBadgeStyle}>{`+${
                phones?.length - 1
              }`}</span>
            </ConditionalRender>
          </div>
        </div>
      </div>
      <div
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button css={favoriteButton}>☆</button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger css={actionTriggerButton}>
            ≡
          </DropdownMenu.Trigger>
          <DropdownMenu.Content css={actionContentStyle} align="end">
            <DropdownMenu.Item css={actionContentItemStyle} onSelect={() => {}}>
              Add To Favorite
            </DropdownMenu.Item>
            <DropdownMenu.Item css={actionContentItemStyle} onSelect={() => {}}>
              View Detail
            </DropdownMenu.Item>
            <DropdownMenu.Item css={actionContentItemStyle} onSelect={() => {}}>
              Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item
              css={actionContentItemStyle}
              onSelect={openDeleteModal}
            >
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

const nameWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const contactListItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const contactFallbackTextStyle = css`
  font-size: 12px;
  color: #6b7280;
`;

const phoneNumberWrapper = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const hasMorePhoneBadgeStyle = css`
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 999px;
  background-color: #f3f4f6;
`;

const actionTriggerButton = css`
  border: none;
  font-size: 20px;
  padding: 2px 10px;
  border-radius: 8px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  &:hover {
    background-color: #e5e7eb;
  }
`;

const actionContentStyle = css`
  width: 150px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const actionContentItemStyle = css`
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: #374151;
    background-color: #f3f4f6;
  }
`;

const favoriteButton = css`
  border-radius: 8px;
  width: 40px;
  height: 40px;
  &:hover {
    background-color: #e5e7eb;
  }
`;

export default ContactListItem;
