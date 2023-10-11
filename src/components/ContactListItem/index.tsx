/** @jsxImportSource @emotion/react */

import { Contact } from "@/services/contact/types";
import { css } from "@emotion/react";
import ConditionalRender from "../ConditionalRender";

type ContactListItemProps = {
  contact: Contact;
};

const ContactNameFallback = ({ text }: { text: string }) => {
  return <span css={contactFallbackTextStyle}>{`Contact has no ${text}`}</span>;
};

const ContactListItem = ({ contact }: ContactListItemProps) => {
  const { firstName, lastName, phones } = contact;
  const hasPhoneNumber = phones?.length > 0;
  return (
    <div css={contactListItemStyle}>
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
            <span css={hasMorePhoneBadgeStyle}>{`+${phones?.length - 1}`}</span>
          </ConditionalRender>
        </div>
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

export default ContactListItem;
