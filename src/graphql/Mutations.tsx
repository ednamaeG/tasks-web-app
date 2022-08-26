import { gql } from "@apollo/client";
export const CREATE_TASK = gql`
  mutation createTask(
    $note: String!
    $user_id: String!
    
  ) {
    createTask(
      note: $note
      user_id: $user_id 
    ) {
        id
        note
        date_created
        user_id
    }
  }
`;


export const DELETE_TASK = gql`
  mutation deleteTask(
    $id: String!
  ) {
    deleteTask(
       id: $id 
    )  
  }
`;


// AUTHå
// export const LOGIN = gql`
//     mutation login(
//     $email: String!
//     $password: String!
//     ) {
//         login(
//             email: $email
//             password: password 
//         ) {
//             email
//             last_name
//             first_name
//             id
//             message
//         } 
//     }
// `;

export const LOGIN = gql`
  mutation login(
    $email: String!
    $password: String!
    
  ) {
    login(
      email: $email
      password: $password 
    ) {
        id
        email
        last_name
        first_name
        message
    }
  }
`;

export const REGISTER = gql`
  mutation register(
    $email: String!
    $password: String!
    $first_name: String!
    $last_name: String!
  ) {
    register(
      email: $email
      password: $password 
      first_name: $first_name
      last_name: $last_name
    ) {
        id
        email
        last_name
        first_name
        message
    }
  }
`;
