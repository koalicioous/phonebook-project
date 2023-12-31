import { gql } from "@apollo/client";

export const GET_CONTACT_LIST = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones(order_by: { created_ad: desc }) {
        id
        number
      }
    }
  }
`;

export const GET_CONTACT_DETAIL = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      id
      created_at
      first_name
      last_name
      phones {
        id
        number
      }
    }
  }
`;

export const GET_PHONE_LIST = gql`
  query GetPhoneList(
    $where: phone_bool_exp
    $distinct_on: [phone_select_column!]
    $limit: Int = 10
    $offset: Int = 0
    $order_by: [phone_order_by!]
  ) {
    phone(
      where: $where
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      number
      contact(order_by: { created_ad: desc }) {
        id
        first_name
        last_name
      }
    }
  }
`;

export const GET_CONTACT_COUNT = gql`
  query contact_aggregate_fields {
    contact_aggregate {
      aggregate {
        count
      }
    }
  }
`;
