import { get, post, put } from "../common-http.js";

const storeCategoriesPath = "/stores/categories";

/**
 * 가게카테고리 조회
 * @param {function | undefined} onReadSuccess 조회 성공 시 호출할 함수
 */
export const getStoreCategories = (onReadSuccess) => {
	get(storeCategoriesPath).then((res) => {
		onReadSuccess && onReadSuccess(res?.storeCategoryList || []);
	});
};
/**
 * 가게카테고리 등록
 * @param {any} value, onCreateSuccess 등록할 가게카테고리 입력값
 * @param {function | undefined} onCreateSuccess 등록 성공 시 호출할 함수
 */
export const createStoreCategory = (value, onCreateSuccess) => {
	// TODO: 루트관리자 권한으로 수정
	post(storeCategoriesPath, value).then((res) => {
		res && onCreateSuccess && onCreateSuccess();
	});
};
/**
 * 가게카테고리 수정
 * @param {number} id 수정할 가게카테고리 입력값
 * @param {any} value 수정할 가게카테고리 입력값
 * @param {function | undefined} onUpdateSuccess 수정 성공 시 호출할 함수
 */
export const updateStoreCategory = (id, value, onUpdateSuccess) => {
	// TODO: 루트관리자 권한으로 수정
	put(storeCategoriesPath, id, value).then((res) => {
		res && onUpdateSuccess && onUpdateSuccess();
	});
};
