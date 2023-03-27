export const isAuthenticated = (state) => {
    if (state.auth.auth.isSuccess) return true;
    return false;
};
