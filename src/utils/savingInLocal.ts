const  savingInLocal = async (res: Response)=>{
    const response = await res.json();
    localStorage.setItem("accessToken", response['message']['session']['access_token']);
    localStorage.setItem("userId", response['message']['user']['id']);
    localStorage.setItem("isLogin", 'true');
}

export default savingInLocal;