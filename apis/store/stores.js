import { get, post, put } from "../common-http.js";

const storePath = "/stores";

/**
 * 가게 목록 조회
 * @param {function | undefined} onReadSuccess 조회 성공 시 호출할 함수
 */
export const getStores = (onReadSuccess) => {
	get(storePath).then((res) => {
		onReadSuccess && onReadSuccess(res?.storeList || []);
	});
};
/**
 * 가게 상세 조회
 * @param {number} id 조회할 가게 시퀀스 번호
 * @param {function | undefined} onReadSuccess 조회 성공 시 호출할 함수
 */
export const getStoreDetail = (id, onReadSuccess) => {
	get(`${storePath}/${id}`).then((res) => {
		onReadSuccess && onReadSuccess(res?.storeDetail || {});
	});
};
/**
 * 가게 등록
 * @param {any} value, onCreateSuccess 등록할 가게 입력값
 * @param {function | undefined} onCreateSuccess 등록 성공 시 호출할 함수
 */
export const createStore = (value, onCreateSuccess) => {
	// TODO: 루트관리자 권한으로 수정
	post(storePath, value).then((res) => {
		res && onCreateSuccess && onCreateSuccess();
	});
};
/**
 * 가게 수정
 * @param {number} id 수정할 가게 시퀀스 번호
 * @param {any} value 수정할 가게 입력값
 * @param {function | undefined} onUpdateSuccess 수정 성공 시 호출할 함수
 */
export const updateStore = (id, value, onUpdateSuccess) => {
	// TODO: 루트관리자 권한으로 수정
	put(storePath, id, value).then((res) => {
		res && onUpdateSuccess && onUpdateSuccess();
	});
};
