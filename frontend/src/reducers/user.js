var defualtUserState = {
    user: {},
    session: '',
};

const userReducer = (state=defualtUserState,action) => {
    switch(action.type){
        case 'DISPLAY':
            return state;
        case 'SETUSERSTATE':
            return action.payload;
        case 'RESETSTATE':
            return defualtUserState;
        default:
            return state;
    }
}

export default userReducer;