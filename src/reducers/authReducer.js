const initialUserState = {
    token: "",
    userName:"",
    email:"",
    cart:[],
    wishlist:[],
    // addresses:[],
    // orders:[]
}

export const authReducer = (state, {type, payload}) => {
    switch(type) {
        case "LOGIN":
            return {...state, token:payload}
        case "LOGOUT":
            return {...state, token:""}
        case "SIGNUP":
            return {...state, token:payload}
        
    }
}