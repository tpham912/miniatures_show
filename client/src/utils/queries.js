import { gql } from '@apollo/client';

export const QUERY_MINIATURES = gql`
  query getMiniatures($category: ID) {
    miniatures(category: $category) {
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
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($miniatures: [ID]!) {
    checkout(miniatures: $miniatures) {
      session
    }
  }
`;

export const QUERY_ALL_MINIATURES = gql`
  {
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
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        miniatures {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
