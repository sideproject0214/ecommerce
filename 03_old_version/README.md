> Written with [StackEdit](https://stackedit.io/).
> **Markdown 문법**  
> <https://www.markdownguide.org/basic-syntax/>

# Ecommerce (From 20.12.04)

## Chapter1

- [x] 프론트 뼈대만 만듦

- [x] 도커, Postgresql 이용
- [x] 시퀄라이즈, 포스트맨을 이용해 서버 구조 작성 시작 (20.01.10)
- [x] FRONT, BACKEND, DB Docker Complete with Dockerlize (20.01.16)

  > 수정할 부분

- [x] CartScreen에 사이즈 추가
- [x] 장바구니에서 동일 품목이더라도 사이즈가 다른 2개있을때 하나를 지우면 다른 것도 지워진다
- [x] ProductOne에서 장바구니 추가시 로그인하고 장바구니 추가할수 있게하기
- [x] paymentScreen에서도 cart에 적용한 userUUID 일치할때만 보이게 하기
- [x] 카운트가 0일때 로그인하기 버튼부터 보이기

### 결제

- [x] 결제페이지 필터로 걸린 값만 보여주기
- [x] 카카오페이에서 값을 넘겨주면 이를 받아서 데이터 베이스 저장 -> OrdersModel.md 참고
- [x] 결제완료 후 cartItems에서 결제 완료된 것을 제외했으나, 다시 장바구니 가면 기존 값이 살아 있음  
       -> cartReducer에 cartItems: [] 빈배열 추가로 간단히 해결
- [x] 주문시 orderController의 orderSubmit을 통해 결제 완료 후 Order가 생성된다. 그럼 결제 성공이 되면 같이 동봉된 orderId를 통해 주문을 찾아 orderItems을 찾고, 거기서 map을 통해 기존 Product를 productId를 통해 찾아 주문한 양만큼 총 재고량을 줄여준다.
- [x] 나의 주문내역에서 송장 아이디있으면 검색하기
- [x] 그냥 취소 완료 // 맨위 2개는 삭제하기. 이미 결제 취소 된 것임
- [x] isPaid만 취소하기
- [x] 주문내역에서 결제 취소 및 해당 기능 구현 버튼 만들기(주문내역은 isPaid가 true인 것만 보여준다)
- [x] 결제성공하면 상품 갯수 줄어드는게 다시 작동안함 -> 마지막 ; 안적어서 그러함
      https://www.youtube.com/watch?v=QKMFJhB9eEY

## 배송조회

- [x] 배송 조회내에 사이즈 만들기

## 취소작업

- [x] KAKAO_PAY_CANCEL_REQUEST 작업하기(redux)
- [x] 주문취소하면 취소완료되었다고 리다이렉트 하기
- [x] 결제 취소하면 제품 제고 구매 숫자만큼 다시 올리기
- [x] 취소하면 정말 취소하시겠습니까? 라고 묻는 화면이 나옴.
- [x] 제품페이지에서 이미지가 일정이상이면 화면 넘어가는 것 고치기
- [x] 취소버튼을 누르면 "주문이 취소되었습니다"라고 하면서 "주문내역" 또는 "홈으로 가기"가 나온다

## 배송정보

- [x] 기본배송지 : userUUID, shippingAddress를 통해 검색된 주소를 가져온다.
  - [x] ordercontroller, submitorder를 사용한다
  - [x] Address 모델에서 detail2를 extraAddress로 바꾸기
  - [x] 결제성공하면 주소 업데이트 되도록 완료
- [x] 주문이 완료되었습니다. 밑에 홈으로, 주문내역으로 가기 넣기
- [x] 최근배송지 누르면 Address 모델에서 최근 주문지 5군데 보여주기

  - 최근 주소 5개가 나오는 창(LatestAddress)다른 창에서 리덕스에 값 저장이 가능하더라도 postMessage 해줘야 하는 이유 : parent창에서는 값이 변한 것을 감지 못한다.
  - [x] 주문결제 성공하면 Order의 주소를 Order모델에 저장하는데, userId, fulladdress를 기준으로 중복여부를 검사한다

- [x] 기본 배송지는 첫 화면에서
  - [x] 주소 userId외에 fullAddress로 찾는 것 추가하기
- [x] 직접입력은 그냥 빈칸으로 두기
- [x] windowOpener 2번 열리는 것 고치기

- [x] 결제 성공시 내 주문내역으로 가기(홈으로 가기, 주문내역으로 가기 추가)

- [x] 회원가입만들기

- [x] 회원 가입 하면 이메일 인증 메일이 발송되고 해당 메일을 클릭해야지만 최종 회원가입이 가능해짐(sendgrid)

  - 이때 지메일의 경우 스팸처리돼서 스팸메일함으로 가니 꼭 확인
  - 본래 아래와 같이 주소를 적어야 하나, docker를 쓰는 관계로 req.headers.host가 backend:5000으로 가게 된다. 그래서 여기를 localhost:5000으로 적어주자.

  ```html
  <a href="http://${req.headers.host}/verify-email/token=${user.emailToken}"
    >이메일 인증 클릭</a
  >
  ```

  - userRoute는 실제로 사용되지 않음

- [x] 이메일 인증 가입 완성, 로그인시 이메일 또는 패스워드 일치시에만 로그인하도록 만들기

## Post write 만들기

- [x] protect router 수정하기
- [x] 제품이미지 5개 올리기, 상품 설명 이미지 올릴수 있게 하기(ipfs 사용하기)
- [x] express는 이 자체는 이미지를 처리하지 못하기에 multer를 설치해야 한다.
      <https://github.com/expressjs/multer/blob/master/doc/README-ko.md>
- [x] 이미지 올리기
      <https://developers.cloudflare.com/images/cloudflare-images/upload-images/direct-creator-upload>

  > nodejs에서 왜 multipart/form-data 를 써야 하는지 이유  
  > <https://picnature.de/how-to-upload-files-in-nodejs-using-multer-2-0>

# 🧑‍🌾 productController.js

#### 토탈 이미지는 4개이어야 함. 썸네일 첫번째는 메인 이미지어야 함

- [x] 백엔드 섬네일 이미지는 req.files 모두 받는 것으로 수정 [2022-02-23 06:53:07]
- [x] 백엔드에서 메인이미지는 첫번째, 섬네일은 메인이미지 포함해서 3개로 수정 [2022-02-23 06:41:32]
- [ ] 섬네일 4개 올리면 경고뜨게 체크 필요
- [ ] 할인율을 0으로 하면 할인 가격이 안나오게 수정 -> 프론트
- [ ] axios.post에서 progressbar 만들기
- [ ] 비밀번호 찾기 기능 만들기
- [ ] fontawesome이 버전업이 되면서 이름이 다 달라짐. 주의해야 함.

# 에러 고치기

- [ ] 상품을 1개만 주문할 경우 같은 상품의 경우 reviewCheck에 productID만 넣게 되면 1개 리뷰하면 다른 것도 리뷰하게 된다.

# productOne.js

- [ ] **리뷰달기**
- [ ] 인피니티 스크롤

- [x] css loader : <https://loading.io/css/>

  > 선택된 파일이 없습니다 자리에 진행율 나오게 표시

  > progressbar 만들기
  > <https://dev.to/collegewap/uploading-files-in-react-with-progress-bar-using-express-server-58cf>\*\*

- [ ] 글 작성이 완성되면 작성된 페이지로 이동한다. [2022-02-23 06:15:24]

# Admin 패널 만들기

- [ ] admin 패널 만들기

data 의 속 내용을 알고 싶다면

```javascript
alert(JSON.stringify(data )
```

# **REVIEW 수정**

- [ ] 리뷰작성자 이름 넣기, 모델에는 userId도 같이 넣기

# **나의 정보**

- [ ] 내가 판 물건들이 팔렸는지 여부, 총 수익 보여주기(chart.js 통해서?)

  | 물건아이디 | 물건이름 | 가격     | 판매여부 | 구매자이름 |
  | ---------- | -------- | -------- | -------- | ---------- |
  | 111-11     | 책       | 30,000원 | 판매     | 홍길동     |

# Header 수정하기

- [ ] infinite scroll을 반대로 적용해 특정부분이 사라지면 css가 반응하도록 작동

## Admin 만들기

프론트작업(switch 방식<https://www.youtube.com/watch?v=xodD0nw2v

- [ ] 2개이상의 물품이 있을 경우 송장번호를 하나만 입력할 경우 다른 하나는 자동으로 '송장 입력 전'이 들어가게
- [ ] admin의 경우 작은 온오프 버튼 만들어 오프버튼 누르면 판매 페이지가 아닌, 관리자 페이지로 바뀌기

- [ ] 예쁜 대쉬보드로 만들기
      <https://www.youtube.com/watch?v=OJEQaVT45XA>

- [ ] 장바구니에서 바로 localstorage에 저장하도록 하기(지금은 orderSubmit에 바로 저장이 안되는듯 함)

> mac monterery port 5000 error
> 맥은 포트 5000, 7000을 사용하기 다른 포트를 사용해야 한다.
> <https://developer.apple.com/forums/thread/682332>

> _*CSS는 -로 연결, 함수는 카멜케이스, id=\_\_로 연결*_ >>_input file은 커스텀 마이징이 어렵기에 div를 쓴다. 그리고 label의 경우 for로 연결이 되지만 가운데가 클릭안되는 문제가 있기에 div를 쓴다_

| Name                            | Description                                      | Default key binding |
| ------------------------------- | ------------------------------------------------ | ------------------- |
| md-shortcut.showCommandPalette  | Display all commands                             | ctrl+M ctrl+M       |
| md-shortcut.toggleBold          | Make **bold**                                    | ctrl+B              |
| md-shortcut.toggleItalic        | Make _italic_                                    | ctrl+I              |
| md-shortcut.toggleStrikethrough | Make ~~strikethrough~~                           |
| md-shortcut.toggleLink          | Make [a hyperlink](www.example.org)              | ctrl+L              |
| md-shortcut.toggleImage         | Make an image ![](image_url.png)                 | ctrl+shift+L        |
| md-shortcut.toggleCodeBlock     | Make `a code block`                              | ctrl+M ctrl+C       |
| md-shortcut.toggleInlineCode    | Make `inline code`                               | ctrl+M ctrl+I       |
| md-shortcut.toggleBullets       | Make \* bullet point                             | ctrl+M ctrl+B       |
| md-shortcut.toggleNumbers       | Make 1. numbered list                            | ctrl+M ctrl+1       |
| md-shortcut.toggleCheckboxes    | Make - [ ] check list (Github flavored markdown) | ctrl+M ctrl+X       |
| md-shortcut.toggleTitleH1       | Toggle # H1 title                                |
| md-shortcut.toggleTitleH2       | Toggle ## H2 title                               |
| md-shortcut.toggleTitleH3       | Toggle ### H3 title                              |
| md-shortcut.toggleTitleH4       | Toggle #### H4 title                             |
| md-shortcut.toggleTitleH5       | Toggle ##### H5 title                            |
| md-shortcut.toggleTitleH6       | Toggle ###### H6 title                           |
| md-shortcut.addTable            | Add Tabular values                               |
| md-shortcut.addTableWithHeader  | Add Tabular values with header                   |

#🤣 마크다운(MarkDown snippet 설정하기)

When I write blog articles, one thing I always need to enter is the current date and time or future date and time if I want to publish later. I often copy and paste a previous article, then adjust all the properties. But it would be nice if I could use a snippet or keyboard shortcut to enter the date and time for me.

It turns out you can! VS Code has variables available to use for snippets!

You can create a snippet for Markdown files in VS Code by opening up the snippets JSON file. The easiest way is as follows:

## Snippets

- Open the Command Palette with Ctrl+Shift+p
- Select "Preferences: Configure User Snippets"
- Select "markdown.json"

```json
  "Current Date": {
      "prefix": "date",
      "body": [
          "$CURRENT_YEAR-$CURRENT_MONTH-${CURRENT_DATE}T$CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND.000-05:00"
      ],
      "description": "Add Current date & time"
  }
```

## keyboard shortcuts

- Open the Command Palette with Ctrl+Shift+p
- Select "Preferences: Open Keyboard Shortcuts (JSON)"
- Then insert your own modified version of the keybinding below.

```json
{
  "key": "ctrl+d t",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "snippet": "$CURRENT_YEAR-$CURRENT_MONTH-${CURRENT_DATE}T$CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND.000-05:00"
  }
}
```

In my example pressing ctrl+d and than letting go and pressing the t button would insert my current date and time.

# 😉 Color

> <https://getbootstrap.com/docs/4.0/components/alerts/>
> 부트스트랩 기준으로 작성한다

# Postgresql

- Array 업데이트 하기 <https://popsql.com/learn-sql/postgresql/how-to-modify-arrays-in-postgresql>
