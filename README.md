# CAPSTONE PROJECT FOR SOFTWARE ENGINEER 1

## SOCIAL NETWORK FOR PET OWNER

### BY : C1SE.08 - 2021 - 2022

### MENTOR: THANH, NGUYEN TRONG MSC

#### HOW TO RUN THE PROJECT

- `Step 1`: Clone the project to local
- `Step 2`: Open project folder in VISUAL STUDIO CODE
- `Step 3`: use Ctrl + ~ for open terminal and Type npm i yarn --global
- `Step 4`: Type yarn install-all
- `Step 5`: In folder client -> create a file name .evn.local with content 'REACT_APP_BASE_API=http://localhost:8800/api'
- `Step 6`: Ctrl + ~ and type yarn start
- `Step 7`: View the website at Localhost:3000 at your browser

#### MAIN CONCEPT

|  #  | Page     | Description                                                      |
| :-: | :------- | :--------------------------------------------------------------- |
|  1  | Login    | Login page                                                       |
|  2  | Register | Register page                                                    |
|  3  | Homepage | Shows all the post of user                                       |
|  4  | CuuTro   | Show the 'Cuu Tro' posts, link to detail, comment, create a post |
|  5  | HoiDap   | Show the 'Hoi Dap' posts, link to detail, comment                |
|  6  | Shop     | Shopping page                                                    |
|  7  | User     | User detail page                                                 |

### LOGIN

#### Login form

- `Email`
  - Email input
  - Required
- `Password`
  - Password input
  - Required

### REGISTER

#### Register form

- `Username`
  - Text input
  - Should only contain a-z, 0-9
  - Required
- `Email`
  - Email input
  - Required
- `Password`
  - Password input
  - Required

### HOMEPAGE

- The posts of all user
- Like, go to detail user page, detail post page

### CUUTRO

- All 'Cuu tro ' post
- Most view posts
- create ' Cuu tro ' post

### HOIDAP

- All ' Hoi Dap ' post
- Most view posts
- Create 'Hoi Dap' post

### SHOP

- All product
- Add to cart
- View the cart

### USER

- User information
- Message with other user
- Edit information

### Built with

- UI library: Material UI + ReactStrap
- Routing: React router DOM
- Form: Formik
- Form validation: Yup
- HTTP client: axios

### Routings

- `/`: Home page if isUser | Login page if not a user
- `/register`: Register page
- `/home/:homepostId`: Home post detail
- `/cuutro`: Cuu tro page
- `/cuutro/:cuutroId`: Cuu tro post detail
- `/hoidap`: Hoi dap page
- `/hoidap/:hoidapId`: Hoi dap detail page
- `/shop`: Shopping page
- `/cart`: Show cart page
- `/messenger`: start a chat with other user
