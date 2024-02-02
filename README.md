# Trybetunes 🎵

Welcome to Trybetunes, an incredible application developed during the [Trybe](https://www.instagram.com/betrybe/) course.

## Navigation Menu

- [Developers](#developers)
- [Project Description](#project-description)
- [Project Structure](#project-structure)
- [Deploy](#deploy)
- [How to Run Locally](#how-to-run-locally)
  - [With Docker](#with-docker)
  - [With Node.js](#with-nodejs)
- [Connect with Me](#connect-with-me)

## Developers

- Developed by: [ojeff-dev](https://www.linkedin.com/in/ojefferson/) 💻
- Developed by: [Trybe](https://www.instagram.com/betrybe/) 🚀

## Project Description

TrybeTunes is an incredible application that provides a complete musical experience. Users can easily log in, explore their favorite bands and artists, view available albums, browse through the songs of a selected album, and listen to captivating previews. Additionally, it's possible to favorite preferred songs, view, and edit the profile information of the logged-in user.

## Project Structure

<details>
  <summary>The project structure is organized as follows:</summary>
  
  - `public/` [(ojeff-dev)](https://www.linkedin.com/in/ojefferson/):
    - `index.html`
  
  - `src/` [(ojeff-dev)](https://www.linkedin.com/in/ojefferson/):
    - `components/`
      - `Header.js`
      - `Loading.js`
      - `LoadingHeader.js`
      - `MusicCard.js`
      - `NotFound.js`
    - `images/`
      - `all images`
    - `pages/`
      - `Album.js`
      - `Favorites.js`
      - `Login.js`
      - `Profile.js`
      - `ProfileEdit.js`
      - `Search.js`
    - `styles/`
      - `album.css`
      - `favorites.css`
      - `login.css`
      - `profile.css`
      - `profileEdit.css`
      - `search.css`
    - `index.js`
    - `App.js`
    - `index.css`
  
  - `src/` (Trybe):
    - `services/`
      - `favoriteSongsAPI.js`
      - `musicsAPI.js`
      - `searchAlbumsAPI.js`
      - `userAPI.js`
    - `setupTests.js`
  
  - `/` [(ojeff-dev)](https://www.linkedin.com/in/ojefferson/):
    - `.dockerignore`
    - `Dockerfile`
    - `README.md`
  
  - `/` (Trybe):
    - `eslintrc.json`
    - `.eslintignore`
    - `.gitignore`
    - `.npmrc`
    - `.stylelintignore`
    - `.stylelintrc.json`
    - `package.json`
</details>

## Deploy

Trybetunes is currently available online. [Access here](https://ojeff.com/projects/trybetunes/).

## How to Run Locally

Follow the steps below to run the project locally using Docker or Node.js.

### With Docker:

1. Make sure you have [Docker](https://www.docker.com/) installed:

2. Clone the repository and navigate to the project folder:
   ```bash
   git clone https://github.com/ojeff-dev/trybetunes.git
   cd trybetunes

3. Build the Docker image:
   ```bash
   docker build -t `your-image-name` .

4. Run the Docker container:
   ```bash
   docker run -p `your-chosen-port`:3000 `your-image-name`

- Example:
  ```bash
  docker build -t trybetunes-image
  docker run -p 8080:3000 trybetunes

### With Node.js:

1. Make sure you have [Node.js v-16 or 18 installed](https://nodejs.org/en/about/previous-releases)

2. Clone the repository and navigate to the project folder:
   ```bash
   git clone https://github.com/ojeff-dev/trybetunes.git
   cd trybetunes

3. Run npm install:
   ```bash
   npm install

4. Start the application:
   ```bash
   npm start

## Connect with Me

Feel free to connect with me on LinkedIn or check out my portfolio:

- [LinkedIn](https://www.linkedin.com/in/ojefferson/)
- [Portfolio](https://ojeff.com/)
