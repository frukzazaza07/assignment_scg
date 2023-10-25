import { defineStore } from 'pinia'
import { useReCaptcha } from 'vue-recaptcha-v3';
export const useCaptchaStore = defineStore({
    id: 'captcha',
    state: () => ({
        token: ''
    }),
    actions: {
        async getCaptcha() {
            const recaptchaInstance = useReCaptcha();
            console.log(recaptchaInstance)
            // optional you can await for the reCaptcha load
            await recaptchaInstance?.recaptchaLoaded();

            // get the token, a custom action could be added as argument to the method
            const token = await recaptchaInstance?.executeRecaptcha('findPlaces');
            return token

        },
    }
})
