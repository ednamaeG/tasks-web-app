import { gql } from "@apollo/client";

export const GET_USER_TASKS = gql`
    query userTasks($user_id : String!) {
        userTasks(user_id: $user_id) {
            id
            note
            user_id
            date_created
        }
    }
`;

export const GET_TASK = gql`
    query getTask($id : String!) {
        getTask(id: $id) {
            id
            note
            user_id
            date_created
        }
    }
`;