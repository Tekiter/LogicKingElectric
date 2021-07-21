import EnvTab from "./envTab";

export default function MyPage(): JSX.Element {
    return (
        <div>
            <div style={{ display: "table", marginLeft: "35%" }}>
                <div style={{ display: "table-cell" }}>
                    <div style={{}}>
                        <div style={{ alignItems: "center", textAlign: "center", fontSize: 40 }}>마이페이지</div>
                        <div style={{ alignItems: "center", textAlign: "center", fontSize: 20, color: "gray" }}>
                            아이디, 비밀번호 등의 개인정보를 수정할 수 있습니다
                        </div>
                        <div style={{ boxShadow: "3px 3px 0px 0px #e8e8e8" }}>
                            <div>사진</div>
                            <div>아이디</div>
                            <div>비밀번호</div>
                            <div>비밀번호 확인</div>
                            <div>비밀번호 확인</div>
                            <div>발전소 이름</div>
                            <div>비밀번호 확인</div>
                            <div>발전정보</div>
                            <div>발전소 위치</div>
                            <div>발전기 타입</div>
                            <div>발전용량</div>
                            <div>방위각</div>
                            <div>온도계수</div>
                            <div>각도</div>
                            <div>데이터 제출시각</div>
                        </div>
                    </div>
                    <EnvTab></EnvTab>
                </div>
            </div>
        </div>
    );
}
