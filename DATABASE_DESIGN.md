# MongoDB Database Design - User Schema

## User Collection

### Fields:

1. **_id**: ObjectId (Automatically generated unique identifier)
2. **nickname**: String
    - Required, min length: 3, max length: 20
    - Unique: true
    - User's chosen nickname for identification
3. **password**: String
    - Required
    - User's password (stored securely, hashed and salted)
4. **sleepChanges**: Array of Strings
    - Array containing changes the user experiences related to sleep
5. **sleepStruggleDuration**: String
    - Duration or details of the user's struggles with sleep
6. **sleepBedTime**: String
    - Time at which the user goes to sleep
7. **sleepWakeUpTime**: String
    - Time at which the user wakes up
8. **sleepHours**: Number
    - Number of hours the user sleeps
9. **sleepScore**: Number
    - User's sleep score (if applicable)
10. **createdDate**: Date
    - Default value: Current date and time when the user record is created

### Indexes:
- **nickname**: Unique Index to enforce uniqueness on the nickname field for faster queries

### Collection Methods:
- No additional custom methods specified

### Relationships:
- No defined relationships with other collections specified

### Sample Document:
```json
{
  "_id": ObjectId("..."),
  "nickname": "user123",
  "password": "hashedpassword",
  "sleepChanges": ["Waking up frequently", "Difficulty falling asleep"],
  "sleepStruggleDuration": "3 months",
  "sleepBedTime": "22:00",
  "sleepWakeUpTime": "06:30",
  "sleepHours": 7,
  "sleepScore": 75,
  "createdDate": "2023-11-08T08:30:00.000Z"
}