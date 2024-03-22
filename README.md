# VocabsFlashCard
**Note: This project is under significant development.**


This is flashcard based vocabulary learning web application. The words are drawn  from [Gregnat's](https://quizlet.com/saint1729/folders/gregmat/sets) 900 words GRE vocabularies. 

Each word is defined using The Collins COBUILD Advanced Dictionary style where definition are provided in full sentences, rather than excerpted phrases. 
```
prosaic: Something that is prosaic is dull and uninteresting.
```

The example sentences are drawn from highly curated Puritan works or using various English Translation of Bible. The sources for these are from [Studylight.org](https://www.studylight.org/).

## Installation
1. Clone the repository
2. Install dependencies
```
cd frontend && npm install
cd backend && npm install
```
3. Start frontend and backend server using `npm run start` and `npm run dev` respectively.

## Configuration
Create env file with dbURI for Mongodb and Secret key for Jwt Token.

## API Documentation
This can be found in url `http://localhost:3000/api-docs`

## Technologies Used

- **Frontend**: Angular
- **Backend**:Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Database Schemas

### Flashcard Schema

The flashcard schema includes "id," "word," "meaning," "sentence," "reference," and "reviewStatus" with an enum of ['NotReviewed', 'Reviewed', 'Mastered'].

### User Schema

The user schema includes  "username," "email," "password,".
