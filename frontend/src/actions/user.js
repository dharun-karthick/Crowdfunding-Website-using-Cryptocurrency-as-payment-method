export const setUserState = (userState) => {
    return {
        type: 'SETUSERSTATE',
        payload: userState,
    };
} 

export const logoutUser = () => {
    return {
        type: 'RESETSTATE',
    };
} 