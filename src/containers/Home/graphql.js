import gql from 'graphql-tag'

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      firstName,
      lastName,
      age,
      email,
      numBooksPublished,
      addressId
    }
  }
`
export const ADD_AUTHOR = gql`
  mutation addAuthor($input: newAuthor) {
    addAuthor (input: $input) {
      firstName, 
      lastName,
      age,
      email,
      numBooksPublished, 
      addressId
    }
}
`