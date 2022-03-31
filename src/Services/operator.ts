export function logout(token: any) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/attendant/logout');

}
