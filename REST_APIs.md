# REST API Endpoints

## 1. User Registration

- **Endpoint**: `POST /user/register`
- **Request Body**:
    ```json
    {
        "nickname": "example_nickname",
        "password": "user_password"
    }
    ```
- **Response**:
    - `201 Created` on successful registration
    - `400 Bad Request` if validation fails or user already exists

## 2. User Login

- **Endpoint**: `POST /user/login`
- **Request Body**:
    ```json
    {
        "nickname": "example_nickname",
        "password": "user_password"
    }
    ```
- **Response**:
    - `200 OK` with a token on successful login
    - `401 Unauthorized` if login credentials are invalid

## 3. Add Sleep Changes

- **Endpoint**: `POST /user/addsleepchanges`
- **Request Body**:
    ```json
    {
        "id": "user_id",
        "changes": ["Change 1", "Change 2", ...]
    }
    ```
- **Parameters**:
    - `id` (required): The unique identifier for the user.
    - `changes` (required): The changes as a result of sleeping well.
- **Headers**:
    - `Content-Type: application/json`
    - `authorization: Bearer <token>`
- **Response**:
    - `200 OK` on successful login
    - `401 Unauthorized` if user is not logged in

## 4. Add Struggle Duration with Sleep

- **Endpoint**: `POST /user/addsleepstruggle`
- **Request Body**:
    ```json
    {
        "id": "user_id",
        "struggle": "Less than two weeks" | "2 to 8 weeks" | "More than 8 weeks"
    }
    ```
- **Parameters**:
    - `id` (required): The unique identifier for the user.
    - `struggle` (required): Duration for which the user is struggling with sleep.
- **Headers**:
    - `Content-Type: application/json`
    - `authorization: Bearer <token>`
- **Response**:
    - `200 OK` on successful login
    - `401 Unauthorized` if user is not logged in

## 5. Add User Sleep Time

- **Endpoint**: `POST /user/addbedtime`
- **Request Body**:
    ```json
    {
        "id": "user_id",
        "sleepTime": "sleep_time"
    }
    ```
- **Parameters**:
    - `id` (required): The unique identifier for the user.
    - `sleepTime` (required): The time at which the user sleeps.
- **Headers**:
    - `Content-Type: application/json`
    - `authorization: Bearer <token>`
- **Response**:
    - `200 OK` on successful login
    - `401 Unauthorized` if user is not logged in

## 6. Add User Wake Up Time

- **Endpoint**: `POST /user/addwakeuptime`
- **Request Body**:
    ```json
    {
        "id": "user_id",
        "wakeupTime": "wakeup_time"
    }
    ```
- **Parameters**:
    - `id` (required): The unique identifier for the user.
    - `wakeupTime` (required): The time at which the user wakes up.
- **Headers**:
    - `Content-Type: application/json`
    - `authorization: Bearer <token>`
- **Response**:
    - `200 OK` on successful login
    - `401 Unauthorized` if user is not logged in

## 7. Add User Sleep Hours

- **Endpoint**: `POST /user/addsleephours`
- **Request Body**:
    ```json
    {
        "id": "user_id",
        "sleepHours": "sleep_hours"
    }
    ```
- **Parameters**:
    - `id` (required): The unique identifier for the user.
    - `sleepHours` (required): The number of hours the user sleeps.
- **Headers**:
    - `Content-Type: application/json`
    - `authorization: Bearer <token>`
- **Response**:
    - `200 OK` on successful login
    - `401 Unauthorized` if user is not logged in
