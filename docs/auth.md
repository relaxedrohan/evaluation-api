# Authentication and Authorization Overview

This document provides an overview of the authentication and authorization mechanisms implemented in our application. We use JWT (JSON Web Token) for authentication, with tokens set to expire after one hour.

## Initial Setup

### Admin User Creation

As soon as the PostgreSQL server starts up, after creating the necessary tables, we populate one admin user in our `users` table with the following credentials:

-   **Email ID**: admin@admin.com
-   **Password**: admin

## Authentication

### Token Generation

To generate a token, an API endpoint `/generateToken` is provided. This endpoint takes an email ID in the request body and returns a generated JWT token.

#### Endpoint

```
POST /generateToken
```

#### Request Body

```json
{
    "email": "admin@test.com"
}
```

#### Curl Command

```sh
curl --location 'http://localhost:3000/generateToken' --header 'Content-Type: application/json' --data-raw '{
    "email":"admin@test.com"
}'
```

#### Response

```json
{
    "token": "your-jwt-token"
}
```

## Authorization

### Roles and Permissions

-   **Admin**: The admin user has elevated privileges and can:
    -   Request a list of all accounts.
    -   Delete a normal user.
-   **Normal User**: A regular user with standard privileges.

### Endpoints and Access Control

#### Public Endpoints

1. **Create Account**

    - **Endpoint**: `POST /createAccount`
    - **Description**: Allows anyone to create a new account.

#### Protected Endpoints

1. **Get Account**

    - **Endpoint**: `GET /account/:id`
    - **Description**: Allows any user to get their own account details or another user's account details.
    - **Access**: Any authenticated user.

2. **Update Account**

    - **Endpoint**: `PUT /account/:id`
    - **Description**: Allows any user to update their own account details.
    - **Access**: Any authenticated user.

3. **List Accounts**

    - **Endpoint**: `GET /accounts`
    - **Description**: Allows the admin user to request a list of all accounts.
    - **Access**: Admin only.

4. **Delete User**

    - **Endpoint**: `DELETE /account/:id`
    - **Description**: Allows the admin user to delete a normal user.
    - **Access**: Admin only.

## Token Expiry

-   The JWT tokens generated for authentication have an expiry time of one hour. Users need to re-authenticate to obtain a new token after the token expires.

## Conclusion

This authentication and authorization setup ensures that our application is secure and that different users have appropriate access to resources based on their roles. The admin user has the ability to manage other user accounts, while regular users have access to their own account operations. The use of JWT tokens ensures secure and stateless authentication.
