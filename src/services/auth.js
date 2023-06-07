export const userLogin = async (user) => await fetch("/api/auth/login",{
    method:"POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
}
)

export const userSignup = async (user) => await fetch("/api/auth/signup", {
    method:"POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body:JSON.stringify(user)
})