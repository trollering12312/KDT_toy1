# KDT-toy1
KDT 패스트캠퍼스 프론트엔드 과정 첫번째 Toy Project

## 프로젝트 목표

예시 화면 2개를 클로닝하기

**화면1**

|전|후|
|:--|:--|
|![](https://images.velog.io/images/trollering12312/post/75d74583-cce8-4b3d-ad6e-8f71811f47cb/1.PNG)|![](https://images.velog.io/images/trollering12312/post/ab2ecae6-c626-4403-a861-5ef9ab858279/2.PNG)|

**화면2**

|전|후|
|:--|:--|
|![](https://images.velog.io/images/trollering12312/post/4a8b02aa-4042-4c22-9447-5eb0954020c9/4.PNG)|![](https://images.velog.io/images/trollering12312/post/3911e826-f56c-4868-a97f-f2327d285a9b/3.PNG)|

<br>

## 프로젝트 진행 단계

토이프로젝트이지만 일부 과정이 팀 프로젝트로 진행되었습니다
(1인 팀장, 4인 팀원으로 나뉘어 과정 진행)

프로젝트 시작 전에 `커밋 컨벤션, 코드 스타일, 디렉토리 구성 등`을 상의했습니다

|commit 컨벤션|작성 예시|
|:--|:--|
|![](https://images.velog.io/images/trollering12312/post/cdbc44a9-34a8-48d0-84ad-d32f078bcaee/image.png)|![](https://images.velog.io/images/trollering12312/post/de5c3cb7-127f-4f6e-9d1c-08ba2c552ee3/image.png)|
|태그 : 한글로 수정 사항 기재(50자 이내) 설명(한글로 기재, 70자마다 줄바꿈) | 커밋 메시지에 대상 파일/폴더의 이름을 기재해야 하는 경우에는 Mac 사용자를 위해 대소문자 구분해서 정확하게 명시 |

코드 스타일은 `beautify` 확장 프로그램을 사용해 통일하고,

프로젝트의 공유는 `github`의 프로젝트를 `fork`한뒤 `pull request`을 통해 진행했습니다

[fork-pull request 사용법](https://chanhuiseok.github.io/posts/git-3/)

[fork 최신 버전 유지하는 법](https://katfun.tistory.com/entry/git-Fork%ED%95%9C-Repository-%EC%B5%9C%EC%8B%A0-%EB%82%B4%EC%9A%A9-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0)

stash 활용
https://gmlwjd9405.github.io/2018/05/18/git-stash.html

<br>

### html 기초 설계

화면 2개를 각각 2팀으로 나누어서 스케치를 후 `html` 구조를 작성했습니다

![](https://images.velog.io/images/trollering12312/post/262a71b9-ca15-48ce-85c7-032c9197569d/toyproject_layout_%EB%B0%95%EC%98%81%EC%B0%AC.png)

이후 작성한 내용을 pr 한 뒤, 팀 전체의 코드리뷰를 통해 최종 구조를 확정해서 공유되는 `main 브랜치`에 `merge`했습니다
<br>

### css 적용

css 적용 단계에서는 js 적용 전까지는 제한적인 부분만 구현이 가능하기 때문에 **전** 단계의 화면만 구현합니다

화면의 레이아웃과 요소의 디자인을 정해줍니다

전체 비율은 vh,vw와 퍼센트를 사용하고, 배치는 flex를 사용하는게 좋음

반응형 적용을 위해 내부 요소는 vh,vw로 지정안하기 - 생각보다 까다롭고 별로다


-좌우 정렬

https://css-tricks.com/left-align-and-right-align-text-on-the-same-line/

reset.css

noto 폰트
https://iflue.tistory.com/2

스크롤
[스크롤 숨기기](https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll)
`flex-shrink: 0;`으로 요소의 크기를 고정해 강제 스크롤 생성


-반응형 적용하기-

- flex scroll 적용하기
https://velog.io/@parkoon/%EC%88%98%ED%8F%89%EC%9C%BC%EB%A1%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-%EB%A7%8C%EB%93%A4%EA%B8%B0


<br>

### JS 적용

JS 적용 단계에서는 다음과 같은 기능을 추가합니다

1. 슬라이더 : `swipe기능`을 주는 `js `슬라이더 라이브러리 사용

demo보고 바로하는게 빠르다
https://daldalhanstory.tistory.com/219
https://codesandbox.io/s/d4vlk?file=/index.html:1492-1500

적용시 기존 마우스 드래그 스크롤이 전부 무효화 된다
키보드론 가능...

noSwipingSelector 속성 사용해 제외 가능

개발자 도구에서 전환하면 swiper 적용이 안된다

2. `json(엑셀)`의 데이터를 html 요소로 변환해 추가하는 기능

https://stackoverflow.com/questions/40774697/how-to-group-an-array-of-objects-by-key

https://www.educative.io/edpresso/how-to-convert-json-to-html

https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript

https://cdnjs.com/libraries/jquery

https://stackoverflow.com/questions/31096596/why-is-foreach-not-a-function-for-this-object

https://stackoverflow.com/questions/9107541/javascript-to-create-an-li-and-append-to-an-ol

https://stackoverflow.com/questions/10619445/the-preferred-way-of-creating-a-new-element-with-jquery

3. 데이터를 표로 나타내주는 라이브러리 사용

+추가?
메인화면의 지출내역을 위로 drag하는 기능?
메인 화면의 범위를 지정하는 기능?

<br>

### 마무리 및 호스팅

제출은 깃헙 페이지를 활용해 호스팅된 주소를 제출합니다

<br>
