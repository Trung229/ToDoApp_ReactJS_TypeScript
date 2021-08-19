export const CheckEmail = (email: string) => {
    const domainEmail = /.{3,5}\@.{5,10}.{2,}/g;
    const emailLength = /.{5,}/g;
    if (!email) {
        return { message: "bạn không được để trống email", isValid: false };
    } else {
        if (!domainEmail.test(email)) {
            return { message: "bạn nhập không đúng định dạng email", isValid: false }

        } else if (!email) {
            return { message: "Tài khoản không tồn tại", isValid: false }

        }
        else {
            return { message: "", isValid: true }

        }
    }
}