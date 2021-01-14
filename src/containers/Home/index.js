import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS, ADD_AUTHOR }from './graphql'

const Home = () => {
  const {data, loading, error} = useQuery(ALL_AUTHORS)
  //const [authors, {data, loading, error, called }] = useLazyQuery(ALL_AUTHORS)
  const [addAuthor, {error: addAuthorError, loading: addAuthorLoading}] = useMutation(ADD_AUTHOR, {  
    variables: {
      input: {
        firstName: "Cst", 
        lastName: "djkl",
        age: 18,
        email: "jdfk@jkd.kdjsf",
        numBooksPublished: 39, 
        addressId: "67d490f0-0477-46bc-ba23-084e37879176"
    },
    update: (client, { data: { addAuthor } }) => {
      try {
        const data = client.readQuery({ query: ALL_AUTHORS })
    
        data.allAuthors = [...data.allAuthors, addAuthor]
    
        client.writeQuery({ query: ALL_AUTHORS, data })
      } catch (error) {
        console.log(error)
      }
    }
    
    },
    refetchQueries: () => [{ query: ALL_AUTHORS }],
  })

  if (addAuthorError) {
    return <p>there was an error!</p>
  }

  if (error) {
    console.log(error)
    return <p>there was an error!</p>
  }

  return (
    <>
      <button type='button' onClick={addAuthor}>ADD AUTHOR</button>
      {addAuthorLoading || loading ? 'loading...' : data.allAuthors.map(author => (
        <p>
          {' '}{author.firstName}{' '}{author.lastName}
        </p>
      ))}
    </>
  )
}


export default Home
