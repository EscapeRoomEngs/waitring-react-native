export function checkPw (pw) {

    const defaultPw = /^.*(?=.{6,20}).*$/;

    const number = /[0-9]/g;
    const character = /[a-zA-Z]/g;
    const specialCharacters = /[^가-힣\w\s]/g;

    return (pw.toString().match(number) ? 1 : 0) + (pw.toString().match(character) ? 1 : 0) + (pw.toString().match(specialCharacters) ? 1 : 0)
   
}