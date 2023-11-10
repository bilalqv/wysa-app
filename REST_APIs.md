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
    - `200 Created` on successful registration
        - Response Body
            ```json
            {
                "success": 1,
                "id": 123,
                "nickname": "user nickname",
                "message": "user created successfully",
            }
            ```
    - `400 Bad Request` if validation fails or user already exists
        - Response Body
            ```json
            {
                "success": 0,
                "message": "Error message"
            }
            ```
    - `409 Conflict` if user already exists
        - Response Body
            ```json
                {
                    "success": 0,
                    "message": "Error message"
                }
            ```

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
        - Response Body
            ```json
            {
                "success": 1,
                "token": "jwt auth token",
                "id": "user id",
                "nickname": "user nickname",
                "message": "Logged in successfully",
            }
            ```
    - `401 Unauthorized` if login credentials are invalid or nickname does not exist
        - Response Body
            ```json
            {
                "success": 0,
                "message": "error message",
            }
            ```

## 3. Add Sleep Changes

- **Endpoint**: `POST /user/addsleepchanges`
- **Request Body**:
    ```json
    {
        "id": "user_id",
        "changes": ["Change 1", "Change 2"]
    }
    ```
- **Parameters**:
    - `id` (required): The unique identifier for the user.
    - `changes` (required): The changes as a result of sleeping well. It is an array of changes.
- **Headers**:
    - `Content-Type: application/json`
    - `authorization: Bearer <token>`
- **Response**:
    - `200 OK` on successfully adding the changes.
        - Response Body:
            ```json
            {
                "success": 1,
                "message": "Changes added successfully"
            }
            ```
    - `404 Not Found` if the user corresponding to the id is not found
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "User not found",
            }
            ```
    - `500 Server Error` if some error occurs on the server side
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "error message",
            }
            ```
    - `401 Unauthorized` if user is not logged in
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "Unauthorized"
            }
            ```

## 4. Add Struggle Duration with Sleep

- **Endpoint**: `POST /user/addsleepstruggle`
- **Request Body**:
    ```json
    {
        "id": "user_id",
        "struggle": "Less than 2 weeks | 2 to 8 weeks | More than 8 weeks"
    }
    ```
- **Parameters**:
    - `id` (required): The unique identifier for the user.
    - `struggle` (required): Duration for which the user is struggling with sleep.
- **Headers**:
    - `Content-Type: application/json`
    - `authorization: Bearer <token>`
- **Response**:
    - `200 OK` on successfully adding the sleep struggle duration.
        - Response Body:
            ```json
            {
                "success": 1,
                "message": "Changes added successfully"
            }
            ```
    - `404 Not Found` if the user corresponding to the id is not found
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "User not found",
            }
            ```
    - `500 Server Error` if some error occurs on the server side
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "error message",
            }
            ```
    - `401 Unauthorized` if user is not logged in
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "Unauthorized"
            }
            ```

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
    - `200 OK` on successfully adding the bed sleeping time.
        - Response Body:
            ```json
            {
                "success": 1,
                "message": "Changes added successfully"
            }
            ```
    - `404 Not Found` if the user corresponding to the id is not found
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "User not found",
            }
            ```
    - `500 Server Error` if some error occurs on the server side
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "error message",
            }
            ```
    - `401 Unauthorized` if user is not logged in
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "Unauthorized"
            }
            ```

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
    - `200 OK` on successfully adding the time at which user wakes up.
        - Response Body:
            ```json
            {
                "success": 1,
                "message": "Changes added successfully"
            }
            ```
    - `404 Not Found` if the user corresponding to the id is not found
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "User not found",
            }
            ```
    - `500 Server Error` if some error occurs on the server side
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "error message",
            }
            ```
    - `401 Unauthorized` if user is not logged in
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "Unauthorized"
            }
            ```

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
    - `200 OK` on successfully adding the sleep duration in hours.
        - Response Body:
            ```json
            {
                "success": 1,
                "message": "Changes added successfully"
            }
            ```
    - `404 Not Found` if the user corresponding to the id is not found
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "User not found",
            }
            ```
    - `500 Server Error` if some error occurs on the server side
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "error message",
            }
            ```
    - `401 Unauthorized` if user is not logged in
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "Unauthorized"
            }
            ```

## 8. Get User's Sleep Score

- **Endpoint**: `GET /user/getsleepscore`
- **Request Body**:
    ```json
    {
        "id": "user_id",
    }
    ```
- **Parameters**:
    - `id` (required): The unique identifier for the user.
- **Headers**:
    - `Content-Type: application/json`
    - `authorization: Bearer <token>`
- **Response**:
    - `200 OK` on successfully getting the sleep score.
        - Response Body:
            ```json
            {
                "success": 1,
                "sleepScore": "sleep_score"
            }
            ```
    - `404 Not Found` if the user corresponding to the id is not found
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "User not found",
            }
            ```
    - `500 Server Error` if some error occurs on the server side
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "error message",
            }
            ```
    - `401 Unauthorized` if user is not logged in
        - Response Body:
            ```json
            {
                "success": 0,
                "message": "Unauthorized"
            }
            ```