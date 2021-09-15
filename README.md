# KDT-toy1

KDT 패스트캠퍼스 프론트엔드 과정 첫번째 Toy Project

<br>

## 프로젝트 목표

`html` `css` `js` 활용 해 예시 화면 2개 클로닝

**예시1**

|전|후|
|:--|:--|
|![](https://images.velog.io/images/trollering12312/post/75d74583-cce8-4b3d-ad6e-8f71811f47cb/1.PNG)|![](https://images.velog.io/images/trollering12312/post/ab2ecae6-c626-4403-a861-5ef9ab858279/2.PNG)|

**예시2**

|전|후|
|:--|:--|
|![](https://images.velog.io/images/trollering12312/post/4a8b02aa-4042-4c22-9447-5eb0954020c9/4.PNG)|![](https://images.velog.io/images/trollering12312/post/3911e826-f56c-4868-a97f-f2327d285a9b/3.PNG)|

<br>

## 프로젝트 진행

개인 토이프로젝트이지만 `html`기초 설계와 `css`디자인은 일부 팀 프로젝트로 진행됨
<br>

### 0) 프로젝트 준비

프로젝트 시작 전에 `커밋 컨벤션, 코드 스타일, 디렉토리 구성 등`을 지정

<br>

* 커밋 컨벤션

|commit 컨벤션|작성 예시|
|:--|:--|
|![](https://images.velog.io/images/trollering12312/post/cdbc44a9-34a8-48d0-84ad-d32f078bcaee/image.png)|![](https://images.velog.io/images/trollering12312/post/de5c3cb7-127f-4f6e-9d1c-08ba2c552ee3/image.png)|
|`태그 : 한글`(50자 이내), `설명`(한글로 기재, 70자마다 줄바꿈)로 커밋 내용 작성 | 커밋 메시지에 `대상 파일/폴더의 이름`을 기재해야 하는 경우에는 Mac 사용자를 위해 대소문자 구분해서 정확하게 명시 |

<br>

* 코드 스타일

코드 스타일은 `beautify` 확장 프로그램을 사용해 통일 - `ctrl+alt+l`

<br>

* 프로젝트 공유

프로젝트의 공유는 `github`의 프로젝트를 `fork`한뒤 `pull request`을 통해 진행

> [fork-pull request 하는법](https://chanhuiseok.github.io/posts/git-3/)

(요약)
1. 작업할 원본 저장소를 fork한 다음 로컬에 clone
2. remote 목록에 fork해온 원본 저장소 연결 - `upstream`이름으로
`$git remote add upstream https://github.com/fork해온_원본/repository의_주소`
3. pr용 브랜치 생성
4. 작업
5. 내 깃헙 저장소로 push
6. 내 깃헙 저장소로가 pr 날리기
7. merge 대기
<br>

> [fork한 프로젝트 최신 버전 유지](https://katfun.tistory.com/entry/git-Fork%ED%95%9C-Repository-%EC%B5%9C%EC%8B%A0-%EB%82%B4%EC%9A%A9-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0)

이미 fork할 때 원본 저장소와 연결되있기 때문에 아래 작업만 수행
1. 연결된 원본 저장소를 fetch
2. 원본 저장소의 `main`을 내 `main`브랜치와 `merge`
3. 합쳐진 내용을 내 fork 저장소로 psuh

``` bash
$git fetch upstream 
$git merge upstream/main
$git push
```
<br>

> [stash 활용](https://gmlwjd9405.github.io/2018/05/18/git-stash.html)

pr용 브랜치에서 작업하다가 잠시 메인이나 다른 브랜치로 이동하기위한 **임시 저장소**
<br>

> [메인에서 브랜치로 원하는 파일만 가져오기](https://stackoverflow.com/questions/307579/how-do-i-copy-a-version-of-a-single-file-from-one-git-branch-to-another)

`git checkout otherbranch myfile.txt`

<br>

### 1) html 기초 설계

화면 2개를 인원을 나눠서 스케치를 후 `html` 구조를 작성

![](https://images.velog.io/images/trollering12312/post/262a71b9-ca15-48ce-85c7-032c9197569d/toyproject_layout_%EB%B0%95%EC%98%81%EC%B0%AC.png)

(아래 부분 설계가 누락되었어서 이후 추가)

작성한 내용을 `main`에 pr 한 뒤, 팀 전체의 코드리뷰를 통해 최종 구조를 확정

_대략적인 구조는 비슷하지만 세부 구현은 팀원 마다 달라짐_

<br>

### 2) css 적용

예시의 **전** 단계의 화면을 기준으로 구현

`flex-box` `position` 이나 여러 인라인 요소를 활용
<br>

* 레이아웃 설계

`flex`는 유용하지만 `position`을 사용하는게 더 효율적인 경우도 있음

화면의 크기는 `vh, vw, 퍼센트`를 사용했는데 수치의 설정에 주의해야함

정렬은 `flex`를 사용하는게 좋음

_반응형에 변경되는 요소는 `vh,vw`로 지정하지 않기 - 원하는 형태로 지정하기 까다로움_

<br>

* **Font Awesome**

분명 그림이지만 폰트처럼 사용되는 벡터 아이콘

[fontawesome](https://fontawesome.com/)
[fontawesome 사용법](https://amango.tistory.com/7)
<br>

* `float`을 사용한 동일선 좌우 정렬

https://css-tricks.com/left-align-and-right-align-text-on-the-same-line/

<br>

* `reset.css` `normalize`

브라우저 기본 제공하는 디자인을 초기화 시켜준다

_버튼, `ul` 같은 요소들의 디자인을 삭제시켰다_


[normalize](https://cdnjs.com/libraries/normalize)
[reset.css](https://meyerweb.com/eric/tools/css/reset/)

<br>

* noto 폰트

https://iflue.tistory.com/2
<br>

* 스크롤

[스크롤 숨기기](https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll)

`flex` 사용시 스크롤이 생성되려면 기본값(`flex-basis` `width` `min-width` `flex-shrink`...), 즉 최소 크기를 보장하는 속성이 설정되어야함

```css
  width: 120px;
  height: 50px;
  flex: 0 0 auto;/*grow, shrink, basis*/
```
부모가 flex-box를 사용한다면, flex-item은 위 속성으로 정해진 높이와 크기에서 줄어들지도 커지지도 않는다

_스크롤이 생성되어도 개발자 도구 휴대폰 모드가 아니면 드래그는 적용안됨 - 키보드만 가능_

[출처](https://velog.io/@parkoon/%EC%88%98%ED%8F%89%EC%9C%BC%EB%A1%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-%EB%A7%8C%EB%93%A4%EA%B8%B0)


* 반응형 적용하기

이번 반응형은 별다른 규칙없이 필요할 것 같은 요소에 적용함

_너비에 대한 반응형은 설정하지만, 높이에대한 반응형은 해야하나 고민_

<br>

### 3) JS 설정

다음과 같은 기능을 추가함

>  `swipe` : **swipe기능**을 주는 `js `라이브러리 사용

적용할 때는 [demo](https://codesandbox.io/s/d4vlk?file=/index.html:1492-1500)보고 바로하는게 빠름
<br>

적용시 기존 드래그 스크롤이 전부 무효화 됨

`swipe`객체 생성시 `noSwipingSelector` 속성을 설정해 제외할 요소 선택 가능
<br>

> **예시1 요소 생성**

예시1의 지출 내역을 생성하는 `js` 함수 제작

`homeGenerate` : `json`파일을 가져오고, 예시1 제작을 위한 함수를 모아논 함수

`jsonProcess` : `json`을 처리해 객체로 변환해주는 함수
* 참고 링크
    * https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript

`date_group` : `jsonProcess`에서 생성된 객체를 `date`값으로 묶어서 새로운 객체를 만드는 함수

_`forEach`사용했지만 `for-of`로도 구현 가능_

* 참고 링크
    * https://stackoverflow.com/questions/40774697/how-to-group-an-array-of-objects-by-key
    * https://stackoverflow.com/questions/31096596/why-is-foreach-not-a-function-for-this-object
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

`homeScreenGenerate` : `date_group`에서 생성된 객체를 기반으로 html 요소를 만드는 함수

* 참고 링크
    * https://stackoverflow.com/questions/9107541/javascript-to-create-an-li-and-append-to-an-ol
    * [jQuery](https://cdnjs.com/libraries/jquery)
    * https://stackoverflow.com/questions/10619445/the-preferred-way-of-creating-a-new-element-with-jquery

<br>

> **예시2 요소 생성**

`expenseGenerate` : `json`파일을 가져오고, 표 생성을 위한 두 종류의 `dictionary`를 만드는 함수, 표 생성 함수도 호출

`monthly_expense_chart_maker` : 표1 생성

* 참고 링크
    * https://www.chartjs.org/docs/latest/

`monthly_category_maker` : 표2 생성

* 참고 링크
    * https://www.chartjs.org/docs/latest/

`setCategoryTotal` : 하단의 카테고리별 총합 설정

* 참고 링크
    * https://webclub.tistory.com/455


_`swiper` 라이브러리의 **loop기능**을 활성화하면 `chart`라이브러리와 충돌한다_

<br>

### 4) 마무리 및 호스팅

제출은 깃헙 페이지를 활용해 호스팅된 주소를 제출


<br>

## 추가 구현 할만 한 내용

1. 예시1의 지출내역을 위로 drag하는 기능
2. 메인 화면의 제한 범위를 drag지정하는 기능

`js` : _제한된 범위 내에서 drag하는 기능_

<br>
