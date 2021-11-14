# WnC Project

- [x] 회원가입/로그인
- [x] 회원정보수정/탈퇴 (Firestore에서 회원정보수정)
- [x] 과외학생모집게시물 등록/수정/삭제 (Firestore)
- [x] 선생님목록보기/검색 (Query를 사용해서 Where로 조건찾아 가져오기)
- [ ] 모집완료 알림기능
- [x] 학생 -> 선생님에게 평가작성/별점/신고하기
- [x] 관리자페이지 : role을 줌으로써 조작가능

## 해야할것

- [x] 회원정보에 무슨내용이 들어갈것인지
- [x] 역할(학생/선생님/관리자)
- [x] 과외학생모집게시물 - 컬렉션으로 생성(선생님만)
- [x] 신청 두번눌러도 신청되는거 수정

## GitHub

### Upload

1. branch -> git checkout junghun2/main 처럼 사용해서 branch를 바꿀수있고
2. git push origin junghun2/main 를 했을경우(당연히 add/commit 후에)
3. git checkout main -> git pull origin junghun2(junghun2 branch에서 파일을 가져온 후 합치고)
4. git push origin main 한 이후에 (최신화 성공)
5. git checkout junghun2 를 하면(다시 원래 브랜치로 돌아갈수있음)

### pull

- fetch and merge .
- 즉 패치 후 병합한다는 얘기 => 충돌(Confilct) 발생 가능

### Merge Branch

- 각자 브랜치에서 작업 후 커밋, 푸쉬 .
- 그 후 master 브랜치로 checkout 한 후 pull origin 브랜치명 or merge 브랜치명 해주면 합쳐진다.
- master 브랜치 commit - push 하면 master에 정상적으로 병합된다.
- ※ 참고로 헷갈릴 수 있는게 local branches와 remote repository branches를 구별해야한다.
- local branches는 junghun2 , master 등이 되고, remote branches는 origin/junghun2, origin/master 등이 된다고 보면 됨.
- git log --branches --graph --oneline 사용하면 한눈에 브랜치와 커밋 현황을 알 수 있다.
