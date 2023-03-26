export const isAuthenticated = (state) => {
    console.log(state)
    if (state.auth.auth.isSuccess) return true;
    return false;
};
