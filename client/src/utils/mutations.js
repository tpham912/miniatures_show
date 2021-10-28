import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($miniatures: [ID]!) {
    addOrder(miniatures: $miniatures) {
      purchaseDate
      miniatures {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
        comments {
        _id
        commentText
      }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($miniatureId: ID!, $commentText: String!) {
    addComment(miniatureId: $miniatureId, commentText: $commentText) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
