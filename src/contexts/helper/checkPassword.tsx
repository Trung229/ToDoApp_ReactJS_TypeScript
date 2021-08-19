export const CheckPassword = (password: string) => {
    const passLength = /.+/g;
    const specialCharacter = /[^a-zA-Z0-9]/g;
    const lengthLimit = /.{8,15}/g
    if(!passLength.test(password)){
        return {message:"bạn không được để trống Password", isValid:false}
    }else if(specialCharacter.test(password)){
        return {message:"bạn không được dùng ký tự đặt biệt trong mật khẩu", isValid:false}
    }else if(!lengthLimit.test(password)){
        return {message:"bạn không được nhập quá ký tự cho phép(8-15)", isValid: false}
    }else{
        return {message:"", isValid:true}
    }
}
