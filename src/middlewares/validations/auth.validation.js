const joi = require("joi");
const APIError = require("../../utils/errors");

class AuthValidation {

    static register = async (req, res, next) => {
        try {
            await joi.object({
                name: joi.string().trim().min(3).max(50).required().messages({
                    "string.base": "İsim Alanı Normal Metin Olmalıdır",
                    "string.empty": "İsim Alanı Boş Olamaz !",
                    "string.min": "İsim Alanı En Az 3 Karakter Olmalıdır.",
                    "string.max": "İsim Alanı En Fazla 50 Karakter Olmalıdır.",
                    "string.required": "İsim Alanı Zorunludur",

                }),

                lastName: joi.string().trim().min(3).max(50).required().messages({
                    "string.base": "Soyad Alanı Normal Metin Olmalıdır",
                    "string.empty": "Soyad Alanı Boş Olamaz !",
                    "string.min": "Soyad Alanı En Az 3 Karakter Olmalıdır.",
                    "string.max": "Soyad Alanı En Fazla 50 Karakter Olmalıdır.",
                    "string.required": "Soyad Alanı Zorunludur",

                }),

                email: joi.string().email().trim().min(6).max(50).required().messages({
                    "string.base": "Mail Alanı Normal Metin Olmalıdır",
                    "string.empty": "Mail Alanı Boş Olamaz !",
                    "string.min": "Mail Alanı En Az 6 Karakter Olmalıdır.",
                    "string.email": "Lütfen Geçerli Bir Mail Giriniz",
                    "string.max": "Mail Alanı En Fazla 50 Karakter Olmalıdır.",
                    "string.required": "Mail Alanı Zorunludur",

                }),

                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "Şifre Alanı Normal Metin Olmalıdır",
                    "string.empty": "Şifre Alanı Boş Olamaz !",
                    "string.min": "Şifre Alanı En Az 6 Karakter Olmalıdır.",
                    "string.max": "Şifre Alanı En Fazla 36 Karakter Olmalıdır.",
                    "string.required": "Şifre Alanı Zorunludur",

                })
            }).validateAsync(req.body)
        } catch (error) {
            if (error.details && error?.details[0].message)
                throw new APIError(error.details[0].message, 400);
            else
                throw new APIError("Lütfen Validasyon Kurallarına Uyun", 400);
        }
        next();
    }

    static login = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().email().trim().min(6).max(50).required().messages({
                    "string.base": "Mail Alanı Normal Metin Olmalıdır",
                    "string.empty": "Mail Alanı Boş Olamaz !",
                    "string.min": "Mail Alanı En Az 6 Karakter Olmalıdır.",
                    "string.email": "Lütfen Geçerli Bir Mail Giriniz",
                    "string.max": "Mail Alanı En Fazla 50 Karakter Olmalıdır.",
                    "string.required": "Mail Alanı Zorunludur",

                }),

                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "Şifre Alanı Normal Metin Olmalıdır",
                    "string.empty": "Şifre Alanı Boş Olamaz !",
                    "string.min": "Şifre Alanı En Az 6 Karakter Olmalıdır.",
                    "string.max": "Şifre Alanı En Fazla 36 Karakter Olmalıdır.",
                    "string.required": "Şifre Alanı Zorunludur",

                })
            }).validateAsync(req.body);
        } catch (error) {
            if (error.details && error?.details[0].message)
                throw new APIError(error.details[0].message, 400);
            else
                throw new APIError("Lütfen Validasyon Kurallarına Uyun,", 400);
        }
        next();
    }
}

module.exports = AuthValidation;
