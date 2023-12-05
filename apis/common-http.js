import axios from "axios";

// TODO: base url 수정
const BASE_URL = "";

const commonApi = (url, options) => {
	const instance = axios.create({
		baseURL: url,
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
		},
		...options,
	});
	return instance;
};

/**
 * 기본 Axios 인스턴스
 */
const commonInstance = commonApi(BASE_URL, {
	timeout: 1000,
	validateStatus: false,
});

/**
 * 요청 API 구조
├── header
├── params
│   ├── condition : 검색 조건
│   └── pageable : 페이징 조건
│       ├── page : 페이징 번호
│       ├── size : 페이징 크기
│       └── sort : 정렬방식
├── body
└── └── input : 요청데이터
 */
/**
 * 응답 API 구조
├── header
├── body
│   ├── path : 요청 URI
│   └── status : 응답상태
│       ├── statusCd : HTTP 상태코드
│       └── statusNm : HTTP 상태코드명
│   └── result : 응답결과
│       ├── resultNm : 결과코드명
│       └── resultMsg : 결과메시지
└── └── output : 응답데이터
 */
/**
 * 응답 상태코드(statusCd) 정의
200 OK :  GET/DELETE(조회/삭제) 요청 성공
201 CREATED : POST/PUT(등록/수정) 요청 성공
400 BAD_REQUEST : 유효성 검증 실패, 잘못된 데이터 형식 등
401 UNAUTHORIZED : 자격 증명 실패, 아이디/비밀번호 불일치, 계정 비활성화 등
403 FORBIDDEN : 접근 권한 없음
404 NOT_FOUND : 잘못된 리소스 접근
409 CONFLICT : 클라이언트의 요청이 서버의 상태와 충돌 발생
500 INTERNAL_SERVER_ERROR : 서버 에러 발생
 */

/**
 * GET (조회)
 * @param {string} path
 * @param {{condition: {}, pageable: {page: number, size: number}}} params 조회 조건 (필터링, 페이징처리)
 * @returns {{} | undefined} 조회 결과
 */
export const get = async (path = "", params = {}) => {
	try {
		const response = await commonInstance.get(path, { params: params });
		if (response?.data?.status?.statusCd === 200) return response.data.output;
		else alert(response?.data?.result?.resultMsg);
	} catch (error) {
		// console.log(error);
		alert("조회 실패");
	}
	return;
};
/**
 * POST (생성)
 * @param {string} path
 * @param {any} value 등록 입력값
 * @returns {boolean} 생성 결과
 */
export const post = async (path = "", value) => {
	try {
		const response = await commonInstance.post(path, value);
		if (response?.data?.status?.statusCd === 201) return true;
		else alert(response?.data?.result?.resultMsg);
	} catch (error) {
		console.log(error);
		alert("생성 실패");
	}
	return false;
};
/**
 * PUT (수정)
 * @param {string} path
 * @param {number} id 수정할 시퀀스 번호
 * @param {any} value 수정 입력값
 * @returns {boolean} 수정 결과
 */
export const put = async (path = "", id, value) => {
	try {
		const response = await commonInstance.post(`${path}/${id}`, value);
		if (response?.data?.status?.statusCd === 201) return true;
		else alert(response?.data?.result?.resultMsg);
	} catch (error) {
		console.log(error);
		alert("수정 실패");
	}
	return false;
};
/**
 * DELETE (조회)
 * @param {string} path
 * @param {number} id 삭제할 시퀀스 번호
 * @returns {boolean} 삭제 결과
 */
export const del = async (path = "", id) => {
	try {
		const response = await commonInstance.delete(`${path}/${id}`);
		if (response?.data?.status?.statusCd === 200) return true;
		else alert(response?.data?.result?.resultMsg);
	} catch (error) {
		console.log(error);
		alert("삭제 실패");
	}
	return false;
};
