import { OffsetPaging, IdFilterComparison, CreateOneCompanyInput, Industry, TaskFilter, TaskSort, TaskStageFilter, TaskStageSort, UpdateOneTaskInput } from './../../graphql/schema.types';
import gql from "graphql-tag";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateOneUserInput!) {
    updateOneUser(input: $input) {
      id
      name
      avatarUrl
      email
      phone
      jobTitle
    }
  }
`;

export const COMPANIES_LIST_QUERY = gql`
query CompaniesList(
  $filter: CompanyFilter!
  $sorting: [CompanySort!]
  $paging: OffsetPaging!
) {
  companies(filter: $filter, sorting: $sorting, paging: $paging) {
    totalCount 
    nodes {
      id 
      name 
      avatarUrl 
      # Get the sum of all deals in this company
     dealsAggregate {
       sum {
        value
       }
     } 
    }
  }
}
`

export const CREATE_COMPANY_MUTATION = gql`
mutation CreateCompany($input: CreateOneCompanyInput!) {
  createOneCompany(input: $input) {
    id
    salesOwner {
      id
    }
  }
}
`;

export const USERS_SELECT_QUERY = gql`
 query UsersSelect(
  $filter: UserFilter!
  $sorting: [UserSort!]
  $paging: OffsetPaging!
 ) {
  # Get all users 
  users(filter: $filter, sorting: $sorting, paging: $paging) {
    totalCount 
    nodes {
      id
      name
      avatarUrl
    }
  }
 }
`


export const UPDATE_COMPANY_MUTATION = gql`
  mutation UpdateCompany($input: UpdateOneCompanyInput!) {
    updateOneCompany(input: $input) {
      id
      name
      totalRevenue
      avatarUrl
      industry
      companySize
      businessType
      country
      website
      salesOwner {
        id 
        name 
        avatarUrl
      }   
    }
  }
`;



export const COMPANY_CONTACTS_TABLE_QUERY = gql`
  query CompanyContactsTable(
    $filter: ContactFilter!
    $sorting: [ContactSort!]
    $paging: OffsetPaging!
  ) {
    contacts(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
        jobTitle
        email
        phone
        status
      }
    }
  }
`;


export const TASKS_QUERY = gql`
query Tasks(
  $filter: TaskFilter!
  $sorting: [TaskSort!]
  $paging: OffsetPaging!
) {
  tasks(filter: $filter, sorting: $sorting, paging: $paging) {
    totalCount
    nodes {
      id
      title 
      description 
      dueDate
      completed 
      stageId 
      createdAt 
      updatedAt
      users {
        id 
        name 
        avatarUrl 
      } 
    }
  }
}
`


export const TASKS_STAGES_QUERY = gql`
query TaskStages(
  $filter: TaskStageFilter!
  $sorting: [TaskStageSort!]
  $paging: OffsetPaging!
) {
  taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
    totalCount 
    nodes {
      id 
      title
    }
  }
}
`

export const UPDATE_TASK_STAGE_MUTATION = gql`
mutation UpdateTaskStage($input: UpdateOneTaskInput!) {
  updateOneTask(input: $input) {
    id
  }
}
`;


export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateOneTaskInput!) {
    createOneTask(input: $input) {
      id
      title
      stage {
        id
        title
      }
    }
  }
`;



export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: UpdateOneTaskInput!) {
    updateOneTask(input: $input) {
      id
      title
      completed
      description
      dueDate
      stage {
        id
        title
      }
      users {
        id
        name
        avatarUrl
      }
      checklist {
        title
        checked
      }
    }
  }
`;